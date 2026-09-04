import { amaalMasterPhones } from './amaal-master-data';
export type PhoneVariant = { label: string; storage?: string; ram?: string; network?: string; price?: number };
export type PhoneProduct = { slug:string; brand:string; family:string; series:string; name:string; network:string; variants:PhoneVariant[]; description:string; image:string; photoNote:string; source:string };

const curatedPhoneCatalogue: PhoneProduct[] = [
  {
    "slug": "apple-iphone-11",
    "brand": "Apple",
    "family": "iPhone",
    "series": "11 Series",
    "name": "iPhone 11",
    "network": "4G",
    "variants": [
      {
        "label": "64GB",
        "storage": "64GB",
        "network": "4G"
      },
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      }
    ],
    "description": "iPhone 11 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-11-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "11 Series",
    "name": "iPhone 11 Pro",
    "network": "4G",
    "variants": [
      {
        "label": "64GB",
        "storage": "64GB",
        "network": "4G"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 11 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-11-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "11 Series",
    "name": "iPhone 11 Pro Max",
    "network": "4G",
    "variants": [
      {
        "label": "64GB",
        "storage": "64GB",
        "network": "4G"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 11 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-12-mini",
    "brand": "Apple",
    "family": "iPhone",
    "series": "12 Series",
    "name": "iPhone 12 mini",
    "network": "4G",
    "variants": [
      {
        "label": "64GB",
        "storage": "64GB",
        "network": "4G"
      },
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      }
    ],
    "description": "iPhone 12 mini is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-12",
    "brand": "Apple",
    "family": "iPhone",
    "series": "12 Series",
    "name": "iPhone 12",
    "network": "4G",
    "variants": [
      {
        "label": "64GB",
        "storage": "64GB",
        "network": "4G"
      },
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      }
    ],
    "description": "iPhone 12 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-12-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "12 Series",
    "name": "iPhone 12 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 12 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-12-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "12 Series",
    "name": "iPhone 12 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 12 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-13-mini",
    "brand": "Apple",
    "family": "iPhone",
    "series": "13 Series",
    "name": "iPhone 13 mini",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 13 mini is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-13",
    "brand": "Apple",
    "family": "iPhone",
    "series": "13 Series",
    "name": "iPhone 13",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 13 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-13-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "13 Series",
    "name": "iPhone 13 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 13 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-13-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "13 Series",
    "name": "iPhone 13 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 13 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-14",
    "brand": "Apple",
    "family": "iPhone",
    "series": "14 Series",
    "name": "iPhone 14",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 14 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-14-plus",
    "brand": "Apple",
    "family": "iPhone",
    "series": "14 Series",
    "name": "iPhone 14 Plus",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 14 Plus is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-14-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "14 Series",
    "name": "iPhone 14 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 14 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-14-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "14 Series",
    "name": "iPhone 14 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 14 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-15",
    "brand": "Apple",
    "family": "iPhone",
    "series": "15 Series",
    "name": "iPhone 15",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 15 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-15-plus",
    "brand": "Apple",
    "family": "iPhone",
    "series": "15 Series",
    "name": "iPhone 15 Plus",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 15 Plus is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-15-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "15 Series",
    "name": "iPhone 15 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 15 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-15-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "15 Series",
    "name": "iPhone 15 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 15 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-16",
    "brand": "Apple",
    "family": "iPhone",
    "series": "16 Series",
    "name": "iPhone 16",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 16 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-16-plus",
    "brand": "Apple",
    "family": "iPhone",
    "series": "16 Series",
    "name": "iPhone 16 Plus",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 16 Plus is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-16-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "16 Series",
    "name": "iPhone 16 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 16 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-16-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "16 Series",
    "name": "iPhone 16 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 16 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-16e",
    "brand": "Apple",
    "family": "iPhone",
    "series": "16e Series",
    "name": "iPhone 16e",
    "network": "5G",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB"
      },
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 16e is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-17",
    "brand": "Apple",
    "family": "iPhone",
    "series": "17 Series",
    "name": "iPhone 17",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 17 is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-air",
    "brand": "Apple",
    "family": "iPhone",
    "series": "Air Series",
    "name": "iPhone Air",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone Air is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-17-pro",
    "brand": "Apple",
    "family": "iPhone",
    "series": "17 Series",
    "name": "iPhone 17 Pro",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      }
    ],
    "description": "iPhone 17 Pro is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-17-pro-max",
    "brand": "Apple",
    "family": "iPhone",
    "series": "17 Series",
    "name": "iPhone 17 Pro Max",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      },
      {
        "label": "1TB",
        "storage": "1TB"
      },
      {
        "label": "2TB",
        "storage": "2TB"
      }
    ],
    "description": "iPhone 17 Pro Max is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "apple-iphone-17e",
    "brand": "Apple",
    "family": "iPhone",
    "series": "17e Series",
    "name": "iPhone 17e",
    "network": "5G",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB"
      },
      {
        "label": "512GB",
        "storage": "512GB"
      }
    ],
    "description": "iPhone 17e is an Apple iPhone model presented as one catalogue product with its available storage choices. The model-level experience is shared across the listed storage variants; customers choose the capacity that suits their needs. This public catalogue keeps storage as a selectable variant rather than creating separate product pages for each capacity.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a06",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A06",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "64GB · 6GB RAM",
        "storage": "64GB",
        "ram": "6GB",
        "network": "4G"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      }
    ],
    "description": "Galaxy A06 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a07",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A07",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      }
    ],
    "description": "Galaxy A07 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a14",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A14",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      }
    ],
    "description": "Galaxy A14 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a15-4g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A15 4G",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A15 4G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a15-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A15 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A15 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a16-4g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A16 4G",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A16 4G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a16-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A16 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A16 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a17",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A17",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A17 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a24",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A24",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A24 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a25-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A25 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A25 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a26-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A26 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A26 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a34-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A34 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A34 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a35-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A35 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A35 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a36-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A36 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A36 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a54-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A54 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A54 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a55-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A55 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A55 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a56-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A56 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy A56 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-a57-5g",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "A Series",
    "name": "Galaxy A57 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy A57 5G is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s21",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S21",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S21 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s21-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S21+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S21+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s21-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S21 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      }
    ],
    "description": "Galaxy S21 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s22",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S22",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S22 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s22-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S22+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S22+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s22-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S22 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S22 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s23",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S23",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S23 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s23-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S23+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "512GB · 8GB RAM",
        "storage": "512GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S23+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s23-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S23 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S23 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s24",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S24",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy S24 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s24-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S24+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S24+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s24-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S24 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S24 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s25",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S25",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S25 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s25-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S25+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S25+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s25-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S25 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S25 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s25-edge",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S25 Edge",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S25 Edge is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s26",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S26",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S26 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s26-plus",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S26+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy S26+ is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-s26-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "S Series",
    "name": "Galaxy S26 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Galaxy S26 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold4",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold4",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Fold4 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold5",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold5",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Fold5 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold6",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold6",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Fold6 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold7",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold7",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Fold7 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold8",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold8",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Galaxy Z Fold8 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-fold8-ultra",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Fold Series",
    "name": "Galaxy Z Fold8 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Galaxy Z Fold8 Ultra is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-flip4",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Flip Series",
    "name": "Galaxy Z Flip4",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "512GB · 8GB RAM",
        "storage": "512GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy Z Flip4 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-flip5",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Flip Series",
    "name": "Galaxy Z Flip5",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "512GB · 8GB RAM",
        "storage": "512GB",
        "ram": "8GB"
      }
    ],
    "description": "Galaxy Z Flip5 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-flip6",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Flip Series",
    "name": "Galaxy Z Flip6",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Flip6 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-flip7",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Flip Series",
    "name": "Galaxy Z Flip7",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Flip7 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "samsung-galaxy-z-flip8",
    "brand": "Samsung",
    "family": "Galaxy",
    "series": "Z Flip Series",
    "name": "Galaxy Z Flip8",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Galaxy Z Flip8 is a Samsung Galaxy smartphone in the public Amaal catalogue. The available memory and storage combinations are grouped under this single model, with the selected RAM and storage shown as a variant. Model-level information belongs to the model itself, while capacity and memory identify the commercial variant.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-6",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "6",
    "name": "Pixel 6",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 6 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-6-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "6",
    "name": "Pixel 6 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 6 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-6a",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "6a",
    "name": "Pixel 6a",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      }
    ],
    "description": "Pixel 6a is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-7",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "7",
    "name": "Pixel 7",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 7 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-7-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "7",
    "name": "Pixel 7 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 7 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-7a",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "7a",
    "name": "Pixel 7a",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 7a is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-8",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "8",
    "name": "Pixel 8",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 8 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-8-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "8",
    "name": "Pixel 8 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 8 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-8a",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "8a",
    "name": "Pixel 8a",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 8a is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-9",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "9",
    "name": "Pixel 9",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 9 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-9-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "9",
    "name": "Pixel 9 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 16GB RAM",
        "storage": "128GB",
        "ram": "16GB"
      },
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 9 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-9-pro-xl",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "9",
    "name": "Pixel 9 Pro XL",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 16GB RAM",
        "storage": "128GB",
        "ram": "16GB"
      },
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 9 Pro XL is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-9-pro-fold",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "9",
    "name": "Pixel 9 Pro Fold",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 9 Pro Fold is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-9a",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "9a",
    "name": "Pixel 9a",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 9a is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-10",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "10",
    "name": "Pixel 10",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 12GB RAM",
        "storage": "128GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 10 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-10-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "10",
    "name": "Pixel 10 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 16GB RAM",
        "storage": "128GB",
        "ram": "16GB"
      },
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 10 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-10-pro-xl",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "10",
    "name": "Pixel 10 Pro XL",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 10 Pro XL is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-10-pro-fold",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "10",
    "name": "Pixel 10 Pro Fold",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 10 Pro Fold is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-10a",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "10a",
    "name": "Pixel 10a",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Pixel 10a is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-11",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "11",
    "name": "Pixel 11",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Pixel 11 is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-11-pro",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "11",
    "name": "Pixel 11 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 11 Pro is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-11-pro-xl",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "11",
    "name": "Pixel 11 Pro XL",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 11 Pro XL is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "google-pixel-pixel-11-pro-fold",
    "brand": "Google Pixel",
    "family": "Pixel",
    "series": "11",
    "name": "Pixel 11 Pro Fold",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB"
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB"
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB"
      }
    ],
    "description": "Pixel 11 Pro Fold is a Google Pixel smartphone listed as a model-level catalogue entry. Available memory and storage combinations are presented as selectable variants, so customers can compare capacities without treating each capacity as a different phone model.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-camon-50-ultra-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "CAMON",
    "name": "Camon 50 Ultra 5G",
    "network": "5G",
    "variants": [
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Camon 50 Ultra 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-camon-slim",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "CAMON",
    "name": "Camon Slim",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Camon Slim is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-camon-50-pro-5g-4g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "CAMON",
    "name": "Camon 50 Pro 5G/4G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Camon 50 Pro 5G/4G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-camon-50-4g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "CAMON",
    "name": "Camon 50 4G",
    "network": "4G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      }
    ],
    "description": "Camon 50 4G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-camon-40-pro-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "CAMON",
    "name": "Camon 40 Pro 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Camon 40 Pro 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-50-pro",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 50 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Spark 50 Pro is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-50-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 50 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 6GB RAM",
        "storage": "256GB",
        "ram": "6GB"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark 50 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-50-4g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 50 4G",
    "network": "4G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark 50 4G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-50c",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 50C",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark 50C is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-30c",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 30C",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark 30C is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-30c-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark 30C 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark 30C 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-go-1",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark Go 1",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark Go 1 is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-spark-go-2",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "SPARK",
    "name": "Spark Go 2",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Spark Go 2 is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pova-8-pro-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POVA",
    "name": "POVA 8 Pro 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "POVA 8 Pro 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pova-8-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POVA",
    "name": "POVA 8 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "POVA 8 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pova-curve-2-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POVA",
    "name": "POVA Curve 2 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "POVA Curve 2 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pova-6-neo",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POVA",
    "name": "POVA 6 Neo",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "POVA 6 Neo is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-phantom-v-fold2-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "PHANTOM",
    "name": "Phantom V Fold2 5G",
    "network": "5G",
    "variants": [
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Phantom V Fold2 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-phantom-v-flip2-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "PHANTOM",
    "name": "Phantom V Flip2 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Phantom V Flip2 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-phantom-x3-pro",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "PHANTOM",
    "name": "Phantom X3 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Phantom X3 Pro is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pop-9-5g",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POP",
    "name": "Pop 9 5G",
    "network": "5G",
    "variants": [
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Pop 9 5G is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pop-20",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POP",
    "name": "Pop 20",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Pop 20 is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "tecno-pop-10",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "POP",
    "name": "Pop 10",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Pop 10 is a TECNO smartphone catalogue entry. Amaal groups the listed RAM, storage and network combinations as variants of the same model, allowing customers to choose the configuration they want without duplicating the model across the catalogue.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-note-60-ultra",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "NOTE",
    "name": "Note 60 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB"
      }
    ],
    "description": "Note 60 Ultra is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-note-60-pro-5g",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "NOTE",
    "name": "Note 60 Pro 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Note 60 Pro 5G is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-note-edge-5g",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "NOTE",
    "name": "Note Edge 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Note Edge 5G is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-note-50x-5g",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "NOTE",
    "name": "Note 50X 5G",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Note 50X 5G is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-note-50s",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "NOTE",
    "name": "Note 50S",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Note 50S is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-70-pro-5g",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 70 Pro 5G+",
    "network": "5G",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "Hot 70 Pro 5G+ is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-70",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 70",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Hot 70 is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-60-pro",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 60 Pro+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Hot 60 Pro+ is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-60i",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 60i",
    "network": "4G",
    "variants": [
      {
        "label": "256GB · 4GB RAM",
        "storage": "256GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Hot 60i is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-50-pro-4g",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 50 Pro+ 4G",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Hot 50 Pro+ 4G is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-hot-50i",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 50i",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Hot 50i is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-gt-50-pro",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "GT",
    "name": "GT 50 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB"
      }
    ],
    "description": "GT 50 Pro is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-gt-30-pro",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "GT",
    "name": "GT 30 Pro",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "GT 30 Pro is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-smart-20",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "SMART",
    "name": "Smart 20",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Smart 20 is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-smart-10-plus",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "SMART",
    "name": "Smart 10 Plus",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Smart 10 Plus is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "infinix-smart-10-hd",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "SMART",
    "name": "Smart 10 HD",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      },
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Smart 10 HD is an Infinix smartphone catalogue entry. The listed RAM and storage combinations are selectable variants of the same model. Regional availability and final commercial details should be confirmed by Amaal before the model is presented as available for purchase.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-super-26-ultra",
    "brand": "itel",
    "family": "itel",
    "series": "S",
    "name": "Super 26 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "Super 26 Ultra is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-s25-ultra",
    "brand": "itel",
    "family": "itel",
    "series": "S",
    "name": "S25 Ultra",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "S25 Ultra is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-s25",
    "brand": "itel",
    "family": "itel",
    "series": "S",
    "name": "S25",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "S25 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-power-80",
    "brand": "itel",
    "family": "itel",
    "series": "POWER",
    "name": "Power 80",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Power 80 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-power-70",
    "brand": "itel",
    "family": "itel",
    "series": "POWER",
    "name": "Power 70",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "Power 70 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-p65",
    "brand": "itel",
    "family": "itel",
    "series": "POWER",
    "name": "P65",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "P65 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-p55",
    "brand": "itel",
    "family": "itel",
    "series": "POWER",
    "name": "P55",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      }
    ],
    "description": "P55 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-p55-5g",
    "brand": "itel",
    "family": "itel",
    "series": "POWER",
    "name": "P55 5G",
    "network": "5G",
    "variants": [
      {
        "label": "128GB · 6GB RAM",
        "storage": "128GB",
        "ram": "6GB"
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB"
      }
    ],
    "description": "P55 5G is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-city-200",
    "brand": "itel",
    "family": "itel",
    "series": "CITY",
    "name": "City 200",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "City 200 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-city-200s",
    "brand": "itel",
    "family": "itel",
    "series": "CITY",
    "name": "City 200s",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "City 200s is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-city-100",
    "brand": "itel",
    "family": "itel",
    "series": "CITY",
    "name": "City 100",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB"
      }
    ],
    "description": "City 100 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a100c",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A100C",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 2GB RAM",
        "storage": "64GB",
        "ram": "2GB",
        "network": "4G"
      }
    ],
    "description": "A100C is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a100-pro",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A100 Pro",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 2GB RAM",
        "storage": "64GB",
        "ram": "2GB",
        "network": "4G"
      }
    ],
    "description": "A100 Pro is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a80",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A80",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 3GB RAM",
        "storage": "128GB",
        "ram": "3GB"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "A80 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a70",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A70",
    "network": "4G",
    "variants": [
      {
        "label": "128GB · 3GB RAM",
        "storage": "128GB",
        "ram": "3GB"
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G"
      },
      {
        "label": "256GB · 4GB RAM",
        "storage": "256GB",
        "ram": "4GB",
        "network": "4G"
      }
    ],
    "description": "A70 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a50",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A50",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      }
    ],
    "description": "A50 is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  },
  {
    "slug": "itel-a50c",
    "brand": "itel",
    "family": "itel",
    "series": "A",
    "name": "A50C",
    "network": "4G",
    "variants": [
      {
        "label": "64GB · 3GB RAM",
        "storage": "64GB",
        "ram": "3GB",
        "network": "4G"
      }
    ],
    "description": "A50C is an itel smartphone catalogue entry. The listed memory and storage combinations are selectable variants of the same model, keeping the catalogue simple while preserving the differences customers need when choosing a phone.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md"
  }
];

