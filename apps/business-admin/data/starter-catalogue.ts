export type StarterCatalogueItem = {
  name: string;
  category: string;
  subcategory: string;
  brand?: string;
  productType: 'Phone' | 'Tablet' | 'TV' | 'Speaker';
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
  'Entertainment / Speakers',
  'Accessories', 'Computers', 'Networking', 'Wearables', 'Power & Smart Home', 'Gaming', 'Cameras & Security', 'Audio',
  'Tablets / iPad', 'Tablets / Samsung Galaxy Tab',
];

export const starterCatalogueBrands = [
  'Apple', 'Samsung', 'TCL', 'Hisense', 'LG', 'Global Star', 'Black Ark', 'CHiQ',
];

export const starterCatalogueItems: StarterCatalogueItem[] = [
  ...iphoneModels.map((name) => ({ name, category: 'Phones', subcategory: 'iPhones', brand: 'Apple', productType: 'Phone' as const })),
  ...galaxyS.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / S Series', brand: 'Samsung', productType: 'Phone' as const })),
  ...galaxyFoldable.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / Foldable', brand: 'Samsung', productType: 'Phone' as const })),
  ...galaxyA.map((name) => ({ name, category: 'Phones', subcategory: 'Samsung Galaxy / A Series', brand: 'Samsung', productType: 'Phone' as const })),
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
