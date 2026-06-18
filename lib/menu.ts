export type ProductBadge = "popular" | "new" | "signature";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number; // Toman
  image: string;
  badge?: ProductBadge;
}

export type CategoryIcon = "espresso" | "iced" | "tea" | "signature" | "dessert";

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: CategoryIcon;
  /** tailwind gradient classes used for the fallback artwork */
  gradient: string;
  accent: string;
  /** deep background tone used for the scroll-linked warm→cold ambience */
  themeColor: string;
  products: Product[];
}

export const cafe = {
  name: "کافه آئورا",
  nameEn: "AURA COFFEE",
  tagline: "طعمی فراتر از یک فنجان",
  description:
    "دانه‌های تازه‌رُست، دستان ماهر باریستاها و فضایی گرم؛ هر فنجان آئورا یک تجربه‌ی به‌یادماندنی است.",
  address: "تهران، خیابان ولیعصر، نبش کوچه‌ی آرامش، پلاک ۱۲",
  phone: "۰۲۱-۸۸۸۸۸۸۸۸",
  hours: "همه‌روزه از ساعت ۹ صبح تا ۱۲ شب",
  instagram: "@aura.coffee",
};

export const categories: Category[] = [
  {
    id: "espresso",
    title: "اسپرسوبار",
    subtitle: "قهوه‌های گرم بر پایه‌ی اسپرسو",
    icon: "espresso",
    gradient: "from-[#4b2a20] via-[#6f3f30] to-[#2b1812]",
    accent: "#d4a35a",
    themeColor: "#3a1d0c",
    products: [
      {
        id: "espresso",
        name: "اسپرسو",
        nameEn: "Espresso",
        description: "یک شات غلیظ و خوش‌عطر، قلب همه‌ی قهوه‌ها",
        price: 65000,
        image:
          "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "double-espresso",
        name: "اسپرسو دوبل",
        nameEn: "Double Espresso",
        description: "دو شات اسپرسو برای روزهای پرانرژی",
        price: 85000,
        image:
          "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "americano",
        name: "آمریکانو",
        nameEn: "Americano",
        description: "اسپرسو رقیق‌شده با آب داغ، ملایم و دلنشین",
        price: 75000,
        image:
          "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "cortado",
        name: "کورتادو",
        nameEn: "Cortado",
        description: "تعادل بی‌نقص اسپرسو و شیر بخارداده",
        price: 95000,
        image:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "cappuccino",
        name: "کاپوچینو",
        nameEn: "Cappuccino",
        description: "فوم مخملی روی اسپرسو، با عطر دارچین",
        price: 110000,
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
        badge: "popular",
      },
      {
        id: "latte",
        name: "کافه لاته",
        nameEn: "Caffè Latte",
        description: "شیر ابریشمی و اسپرسو با لته‌آرت دلبرانه",
        price: 120000,
        image:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80",
        badge: "popular",
      },
      {
        id: "flat-white",
        name: "فلت وایت",
        nameEn: "Flat White",
        description: "میکروفوم نازک روی دو شات ریسترتو",
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "mocha",
        name: "موکا",
        nameEn: "Mocha",
        description: "هم‌آغوشی شکلات تلخ، اسپرسو و شیر",
        price: 135000,
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "caramel-macchiato",
        name: "کارامل ماکیاتو",
        nameEn: "Caramel Macchiato",
        description: "وانیل، شیر، اسپرسو و سس کارامل طلایی",
        price: 145000,
        image:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80",
        badge: "signature",
      },
    ],
  },
  {
    id: "cold",
    title: "قهوه‌های سرد",
    subtitle: "خنکای دلپذیر در فنجان",
    icon: "iced",
    gradient: "from-[#1f3a4d] via-[#2c5468] to-[#10202b]",
    accent: "#7fc7d9",
    themeColor: "#06354c",
    products: [
      {
        id: "iced-americano",
        name: "آیس آمریکانو",
        nameEn: "Iced Americano",
        description: "اسپرسو، آب سرد و یخ فراوان",
        price: 95000,
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "iced-latte",
        name: "آیس لاته",
        nameEn: "Iced Latte",
        description: "شیر سرد و اسپرسو روی بستر یخ",
        price: 130000,
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
        badge: "popular",
      },
      {
        id: "cold-brew",
        name: "کلد برو",
        nameEn: "Cold Brew",
        description: "دم‌آوری سرد ۱۸ ساعته، نرم و کم‌اسید",
        price: 140000,
        image:
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80",
        badge: "new",
      },
      {
        id: "affogato",
        name: "آفوگاتو",
        nameEn: "Affogato",
        description: "بستنی وانیلی غرق در شات اسپرسو داغ",
        price: 150000,
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
        badge: "signature",
      },
      {
        id: "caramel-frappe",
        name: "فراپه کارامل",
        nameEn: "Caramel Frappé",
        description: "قهوه‌ی یخ‌زده، خامه و کارامل",
        price: 165000,
        image:
          "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "tea",
    title: "دمنوش و چای",
    subtitle: "آرامش در هر جرعه",
    icon: "tea",
    gradient: "from-[#2f4a2e] via-[#446b3f] to-[#1b2e1a]",
    accent: "#9bc88a",
    themeColor: "#0e3318",
    products: [
      {
        id: "black-tea",
        name: "چای سیاه",
        nameEn: "Black Tea",
        description: "چای دم‌کشیده‌ی ممتاز با عطر هل",
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "green-tea",
        name: "چای سبز",
        nameEn: "Green Tea",
        description: "سبک، سرشار از آنتی‌اکسیدان",
        price: 60000,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "herbal",
        name: "دمنوش گیاهی",
        nameEn: "Herbal Infusion",
        description: "ترکیب گل‌های آرام‌بخش و میوه‌ها",
        price: 70000,
        image:
          "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "matcha-latte",
        name: "ماچا لاته",
        nameEn: "Matcha Latte",
        description: "پودر ماچای ژاپنی با شیر مخملی",
        price: 145000,
        image:
          "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
        badge: "new",
      },
      {
        id: "masala-chai",
        name: "چای ماسالا",
        nameEn: "Masala Chai",
        description: "چای هندی با ادویه‌های گرم و شیر",
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "signature",
    title: "نوشیدنی‌های ویژه",
    subtitle: "ساخته‌ی دستان باریستا",
    icon: "signature",
    gradient: "from-[#4a2f4d] via-[#6b3f68] to-[#2a1a2e]",
    accent: "#e0a3d4",
    themeColor: "#2a0f44",
    products: [
      {
        id: "hot-chocolate",
        name: "هات چاکلت",
        nameEn: "Hot Chocolate",
        description: "شکلات بلژیکی ذوب‌شده با مارشمالو",
        price: 130000,
        image:
          "https://images.unsplash.com/photo-1542990253-a781e04c0082?auto=format&fit=crop&w=900&q=80",
        badge: "popular",
      },
      {
        id: "white-mocha",
        name: "وایت موکا",
        nameEn: "White Mocha",
        description: "شکلات سفید، اسپرسو و شیر",
        price: 145000,
        image:
          "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "mint-lemonade",
        name: "لیموناد نعنا",
        nameEn: "Mint Lemonade",
        description: "لیموی تازه، نعنا و کمی عسل",
        price: 110000,
        image:
          "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "mojito",
        name: "موهیتو کلاسیک",
        nameEn: "Classic Mojito",
        description: "نوشیدنی خنک بدون الکل با نعنا و لیمو",
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=80",
        badge: "signature",
      },
    ],
  },
  {
    id: "dessert",
    title: "دسرها",
    subtitle: "همراهی شیرین برای قهوه",
    icon: "dessert",
    gradient: "from-[#5a3a24] via-[#7d5232] to-[#2e1c10]",
    accent: "#e8b878",
    themeColor: "#3d1e08",
    products: [
      {
        id: "newyork-cheesecake",
        name: "چیزکیک نیویورکی",
        nameEn: "New York Cheesecake",
        description: "بافت کرمی و خامه‌ای با سس توت‌فرنگی",
        price: 185000,
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
        badge: "popular",
      },
      {
        id: "tiramisu",
        name: "تیرامیسو",
        nameEn: "Tiramisu",
        description: "لایه‌های قهوه، ماسکارپونه و کاکائو",
        price: 195000,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
        badge: "signature",
      },
      {
        id: "brownie",
        name: "براونی شکلاتی",
        nameEn: "Chocolate Brownie",
        description: "براونی گرم با مغز شکلاتی روان",
        price: 165000,
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "croissant",
        name: "کروسان کره‌ای",
        nameEn: "Butter Croissant",
        description: "لایه‌لایه، ترد و تازه از فر",
        price: 95000,
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "carrot-cake",
        name: "کیک هویج",
        nameEn: "Carrot Cake",
        description: "کیک نرم هویج با روکش پنیر خامه‌ای",
        price: 155000,
        image:
          "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

export function formatPrice(toman: number): string {
  return toman.toLocaleString("fa-IR");
}
