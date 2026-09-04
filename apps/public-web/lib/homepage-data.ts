export type HomeVariant = {
  label: string;
  price: number;
};

export type HomeProduct = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  eyebrow: string;
  quickDetails: string[];
  description: string;
  variants?: HomeVariant[];
};

const asset = (name: string) => `/assets/amaal/homepage/${name}`;

export const featuredProducts: HomeProduct[] = [
  {
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    name: 'iPhone 16 Pro Max 256GB',
    price: 3500000,
    images: [asset('iphone-16-pro-max-256gb-black-titanium.webp')],
    eyebrow: 'Flagship smartphone',
    quickDetails: ['256GB storage', 'A18 Pro chip'],
    description: 'iPhone 16 Pro Max with 256GB storage. Homepage price supplied by Amaal.',
  },
  {
    slug: 'google-pixel-pixel-9',
    brand: 'Google Pixel',
    name: 'Google Pixel 9 256GB',
    price: 2300000,
    images: ['/products/featured/google-pixel-9-256gb-1.webp'],
    eyebrow: 'Google smartphone',
    quickDetails: ['256GB storage', 'Pixel 9'],
    description: 'Google Pixel 9. Homepage price supplied by Amaal.',
  },
  {
    slug: 'samsung-galaxy-a17',
    brand: 'Samsung',
    name: 'Samsung Galaxy A17',
    price: 700000,
    images: [asset('samsung-galaxy-a17-128gb-blue.webp')],
    eyebrow: 'Everyday smartphone',
    quickDetails: ['4GB RAM', '128GB ROM'],
    description: 'Samsung Galaxy A17. The catalogue supports multiple memory and storage variants; this homepage presentation is the supplied 4GB RAM / 128GB ROM offer.',
  },
  {
    slug: 'samsung-galaxy-a07',
    brand: 'Samsung',
    name: 'Samsung Galaxy A07',
    price: 450000,
    images: [asset('samsung-galaxy-a07-64gb-gray.webp')],
    eyebrow: 'Everyday smartphone',
    quickDetails: ['4GB RAM', '64GB ROM'],
    description: 'Samsung Galaxy A07. Homepage price supplied by Amaal.',
  },
  {
    slug: 'tcl-c655-50inch',
    brand: 'TCL',
    name: 'TCL 50-inch C655 QLED 4K',
    price: 1200000,
    images: [asset('tcl-50-inch.webp'), asset('tcl-50-inch-back.webp')],
    eyebrow: 'Smart TV',
    quickDetails: ['50-inch screen', 'QLED · 4K'],
    description: 'TCL C655 50-inch QLED 4K TV. The public catalogue verifies the C655 model family and 50-inch size.',
  },
  {
    slug: 'hisense-8kg-front-loader',
    brand: 'Hisense',
    name: 'Hisense 8kg Front Loader',
    price: 1200000,
    images: [asset('hisense-washing-machine-wfhv8012t.webp')],
    eyebrow: 'Home appliance',
    quickDetails: ['8kg capacity', 'Front loading'],
    description: 'Hisense 8kg front-loading washing machine, presented using the supplied approved product photography.',
  },
  {
    slug: 'samsung-hw-b400f-soundbar',
    brand: 'Samsung',
    name: 'Samsung Soundbar HW-B400F 2.0CH',
    price: 750000,
    images: [asset('samsung-sound-bar-2.webp'), asset('samsung-sound-bar-1.webp')],
    eyebrow: 'Home audio',
    quickDetails: ['2.0CH sound', 'Built-in woofer'],
    description: 'Samsung HW-B400F 2.0-channel soundbar. Homepage price supplied by Amaal.',
  },
];

