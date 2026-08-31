export type HomeProduct = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  eyebrow: string;
  quickDetails: string[];
  description: string;
  sourceNote?: string;
};

export const featuredProducts: HomeProduct[] = [
  {
    slug: 'iphone-16-pro-max-256gb', brand: 'Apple', name: 'iPhone 16 Pro Max 256GB', price: 3500000,
    eyebrow: 'Flagship smartphone',
    quickDetails: ['6.9-inch display', 'A18 Pro chip', '256GB storage'],
    description: 'Apple flagship smartphone introduced in 2024, with a 6.9-inch Super Retina XDR display, A18 Pro chip, advanced Pro camera system and 256GB capacity.'
  },
  {
    slug: 'google-pixel-9-256gb', brand: 'Google', name: 'Google Pixel 9 256GB', price: 2300000,
    eyebrow: 'Google smartphone',
    quickDetails: ['6.3-inch Actua OLED', 'Tensor G4', '12GB RAM · 256GB'],
    description: 'Pixel 9 combines a 6.3-inch Actua OLED display with Google Tensor G4, 12GB RAM, a 256GB storage option and an advanced dual rear camera system.'
  },
  {
    slug: 'samsung-galaxy-a17-4gb-128gb', brand: 'Samsung', name: 'Samsung Galaxy A17 4GB RAM 128GB ROM', price: 750000,
    eyebrow: 'Everyday smartphone',
    quickDetails: ['6.7-inch Super AMOLED', '50MP main camera with OIS', '4GB · 128GB'],
    description: 'Galaxy A17 is an everyday Samsung smartphone with a 6.7-inch FHD+ Super AMOLED display, 50MP rear camera with optical image stabilisation, 4GB memory and 128GB storage.'
  },
  {
    slug: 'samsung-galaxy-a07-4gb-64gb', brand: 'Samsung', name: 'Samsung Galaxy A07 4GB RAM 64GB ROM', price: 480000,
    eyebrow: 'Everyday smartphone',
    quickDetails: ['6.7-inch display', '50MP main camera', '4GB · 64GB · microSD'],
    description: 'Galaxy A07 is a practical Samsung smartphone with a large 6.7-inch display, 50MP main camera, 4GB memory, 64GB storage and microSD expansion support.'
  },
  {
    slug: 'tcl-50-inch-v635-qled-4k', brand: 'TCL', name: 'TCL 50-inch QLED 4K TV V635', price: 1150000,
    eyebrow: 'Smart TV',
    quickDetails: ['50-inch 4K', 'QLED colour', 'Smart TV experience'],
    description: 'TCL 50-inch V635-series QLED 4K smart television, positioned for vivid home entertainment with a slim design and smart TV features. Exact regional specifications should be confirmed against the supplied unit.'
  },
  {
    slug: 'hisense-wfqp8014evmt-8kg', brand: 'Hisense', name: 'Hisense 8kg Front Loader Washing Machine WFQP8014EVMT', price: 0,
    eyebrow: 'Home appliance',
    quickDetails: ['8kg capacity', '1200 RPM', '15 wash programs'],
    description: 'Hisense WFQP8014EVMT front-loading washing machine with 8kg capacity, 1200 RPM spin speed, 15 programs, inverter motor, steam care, quick wash and pause-and-add functionality. Supplied listing states a 2-year warranty.'
  },
  {
    slug: 'samsung-hw-b400f-soundbar', brand: 'Samsung', name: 'Samsung B-Series Soundbar HW-B400F 2.0ch', price: 850000,
    eyebrow: 'Home audio',
    quickDetails: ['2.0ch sound', 'Built-in woofer', 'Bluetooth · HDMI ARC'],
    description: 'Samsung HW-B400F is a 2025 2.0-channel soundbar with a built-in woofer, Surround Sound Expansion, Voice Enhance Mode, Night Mode, Bluetooth TV connection and HDMI ARC.'
  }
];

