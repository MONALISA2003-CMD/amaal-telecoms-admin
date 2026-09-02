export type StarterCatalogueItem = {
  name: string;
  category: string;
  subcategory: string;
  brand?: string;
  productType: 'Phone' | 'Tablet' | 'TV' | 'Speaker' | 'Laptop' | 'Desktop' | 'All-in-One';
  size?: string;
};

const iphoneModels = [
  'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
  'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
  'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
  'iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
  'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
  'iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
  'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max',
];

const galaxyS = Array.from({ length: 7 }, (_, index) => 20 + index).flatMap((series) => [
  `Samsung Galaxy S${series}`,
  `Samsung Galaxy S${series}+`,
  `Samsung Galaxy S${series} Ultra`,
]);

const galaxyFoldable = Array.from({ length: 5 }, (_, index) => 4 + index).flatMap((series) => [
  `Samsung Galaxy Z Fold${series}`,
  `Samsung Galaxy Z Flip${series}`,
]);

const galaxyA = ['A57', 'A56', 'A36', 'A37', 'A26', 'A27', 'A16', 'A17', 'A07', 'A06']
  .map((model) => `Samsung Galaxy ${model}`);

import { tvMasterCatalog, tvMasterBrands } from './tv-master-catalogue';

export const starterCatalogueCategories = [
  'Phones',
  'Tablets',
  'Entertainment',
  'Phones / iPhones',
  'Phones / Samsung Galaxy / S Series',
  'Phones / Samsung Galaxy / Foldable',
  'Phones / Samsung Galaxy / A Series',
  'Entertainment / TV',
  'Accessories', 'Accessories / Phone Accessories', 'Accessories / Computer Accessories', 'Accessories / Tablet Accessories', 'Accessories / Audio Accessories', 'Accessories / Gaming Accessories', 'Computers', 'Computers / Laptops', 'Computers / Laptops / HP', 'Computers / Laptops / Lenovo', 'Computers / Laptops / Apple', 'Computers / Desktops', 'Computers / All-in-One', 'Computers / Gaming Laptops', 'Networking', 'Wearables', 'Power & Smart Home', 'Gaming', 'Cameras & Security',
  'Tablets / iPad', 'Tablets / Samsung Galaxy Tab', 'Tablets / iPad Air', 'Tablets / iPad Pro', 'Tablets / Galaxy Tab S11', 'Entertainment / Audio', 'Entertainment / Audio / Woofers', 'Entertainment / Audio / Party Speakers', 'Entertainment / Audio / Sound Towers', 'Entertainment / Audio / Portable Speakers',
];

export const starterCatalogueBrands = [
  'Apple', 'HP', 'Lenovo', 'Samsung', 'TCL', 'Hisense', 'LG', 'Global Star', 'Black Ark', 'CHiQ', 'SPJ', 'CHiQ Smart Plus', 'JBL', 'Sony', 'ASUS', 'Acer', 'MSI',
];