export const newProducts: HomeProduct[] = [
  {
    slug: 'google-pixel-pixel-11-pro-xl',
    brand: 'Google Pixel',
    name: 'Google Pixel 11 Pro XL',
    price: 5000000,
    images: [asset('pixel-11-pro-xl.webp')],
    eyebrow: 'New flagship',
    quickDetails: ['256GB', '512GB', '1TB'],
    variants: [
      { label: '256GB', price: 5000000 },
      { label: '512GB', price: 5600000 },
      { label: '1TB', price: 6200000 },
    ],
    description: 'Google Pixel 11 Pro XL. Homepage offers are shown as clearly separated RAM and storage variants.',
  },
  {
    slug: 'samsung-galaxy-z-fold8',
    brand: 'Samsung',
    name: 'Samsung Galaxy Z Fold8 "Passport"',
    price: 6000000,
    images: [asset('galaxy-fold-8-standard-or-passport.webp'), asset('galaxy-fold-8-standard-or-passport-official-banner.webp')],
    eyebrow: 'Foldable flagship',
    quickDetails: ['12GB RAM + 256GB ROM', '12GB RAM + 512GB ROM'],
    variants: [
      { label: '12GB RAM + 256GB ROM', price: 6000000 },
      { label: '12GB RAM + 512GB ROM', price: 6180000 },
    ],
    description: 'Samsung Galaxy Z Fold8 "Passport" presentation using the supplied approved imagery. The underlying public catalogue model is Galaxy Z Fold8.',
  },
  {
    slug: 'samsung-galaxy-z-fold8-ultra',
    brand: 'Samsung',
    name: 'Samsung Galaxy Z Fold8 Ultra',
    price: 6450000,
    images: [asset('fold-8-ultra.webp'), asset('samsung-galaxy-z-fold8-ultra-all-colours.webp')],
    eyebrow: 'Ultra foldable',
    quickDetails: ['12GB RAM + 256GB ROM', '12GB RAM + 512GB ROM', '16GB RAM + 1TB Storage'],
    variants: [
      { label: '12GB RAM + 256GB ROM', price: 6450000 },
      { label: '12GB RAM + 512GB ROM', price: 6900000 },
      { label: '16GB RAM + 1TB Storage', price: 8600000 },
    ],
    description: 'Samsung Galaxy Z Fold8 Ultra. The final offer is explicitly 16GB RAM + 1TB Storage.',
  },
  {
    slug: 'tecno-camon-50-pro-5g-4g',
    brand: 'TECNO',
    name: 'TECNO CAMON 50 Pro 5G/4G',
    price: 1300000,
    images: [asset('tecno-camon-50-pro.webp')],
    eyebrow: '5G / 4G camera phone',
    quickDetails: ['8GB RAM + 256GB ROM', 'CAMON 50 Pro family'],
    variants: [{ label: '256GB', price: 1300000 }],
    description: 'The public catalogue uses the verified model name Camon 50 Pro 5G/4G and groups RAM, storage and network combinations as variants.',
  },
  {
    slug: 'tcl-c655-75inch',
    brand: 'TCL',
    name: 'TCL 75-inch C655 Quantum Dot QLED Google TV',
    price: 3500000,
    images: [asset('tcl-75-c655.webp'), asset('tcl-75-c655-side.webp'), asset('tcl-75-c655-back.webp')],
    eyebrow: 'Large-screen entertainment',
    quickDetails: ['75-inch screen', 'C655 QLED · Google TV'],
    description: 'TCL C655 75-inch QLED Google TV. The public catalogue verifies the C655 model family and 75-inch size.',
  },
];

export const homeCategories = [
  ['Phones', 'phones', asset('categoryphones.webp'), 'Phones and smartphones'],
  ['TV & Home Entertainment', 'tvs', asset('category-tvandentertainment.webp'), 'TVs and home cinema'],
  ['Audio', 'entertainment/audio', asset('category-audio.webp'), 'Speakers and sound systems'],
  ['Home Appliances', 'home-appliances', asset('category-home-appliances.webp'), 'Laundry, refrigeration and more'],
  ['Kitchen Appliances', 'kitchen-appliances', asset('categorykitchen-appliances.webp'), 'Cooking and kitchen essentials'],
  ['Computers & Laptops', 'computers', asset('category-computers-and-laptops.webp'), 'Laptops and computing'],
  ['Tablets', 'tablets', asset('file-000000002b7881f49b2923ddaa7a0a27.webp'), 'iPad and Android tablets'],
  ['Accessories', 'accessories', asset('categoryaccessories.webp'), 'Everyday tech essentials'],
] as const;

export const homeBrands = [
  ['Apple', 'apple', asset('apple-logo.webp')],
  ['Samsung', 'samsung', asset('samsung-logo.webp')],
  ['Google Pixel', 'google-pixel', asset('googlepixellogo.webp')],
  ['TECNO', 'tecno', asset('tecnomobile.webp')],
  ['TCL', 'tcl', asset('tcl-logo.webp')],
  ['Sony', 'sony', asset('sony.webp')],
  ['JBL', 'jbl', asset('jbl-logo.webp')],
  ['LG', 'lg', asset('lg-logo-2014-svg.webp')],
  ['Hisense', 'hisense', asset('hisense-logo.webp')],
  ['HP', 'hp', asset('hp-logo.webp')],
  ['Lenovo', 'lenovo', asset('lenovo-global-corporate-logo.webp')],
  ['ASUS', 'asus', asset('asus-logo.webp')],
  ['Acer', 'acer', asset('acer-logo.webp')],
  ['Philips', 'philips', asset('philipslogo.webp')],
  ['Kenwood', 'kenwood', asset('kenwood.webp')],
  ['Saachi', 'saachi', asset('saachi-logo.webp')],
  ['Hoffman’s Electronics', 'hoffman-s-electronics', asset('original-hoffman-electronics-brand-logo.webp')],
  ['CHiQ', 'chiq', asset('chiq-logo.webp')],
  ['SPJ', 'spj', asset('spj-logo.webp')],
  ['Infinix', 'infinix', asset('logo-of-infinix.webp')],
  ['Sonashi', 'sonashi', asset('sonashi-logo.webp')],
  ['RAF', 'raf', asset('raf-logo.webp')],
  ['Black Ark', 'black-ark', asset('black-ark-logo.webp')],
  ['Blue Flame', 'blue-flame', asset('blue-flame-logo.webp')],
];