export const newProducts: HomeProduct[] = [
  {
    slug: 'google-pixel-11-pro-xl', brand: 'Google Pixel', name: 'Google Pixel 11 Pro XL', price: 5400000,
    eyebrow: 'New flagship',
    quickDetails: ['6.8-inch Super Actua', 'Tensor G6', '30+ hour battery'],
    description: 'Google Pixel 11 Pro XL features a 6.8-inch LTPO OLED Super Actua display, Google Tensor G6, 30+ hour battery life, Qi2.2 wireless charging and storage options beginning at 256GB.'
  },
  {
    slug: 'samsung-galaxy-z-fold8-256gb', brand: 'Samsung', name: 'Samsung Galaxy Z Fold8 256GB', price: 9000000,
    eyebrow: 'Foldable flagship',
    quickDetails: ['256GB · 12GB RAM', 'Snapdragon 8 Elite Gen 5', '4800mAh battery'],
    description: 'Galaxy Z Fold8 is Samsung’s 2026 foldable flagship with a new lightweight design, Snapdragon 8 Elite Gen 5 for Galaxy, dual 50MP rear cameras and 256GB, 512GB or 1TB storage options.'
  },
  {
    slug: 'samsung-galaxy-z-fold-special-edition-512gb', brand: 'Samsung', name: 'Samsung Galaxy Z Fold Special Edition 512GB', price: 12000000,
    eyebrow: 'Special edition foldable',
    quickDetails: ['512GB storage', '16GB memory', '200MP wide camera'],
    description: 'Samsung Galaxy Z Fold Special Edition is a slim foldable released in Korea with 512GB storage, 16GB memory and a 200MP wide camera. The product name is normalised from the supplied “Fold passport” wording to the official Special Edition name.'
  },
  {
    slug: 'tecno-camon-50-pro-5g-256gb', brand: 'TECNO', name: 'TECNO CAMON 50 Pro 5G 256GB', price: 1050000,
    eyebrow: '5G camera phone',
    quickDetails: ['6.78-inch 144Hz AMOLED', 'Dimensity 7400 Ultimate', '256GB · up to 16GB extended RAM'],
    description: 'TECNO CAMON 50 Pro 5G pairs a curved 6.78-inch 144Hz 1.5K AMOLED display with a MediaTek Dimensity 7400 Ultimate processor, 256GB storage, 50MP OIS camera system and 6500mAh battery with 45W charging.'
  },
  {
    slug: 'infinix-smart-20-64gb', brand: 'Infinix', name: 'Infinix Smart 20 64GB', price: 400000,
    eyebrow: 'Everyday smartphone',
    quickDetails: ['6.78-inch display', 'Helio G81 Ultimate', '64GB · 4GB RAM'],
    description: 'Infinix Smart 20 is an entry-level 4G smartphone with a 6.78-inch display, MediaTek Helio G81 Ultimate processor, 64GB storage, 4GB RAM and expandable storage support.'
  },
  {
    slug: 'tcl-75-inch-c655-qled-4k', brand: 'TCL', name: 'TCL 75-inch C655 QLED 4K Google TV', price: 4500000,
    eyebrow: 'Large-screen entertainment',
    quickDetails: ['75-inch QLED Pro', '4K Google TV', 'Dolby Vision · Atmos'],
    description: 'TCL C655 75-inch QLED 4K Google TV combines Quantum Dot colour, AiPQ Pro processing, Google TV, Dolby Vision, HDR10+, Dolby Atmos, HDMI 2.1 features and gaming-focused 120Hz DLG support.'
  }
];

export const homeCategories = [
  ['Phones', 'phones', 'Phones and smartphones'],
  ['TV & Home Entertainment', 'tvs', 'TVs, projectors and cinema'],
  ['Audio', 'sound-speakers', 'Soundbars, speakers and headphones'],
  ['Home Appliances', 'home-appliances', 'Refrigeration, laundry and more'],
  ['Kitchen Appliances', 'kitchen-appliances', 'Cooking and kitchen essentials'],
  ['Gaming & Computing', 'office-electronics', 'Laptops, gaming and computing'],
  ['Accessories', 'accessories', 'Everyday tech essentials'],
] as const;

export const homeBrands = ['TCL','Samsung','Hoffman’s Electronics','Apple','Google Pixel','TECNO','Infinix','Saachi','LG','Hisense','Skyworth'];