const computerItems: StarterCatalogueItem[] = [
  { name: 'HP 15 Laptop', category: 'Computers', subcategory: 'Laptops / HP', brand: 'HP', productType: 'Laptop', size: '15.6 inch' },
  { name: 'HP ProBook 440', category: 'Computers', subcategory: 'Laptops / HP / ProBook', brand: 'HP', productType: 'Laptop', size: '14 inch' },
  { name: 'HP ProBook 450', category: 'Computers', subcategory: 'Laptops / HP / ProBook', brand: 'HP', productType: 'Laptop', size: '15.6 inch' },
  { name: 'HP ProBook 445', category: 'Computers', subcategory: 'Laptops / HP / ProBook', brand: 'HP', productType: 'Laptop', size: '14 inch' },
  { name: 'HP EliteBook 840', category: 'Computers', subcategory: 'Laptops / HP / EliteBook', brand: 'HP', productType: 'Laptop', size: '14 inch' },
  { name: 'HP Pavilion 15 Laptop', category: 'Computers', subcategory: 'Laptops / HP / Pavilion', brand: 'HP', productType: 'Laptop', size: '15.6 inch' },
  { name: 'HP Envy 14 Laptop', category: 'Computers', subcategory: 'Laptops / HP / Envy', brand: 'HP', productType: 'Laptop', size: '14 inch' },
  { name: 'Lenovo IdeaPad Slim 3 15', category: 'Computers', subcategory: 'Laptops / Lenovo / IdeaPad', brand: 'Lenovo', productType: 'Laptop', size: '15.6 inch' },
  { name: 'Lenovo IdeaPad Slim 3i 15', category: 'Computers', subcategory: 'Laptops / Lenovo / IdeaPad', brand: 'Lenovo', productType: 'Laptop', size: '15.6 inch' },
  { name: 'Lenovo V15', category: 'Computers', subcategory: 'Laptops / Lenovo / V Series', brand: 'Lenovo', productType: 'Laptop', size: '15.6 inch' },
  { name: 'Lenovo ThinkBook 14', category: 'Computers', subcategory: 'Laptops / Lenovo / ThinkBook', brand: 'Lenovo', productType: 'Laptop', size: '14 inch' },
  { name: 'Lenovo ThinkPad E14', category: 'Computers', subcategory: 'Laptops / Lenovo / ThinkPad', brand: 'Lenovo', productType: 'Laptop', size: '14 inch' },
  { name: 'Lenovo ThinkPad T14', category: 'Computers', subcategory: 'Laptops / Lenovo / ThinkPad', brand: 'Lenovo', productType: 'Laptop', size: '14 inch' },
  { name: 'Lenovo LOQ 15 Gaming Laptop', category: 'Computers', subcategory: 'Laptops / Lenovo / Gaming / LOQ', brand: 'Lenovo', productType: 'Laptop', size: '15.6 inch' },
  { name: 'Lenovo Legion 5 Gaming Laptop', category: 'Computers', subcategory: 'Laptops / Lenovo / Gaming / Legion', brand: 'Lenovo', productType: 'Laptop', size: '15/16 inch' },
  { name: 'MacBook Neo', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Neo', brand: 'Apple', productType: 'Laptop', size: '13 inch class' },
  { name: 'MacBook Air 13-inch with M5', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Air', brand: 'Apple', productType: 'Laptop', size: '13.6 inch' },
  { name: 'MacBook Air 15-inch with M5', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Air', brand: 'Apple', productType: 'Laptop', size: '15.3 inch' },
  { name: 'MacBook Pro 14-inch with M5', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Pro', brand: 'Apple', productType: 'Laptop', size: '14.2 inch' },
  { name: 'MacBook Pro 14-inch with M5 Pro', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Pro', brand: 'Apple', productType: 'Laptop', size: '14.2 inch' },
  { name: 'MacBook Pro 16-inch with M5 Pro', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Pro', brand: 'Apple', productType: 'Laptop', size: '16.2 inch' },
  { name: 'MacBook Pro 16-inch with M5 Max', category: 'Computers', subcategory: 'Laptops / Apple / MacBook Pro', brand: 'Apple', productType: 'Laptop', size: '16.2 inch' },
];

const audioItems: StarterCatalogueItem[] = [
  { name: 'Black Ark 12-inch Bluetooth Woofer', category: 'Entertainment', subcategory: 'Audio / Woofers', brand: 'Black Ark', productType: 'Speaker', size: '12 inch' },
  { name: 'Black Ark 15-inch Bluetooth Woofer', category: 'Entertainment', subcategory: 'Audio / Woofers', brand: 'Black Ark', productType: 'Speaker', size: '15 inch' },
  { name: 'Global Star 12-inch Bluetooth Woofer', category: 'Entertainment', subcategory: 'Audio / Woofers', brand: 'Global Star', productType: 'Speaker', size: '12 inch' },
  { name: 'Global Star 15-inch Bluetooth Woofer', category: 'Entertainment', subcategory: 'Audio / Woofers', brand: 'Global Star', productType: 'Speaker', size: '15 inch' },
  { name: 'SPJ 12-inch Portable Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'SPJ', productType: 'Speaker', size: '12 inch' },
  { name: 'SPJ 15-inch Portable Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'SPJ', productType: 'Speaker', size: '15 inch' },
  { name: 'CHiQ Smart Plus 12-inch Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'CHiQ Smart Plus', productType: 'Speaker', size: '12 inch' },
  { name: 'CHiQ Smart Plus 15-inch Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'CHiQ Smart Plus', productType: 'Speaker', size: '15 inch' },
  { name: 'Hisense PARTY ROCKER ONE', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'Hisense', productType: 'Speaker' },
  { name: 'Samsung Sound Tower MX-T50', category: 'Entertainment', subcategory: 'Audio / Sound Towers', brand: 'Samsung', productType: 'Speaker' },
  { name: 'LG XBOOM RNC5 Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'LG XBOOM RNC7 Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'LG XBOOM RNC9 Party Speaker', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'JBL PartyBox Encore Essential 2', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox 110', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox Encore 2', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'Sony ULT FIELD 7', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'Sony', productType: 'Speaker' },
];

const expansionItems: StarterCatalogueItem[] = [
  { name: 'Lenovo LOQ Essential 15 Gaming Laptop', category: 'Computers', subcategory: 'Laptops / Lenovo / Gaming / LOQ Essential', brand: 'Lenovo', productType: 'Laptop', size: '15.6 inch class' },
  { name: 'Lenovo Legion Pro 5 Gaming Laptop', category: 'Computers', subcategory: 'Laptops / Lenovo / Gaming / Legion Pro', brand: 'Lenovo', productType: 'Laptop', size: '16 inch class' },
  { name: 'Lenovo Legion Pro 7i Gaming Laptop', category: 'Computers', subcategory: 'Laptops / Lenovo / Gaming / Legion Pro', brand: 'Lenovo', productType: 'Laptop', size: '16 inch class' },
  { name: 'HyperX OMEN MAX 16 Gaming Laptop — AMD', category: 'Computers', subcategory: 'Laptops / HP / Gaming / OMEN MAX', brand: 'HP', productType: 'Laptop', size: '16 inch class' },
  { name: 'HyperX OMEN MAX 16 Gaming Laptop — Intel', category: 'Computers', subcategory: 'Laptops / HP / Gaming / OMEN MAX', brand: 'HP', productType: 'Laptop', size: '16 inch class' },
  { name: 'ASUS ROG Zephyrus G14', category: 'Computers', subcategory: 'Laptops / ASUS / Gaming / ROG', brand: 'ASUS', productType: 'Laptop', size: '14 inch class' },
  { name: 'ASUS ROG Zephyrus G16', category: 'Computers', subcategory: 'Laptops / ASUS / Gaming / ROG', brand: 'ASUS', productType: 'Laptop', size: '16 inch class' },
  { name: 'ASUS ROG Strix G16', category: 'Computers', subcategory: 'Laptops / ASUS / Gaming / ROG', brand: 'ASUS', productType: 'Laptop', size: '16 inch class' },
  { name: 'Acer Nitro V 15', category: 'Computers', subcategory: 'Laptops / Acer / Gaming / Nitro', brand: 'Acer', productType: 'Laptop', size: '15.6 inch class' },
  { name: 'Acer Predator Helios Neo 16', category: 'Computers', subcategory: 'Laptops / Acer / Gaming / Predator', brand: 'Acer', productType: 'Laptop', size: '16 inch class' },
  { name: 'MSI Cyborg 15', category: 'Computers', subcategory: 'Laptops / MSI / Gaming', brand: 'MSI', productType: 'Laptop', size: '15.6 inch class' },
  { name: 'MSI Katana 15', category: 'Computers', subcategory: 'Laptops / MSI / Gaming', brand: 'MSI', productType: 'Laptop', size: '15.6 inch class' },
  { name: 'iPad 11-inch with A16', category: 'Tablets', subcategory: 'iPad', brand: 'Apple', productType: 'Tablet', size: '11 inch' },
  { name: 'iPad mini with A17 Pro', category: 'Tablets', subcategory: 'iPad', brand: 'Apple', productType: 'Tablet', size: '8.3 inch' },
  { name: 'iPad Air 11-inch with M4', category: 'Tablets', subcategory: 'iPad Air', brand: 'Apple', productType: 'Tablet', size: '11 inch' },
  { name: 'iPad Air 13-inch with M4', category: 'Tablets', subcategory: 'iPad Air', brand: 'Apple', productType: 'Tablet', size: '13 inch' },
  { name: 'iPad Pro 11-inch with M5', category: 'Tablets', subcategory: 'iPad Pro', brand: 'Apple', productType: 'Tablet', size: '11 inch' },
  { name: 'iPad Pro 13-inch with M5', category: 'Tablets', subcategory: 'iPad Pro', brand: 'Apple', productType: 'Tablet', size: '13 inch' },
  { name: 'Samsung Galaxy Tab S11', category: 'Tablets', subcategory: 'Samsung Galaxy Tab / S11', brand: 'Samsung', productType: 'Tablet' },
  { name: 'Samsung Galaxy Tab S11 Ultra', category: 'Tablets', subcategory: 'Samsung Galaxy Tab / S11', brand: 'Samsung', productType: 'Tablet' },
  { name: 'Samsung Galaxy Tab S10 FE', category: 'Tablets', subcategory: 'Samsung Galaxy Tab / FE', brand: 'Samsung', productType: 'Tablet' },
  { name: 'Samsung Galaxy Tab S10 FE+', category: 'Tablets', subcategory: 'Samsung Galaxy Tab / FE', brand: 'Samsung', productType: 'Tablet' },
  { name: 'Samsung Galaxy Tab A9+', category: 'Tablets', subcategory: 'Samsung Galaxy Tab / A Series', brand: 'Samsung', productType: 'Tablet' },
  { name: 'JBL PartyBox 130', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox 330', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox Club 120', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox Stage 320', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox On-The-Go 2 Plus', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL PartyBox Ultimate', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'LG xboom Power 5000', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'LG xboom Power 7000', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'LG xboom Power 9000', category: 'Entertainment', subcategory: 'Audio / Party Speakers', brand: 'LG', productType: 'Speaker' },
  { name: 'JBL Clip 5', category: 'Entertainment', subcategory: 'Audio / Portable Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'JBL Charge 5', category: 'Entertainment', subcategory: 'Audio / Portable Speakers', brand: 'JBL', productType: 'Speaker' },
  { name: 'Sony ULT FIELD 7', category: 'Entertainment', subcategory: 'Audio / Portable Speakers', brand: 'Sony', productType: 'Speaker' },
  { name: 'Apple Pencil Pro', category: 'Accessories', subcategory: 'Tablet Accessories', brand: 'Apple', productType: 'Tablet' },
  { name: 'Apple Pencil (USB-C)', category: 'Accessories', subcategory: 'Tablet Accessories', brand: 'Apple', productType: 'Tablet' },
  { name: 'Magic Keyboard for iPad Air', category: 'Accessories', subcategory: 'Tablet Accessories', brand: 'Apple', productType: 'Tablet' },
  { name: '20W USB-C Fast Charger', category: 'Accessories', subcategory: 'Phone Accessories', brand: 'Amaal', productType: 'Phone' },
  { name: 'USB-C 7-in-1 Hub', category: 'Accessories', subcategory: 'Computer Accessories', brand: 'Amaal', productType: 'Laptop' },
  { name: 'Wireless Mouse', category: 'Accessories', subcategory: 'Computer Accessories', brand: 'Amaal', productType: 'Laptop' },
  { name: 'Mechanical Gaming Keyboard', category: 'Accessories', subcategory: 'Gaming Accessories', brand: 'Amaal', productType: 'Laptop' },
  { name: 'USB Gaming Headset', category: 'Accessories', subcategory: 'Gaming Accessories', brand: 'Amaal', productType: 'Laptop' },
];

export const starterCatalogueItems: StarterCatalogueItem[] = [
  ...iphoneModels.map((name) => ({ name, category: 'Phones', subcategory: 'iPhones', brand: 'Apple', productType: 'Phone' as const })),
  ...galaxyS.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / S Series', brand: 'Samsung', productType: 'Phone' as const })),
  ...galaxyFoldable.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / Foldable', brand: 'Samsung', productType: 'Phone' as const })),
  ...galaxyA.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / A Series', brand: 'Samsung', productType: 'Phone' as const })),
  ...computerItems,
  ...audioItems,
  ...expansionItems,
  ...tvMasterCatalog.map((tv) => ({
    name: `${tv.brand} ${tv.model} TV`,
    category: 'Entertainment',
    subcategory: 'TV',
    brand: tv.brand,
    productType: 'TV' as const,
    size: tv.sizes[0] ? `${tv.sizes[0]} inch` : undefined,
    sizes: tv.sizes,
    technology: tv.technology,
    generation: tv.generation,
    verificationStatus: tv.verificationStatus,
    market: tv.market,
  })),
];

export const starterCatalogueCollections = [
  'New Arrivals', 'Best Sellers', 'Featured', 'Deals', 'Premium Phones', 'Smart TVs',
];

export const starterCatalogueSummary = {
  categories: starterCatalogueCategories.length,
  brands: starterCatalogueBrands.length + tvMasterBrands.length - 7,
  products: starterCatalogueItems.length,
  stockUnits: 0,
  collections: starterCatalogueCollections.length,
};
