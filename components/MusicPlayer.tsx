"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  timer: number | null;
  idx: number;
  running: boolean;
}

// soft jazzy lo-fi cafe progression: Cmaj7 · Am7 · Fmaj7 · G6
const CHORDS = [
  [130.81, 164.81, 196.0, 246.94],
  [110.0, 130.81, 164.81, 196.0],
  [87.31, 110.0, 130.81, 164.81],
  [98.0, 123.47, 146.83, 196.0],
];
const CHORD_DUR = 7; // seconds
const VOLUME = 0.16;

export function MusicPlayer() {
  const engineRef = useRef<Engine | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(true);

  const buildEngine = useCallback((): Engine => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;

    const comp = ctx.createDynamicsCompressor();

    // gentle feedback delay for a soft, roomy ambience
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.34;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.26;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;

    master.connect(filter);
    filter.connect(comp);
    comp.connect(ctx.destination);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(comp);

    return { ctx, master, timer: null, idx: 0, running: false };
  }, []);

  const playChord = useCallback((eng: Engine, freqs: number[], at: number) => {
    const { ctx, master } = eng;
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = Math.random() * 8 - 4;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(VOLUME / freqs.length, at + 2.2);
      g.gain.linearRampToValueAtTime(0, at + CHORD_DUR);

      osc.connect(g);
      g.connect(master);
      osc.start(at);
      osc.stop(at + CHORD_DUR + 0.1);
    });

    // occasional soft twinkle on top
    if (Math.random() < 0.75) {
      const t = ctx.createOscillator();
      t.type = "sine";
      t.frequency.value = freqs[1] * (Math.random() < 0.5 ? 2 : 3);
      const tg = ctx.createGain();
      tg.gain.setValueAtTime(0, at + 2);
      tg.gain.linearRampToValueAtTime(0.05, at + 2.3);
      tg.gain.exponentialRampToValueAtTime(0.0008, at + 5.5);
      t.connect(tg);
      tg.connect(master);
      t.start(at + 2);
      t.stop(at + 5.6);
    }
  }, []);

  const startLoop = useCallback(
    (eng: Engine) => {
      if (eng.running) return;
      eng.running = true;
      const tick = () => {
        if (!eng.running) return;
        playChord(eng, CHORDS[eng.idx % CHORDS.length], eng.ctx.currentTime + 0.05);
        eng.idx += 1;
        eng.timer = window.setTimeout(tick, CHORD_DUR * 1000);
      };
      tick();
    },
    [playChord]
  );

  const play = useCallback(async () => {
    if (!engineRef.current) engineRef.current = buildEngine();
    const eng = engineRef.current;
    try {
      await eng.ctx.resume();
    } catch {
      /* ignore */
    }
    startLoop(eng);
    eng.master.gain.cancelScheduledValues(eng.ctx.currentTime);
    eng.master.gain.setValueAtTime(eng.master.gain.value, eng.ctx.currentTime);
    eng.master.gain.linearRampToValueAtTime(1, eng.ctx.currentTime + 1.4);
    setPlaying(true);
    setHint(false);
  }, [buildEngine, startLoop]);

  const pause = useCallback(() => {
    const eng = engineRef.current;
    if (!eng) return;
    eng.master.gain.cancelScheduledValues(eng.ctx.currentTime);
    eng.master.gain.setValueAtTime(eng.master.gain.value, eng.ctx.currentTime);
    eng.master.gain.linearRampToValueAtTime(0, eng.ctx.currentTime + 0.7);
    eng.running = false;
    if (eng.timer) window.clearTimeout(eng.timer);
    eng.timer = null;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else void play();
  }, [playing, pause, play]);

  // auto-start on the visitor's first interaction (browsers block silent autoplay)
  const userTouched = useRef(false);
  useEffect(() => {
    const onFirst = () => {
      if (userTouched.current) return;
      userTouched.current = true;
      void play();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { once: false });
    window.addEventListener("touchstart", onFirst, { once: false });
    window.addEventListener("keydown", onFirst, { once: false });
    const hideHint = window.setTimeout(() => setHint(false), 6000);
    return () => {
      cleanup();
      window.clearTimeout(hideHint);
    };
  }, [play]);

  return (
    <div className="fixed bottom-5 left-4 z-50 flex items-center gap-2 sm:bottom-6 sm:left-6">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "خاموش کردن موسیقی" : "پخش موسیقی"}
        aria-pressed={playing}
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-espresso-800 text-gold shadow-card ring-1 ring-gold/40 transition-transform active:scale-90"
      >
        {playing && (
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
        )}
        {playing ? (
          <span className="relative flex h-5 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gold"
                animate={{ height: ["35%", "100%", "45%", "85%", "35%"] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
                style={{ height: "60%" }}
              />
            ))}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" fill="currentColor">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.79-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {hint && !playing && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="rounded-full bg-espresso-800 px-3 py-1.5 text-xs font-semibold text-cream shadow-card ring-1 ring-gold/30"
          >
            ♪ موسیقی ملایم
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