const masterByPhoneSlug = new Map(amaalMasterPhones.map((p) => [p.slug, p]));
const enrichedPhoneCatalogue: PhoneProduct[] = curatedPhoneCatalogue.map((product) => {
  const master = masterByPhoneSlug.get(product.slug);
  if (!master) return product;
  return {
    ...product,
    name: master.name,
    variants: master.variants,
    description: master.description,
    image: master.imageFile ? `/products/amaal-master/${master.imageFile}` : '',
    photoNote: master.imageFile ? 'Supplied Amaal product image' : 'Product photo coming soon',
    source: 'amaal_phones_and_speakers_master_catalogue.md',
  };
});

for (const master of amaalMasterPhones) {
  if (enrichedPhoneCatalogue.some((p) => p.slug === master.slug)) continue;
  const network = master.variants.find((v) => v.network)?.network ?? (master.brand === 'Apple' || master.brand === 'Google Pixel' ? '5G' : '5G');
  enrichedPhoneCatalogue.push({
    slug: master.slug,
    brand: master.brand,
    family: master.brand === 'Apple' ? 'iPhone' : master.brand === 'Samsung' ? 'Galaxy' : 'Pixel',
    series: master.name.startsWith('iPhone') ? master.name.replace(/^iPhone\s+/,'').replace(/\s+Pro.*$/,' Series') : master.name.split(' ')[0] === 'Pixel' ? master.name.replace(/^Pixel\s+/,'').replace(/\s.*$/,'') : 'S Series',
    name: master.name,
    network,
    variants: master.variants,
    description: master.description,
    image: master.imageFile ? `/products/amaal-master/${master.imageFile}` : '',
    photoNote: master.imageFile ? 'Supplied Amaal product image' : 'Product photo coming soon',
    source: 'amaal_phones_and_speakers_master_catalogue.md',
  });
}

export const phoneCatalogue: PhoneProduct[] = enrichedPhoneCatalogue;
