export type PhoneVariant = { label: string; storage?: string; ram?: string; network?: string; price?: number };
export type PhoneProduct = { slug:string; brand:string; family:string; series:string; name:string; network:string; variants:PhoneVariant[]; description:string; quickSpecs?:string; specifications?:string[]; image:string; images?:string[]; photoNote:string; source:string };

export const phoneCatalogue: PhoneProduct[] = [
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
        "network": "4G",
        "price": 600000
      },
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 700000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 800000
      }
    ],
    "description": "iPhone 11 is a mainstream iPhone built around Apple's A13 Bionic platform and a 6.1-inch Liquid Retina display. It is a strong used-market option for customers who want the iOS ecosystem, familiar Apple design and dependable everyday performance without paying for a newer generation. Its dual-camera system covers standard and ultrawide photography, while the broad storage range makes it suitable for different budgets. The model is especially attractive as an affordable entry into iPhone ownership.",
    "image": "/products/phones/Iphone 11.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB, 128GB, 256GB",
      "Chip: A13 Bionic",
      "Display: 6.1-inch Liquid Retina HD LCD, 1792 × 828, 326ppi",
      "Rear camera: 12MP + 12MP",
      "Front camera: 12MP",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A13 Bionic; 6.1-inch Liquid Retina HD LCD, 1792 × 828, 326ppi; 12MP + 12MP rear; 12MP front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 11.jpg"
    ]
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
        "network": "4G",
        "price": 750000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 900000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1050000
      }
    ],
    "description": "iPhone 11 Pro is the compact premium member of the 11 family. Its OLED display and Pro camera system give it a more premium identity than the standard iPhone 11, while A13 Bionic provides the performance foundation. It is suited to customers who prefer a smaller premium iPhone and want the Pro branding and camera versatility at a used-market price.",
    "image": "/products/phones/Iphone 11 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB, 256GB, 512GB",
      "Chip: A13 Bionic",
      "Display: 5.8-inch Super Retina XDR OLED",
      "Rear camera: Triple-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A13 Bionic; 5.8-inch Super Retina XDR OLED; Triple-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 11 pro .jpg"
    ]
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
        "network": "4G",
        "price": 800000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1050000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1200000
      }
    ],
    "description": "iPhone 11 Pro Max combines the Pro camera system with the largest display of the 11 generation. It is aimed at customers who prioritise screen size, premium presentation and the Pro feature set. The A13 Bionic platform remains the core performance foundation, making it suitable for everyday iOS use, photography, video and social media.",
    "image": "/products/phones/Iphone 11 pro max .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB, 256GB, 512GB",
      "Chip: A13 Bionic",
      "Display: 6.5-inch Super Retina XDR OLED",
      "Rear camera: Triple-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A13 Bionic; 6.5-inch Super Retina XDR OLED; Triple-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 11 pro max .jpg"
    ]
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
        "network": "4G",
        "price": 650000
      },
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 750000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 850000
      }
    ],
    "description": "iPhone 12 mini is the compact choice of the 12 generation. Its 5.4-inch OLED display and small form factor make it particularly relevant to customers who prefer one-handed use and a smaller phone. A14 Bionic provides a strong performance foundation, while the dual-camera system covers everyday photography. It is an appealing used-market option for buyers who want a modern iPhone experience in a genuinely compact body.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB, 128GB, 256GB",
      "Chip: A14 Bionic",
      "Display: 5.4-inch Super Retina XDR OLED",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A14 Bionic; 5.4-inch Super Retina XDR OLED; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone."
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
        "network": "4G",
        "price": 700000
      },
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 800000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 950000
      }
    ],
    "description": "iPhone 12 is a mainstream modern iPhone built around A14 Bionic and a 6.1-inch Super Retina XDR OLED display. It balances compact-enough dimensions with a full-size viewing experience and provides a strong entry point into the 12 family. Its dual-camera system makes it suitable for everyday photos and video, while the range of storage choices supports different user needs.",
    "image": "/products/phones/Iphone 12.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB, 128GB, 256GB",
      "Chip: A14 Bionic",
      "Display: 6.1-inch Super Retina XDR OLED, 2532 × 1170, 460ppi",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A14 Bionic; 6.1-inch Super Retina XDR OLED, 2532 × 1170, 460ppi; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 12.jpg"
    ]
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
        "storage": "128GB",
        "price": 1000000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1200000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1500000
      }
    ],
    "description": "iPhone 12 Pro is the premium 6.1-inch model of the 12 generation. It combines A14 Bionic with an OLED display and a Pro camera system designed for customers who want more photographic flexibility than the standard iPhone 12. Its 128GB, 256GB and 512GB choices make it suitable for users with larger media libraries. It is a strong used-market Pro iPhone for customers who want premium features without the Max size.",
    "image": "/products/phones/Iphone 12 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A14 Bionic",
      "Display: 6.1-inch Super Retina XDR OLED",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A14 Bionic; 6.1-inch Super Retina XDR OLED; Triple-camera Pro system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 12 pro .jpg"
    ]
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
        "storage": "128GB",
        "price": 1200000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1350000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1500000
      }
    ],
    "description": "iPhone 12 Pro Max is the large-format Pro model of the 12 generation. Its 6.7-inch OLED display makes it suited to video, browsing and content consumption, while the Pro camera system targets users who care more about photography. A14 Bionic provides the performance foundation. The three storage options make it appropriate for customers with moderate through heavy media-storage needs.",
    "image": "/products/phones/Iphone 12 pro max .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A14 Bionic",
      "Display: 6.7-inch Super Retina XDR OLED",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A14 Bionic; 6.7-inch Super Retina XDR OLED; Triple-camera Pro system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 12 pro max .jpg"
    ]
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
        "storage": "128GB",
        "price": 850000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 950000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1100000
      }
    ],
    "description": "iPhone 13 mini continues Apple's compact-phone approach with a 5.4-inch OLED display and A15 Bionic. It is designed for customers who want modern iPhone performance and the iOS ecosystem without carrying a large phone. The dual-camera system provides the core photography experience, while 128GB, 256GB and 512GB options give the mini unusually broad storage choices for its size.",
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A15 Bionic",
      "Display: 5.4-inch Super Retina XDR OLED",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic; 5.4-inch Super Retina XDR OLED; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone."
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
        "storage": "128GB",
        "price": 1000000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1100000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1300000
      }
    ],
    "description": "iPhone 13 is a balanced mainstream iPhone combining A15 Bionic, a 6.1-inch Super Retina XDR OLED display and a dual-camera system. It is a strong choice for customers who want a modern-feeling iPhone with a familiar size and substantial storage choices. In the used market it sits comfortably between older 11/12 models and the more expensive Pro generations.",
    "image": "/products/phones/Iphone 13 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A15 Bionic",
      "Display: 6.1-inch Super Retina XDR OLED, 2532 × 1170, 460ppi",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic; 6.1-inch Super Retina XDR OLED, 2532 × 1170, 460ppi; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 13 .jpg"
    ]
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
        "storage": "128GB",
        "price": 1250000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1400000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1600000
      },
      {
        "label": "1TB",
        "storage": "1TB",
        "price": 1800000
      }
    ],
    "description": "iPhone 13 Pro is the premium compact model of the 13 family. It combines A15 Bionic with Apple's Pro display experience and a triple-camera system for customers who want more photography flexibility and a premium screen. Storage reaches 1TB, making it suitable for heavy users and content-heavy workflows. It is a strong option for buyers who want Pro features without the larger Pro Max form factor.",
    "image": "/products/phones/Iphone 13 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB, 1TB",
      "Chip: A15 Bionic",
      "Display: 6.1-inch Super Retina XDR display with ProMotion",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic; 6.1-inch Super Retina XDR display with ProMotion; Triple-camera Pro system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 13 pro .jpg"
    ]
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
        "storage": "128GB",
        "price": 1450000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1600000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1900000
      },
      {
        "label": "1TB",
        "storage": "1TB",
        "price": 2100000
      }
    ],
    "description": "iPhone 13 Pro Max is the large flagship of the 13 family and combines the Pro camera system with a 6.7-inch display. It is designed for customers who prioritise screen size, photography and premium iPhone features. A15 Bionic provides the performance platform, while storage up to 1TB makes it suitable for extensive media libraries and demanding users.",
    "image": "/products/phones/Iphone 13 pro max .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB, 1TB",
      "Chip: A15 Bionic",
      "Display: 6.7-inch Super Retina XDR display with ProMotion",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic; 6.7-inch Super Retina XDR display with ProMotion; Triple-camera Pro system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 13 pro max .jpg"
    ]
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
        "storage": "128GB",
        "price": 1350000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1600000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 1900000
      }
    ],
    "description": "iPhone 14 is the mainstream 14-series model and retains a familiar 6.1-inch OLED format while introducing the generation's updated safety and camera features. Its A15 Bionic with 5-core GPU provides the performance foundation. With 128GB, 256GB and 512GB options, it is suitable for customers who want a newer standard iPhone without paying Pro pricing. It remains a strong everyday choice for communication, photography, video and social media.",
    "image": "/products/phones/Iphone 14.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A15 Bionic with 5-core GPU",
      "Display: 6.1-inch OLED, 2532 × 1170, 460ppi",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic with 5-core GPU; 6.1-inch OLED, 2532 × 1170, 460ppi; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 14.jpg"
    ]
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
        "storage": "128GB",
        "price": 1500000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1750000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 2000000
      }
    ],
    "description": "iPhone 14 Plus brings the standard 14-series experience to a larger 6.7-inch format. It is designed for customers who want a big-screen iPhone but do not require the Pro camera system. A15 Bionic with 5-core GPU provides the core platform, while 128GB, 256GB and 512GB storage options cover different usage levels. It is particularly suited to video, browsing and users who prefer large displays.",
    "image": "/products/phones/Iphone 14 plus .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB",
      "Chip: A15 Bionic with 5-core GPU",
      "Display: 6.7-inch OLED",
      "Rear camera: Dual-camera system",
      "Front camera: 12MP TrueDepth",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A15 Bionic with 5-core GPU; 6.7-inch OLED; Dual-camera system rear; 12MP TrueDepth front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 14 plus .jpg"
    ]
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
        "storage": "128GB",
        "price": 1850000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 2000000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 2200000
      },
      {
        "label": "1TB",
        "storage": "1TB",
        "price": 2400000
      }
    ],
    "description": "iPhone 14 Pro is the premium compact 14-series model and a major step above the standard iPhone 14. A16 Bionic, the Pro display experience, Dynamic Island and the triple-camera system give it a clear flagship identity. It is aimed at customers who want advanced iPhone hardware in a manageable 6.1-inch format, with storage up to 1TB for heavy users.",
    "image": "/products/phones/Iphone 14 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB, 1TB",
      "Chip: A16 Bionic",
      "Display: 6.1-inch Super Retina XDR display with ProMotion and Dynamic Island",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth with autofocus",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A16 Bionic; 6.1-inch Super Retina XDR display with ProMotion and Dynamic Island; Triple-camera Pro system rear; 12MP TrueDepth with autofocus front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 14 pro .jpg"
    ]
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
        "storage": "128GB",
        "price": 2000000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 2200000
      },
      {
        "label": "512GB",
        "storage": "512GB",
        "price": 2450000
      },
      {
        "label": "1TB",
        "storage": "1TB",
        "price": 2500000
      }
    ],
    "description": "iPhone 14 Pro Max is the top conventional model of the 14 family, combining A16 Bionic, a large 6.7-inch Pro display, Dynamic Island and the Pro camera system. It is designed for customers who want maximum screen size and flagship iPhone features. With storage up to 1TB, it is especially suitable for customers who keep large media libraries or want the highest tier of this generation.",
    "image": "/products/phones/Iphone 14 pro max .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB, 256GB, 512GB, 1TB",
      "Chip: A16 Bionic",
      "Display: 6.7-inch Super Retina XDR display with ProMotion and Dynamic Island",
      "Rear camera: Triple-camera Pro system",
      "Front camera: 12MP TrueDepth with autofocus",
      "Operating system: iOS",
      "Market position: Apple iPhone catalogue model"
    ],
    "quickSpecs": "A16 Bionic; 6.7-inch Super Retina XDR display with ProMotion and Dynamic Island; Triple-camera Pro system rear; 12MP TrueDepth with autofocus front; iOS smartphone.",
    "images": [
      "/products/phones/Iphone 14 pro max .jpg"
    ]
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
    "image": "/products/phones/Iphone 15.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 15.jpg"
    ]
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
    "image": "/products/phones/Iphone 15 plus.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 15 plus.jpg"
    ]
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
    "image": "/products/phones/IPhone  15 pro.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/IPhone  15 pro.jpg"
    ]
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
    "image": "/products/phones/Iphone 15 pro max.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 15 pro max.jpg"
    ]
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
    "image": "/products/phones/Iphone 16 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 16 .jpg"
    ]
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
    "image": "/products/phones/Iphone 16 plus.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 16 plus.jpg"
    ]
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
    "image": "/products/phones/Iphone 16 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 16 pro .jpg"
    ]
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
    "image": "/products/phones/Iphone 16 pro max .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 16 pro max .jpg"
    ]
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
    "image": "/products/phones/Iphone 17 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 17 .jpg"
    ]
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
    "image": "/products/phones/Iphone 17 air .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 17 air .jpg"
    ]
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
    "image": "/products/phones/Iphone 17 pro.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 17 pro.jpg"
    ]
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
    "image": "/products/phones/Iphone 17 pro max.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Iphone 17 pro max.jpg"
    ]
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
    "image": "/products/phones/Galaxy A06 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A06 .jpg"
    ]
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
    "image": "/products/phones/Galaxy A07 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A07 .jpg"
    ]
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
    "image": "/products/phones/Galaxy A16 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A16 .jpg"
    ]
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
    "image": "/products/phones/Galaxy A17 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A17 .jpg"
    ]
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
    "image": "/products/phones/Galaxy A26 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A26 .jpg"
    ]
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
    "image": "/products/phones/Galaxy A36.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A36.jpg"
    ]
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
    "image": "/products/phones/Galaxy A56.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A56.jpg"
    ]
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
    "image": "/products/phones/Galaxy A57.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy A57.jpg",
      "/products/phones/Galaxy A57 .jpg"
    ]
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
        "ram": "8GB",
        "price": 700000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 800000
      }
    ],
    "description": "Samsung Galaxy S21 remains a compact flagship-oriented smartphone with the core design language and feature set associated with Samsung's S series. Its 6.2-inch Dynamic AMOLED 2X display and 120Hz refresh rate give it a premium viewing experience while keeping the physical footprint more manageable than the larger S21+ and S21 Ultra. The triple rear-camera system combines 12MP, 64MP and 12MP cameras, giving the phone a versatile photography proposition for everyday users. Its 4000mAh battery, IP68 protection and wireless charging support add flagship-era convenience and durability. With 128GB and 256GB storage options, the S21 is suitable for customers who want a premium Samsung experience in a smaller format and at a more accessible used-market price.",
    "image": "/products/phones/Galaxy S21 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.2-inch Dynamic AMOLED 2X, 120Hz, 2400 × 1080",
      "Processor: Exynos 2100 in applicable African/regional configurations",
      "Rear cameras: 12MP + 64MP + 12MP",
      "Front camera: 10MP",
      "Battery: 4000mAh typical",
      "Durability: IP68",
      "Charging: wired and wireless charging support",
      "Position: compact S-series flagship generation"
    ],
    "quickSpecs": "6.2-inch Dynamic AMOLED 2X; 120Hz; Exynos 2100 regional configuration; 12MP + 64MP + 12MP rear cameras; 10MP front; 4000mAh; IP68; wireless charging.",
    "images": [
      "/products/phones/Galaxy S21 .jpg"
    ]
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
        "ram": "8GB",
        "price": 800000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 900000
      }
    ],
    "description": "Samsung Galaxy S21+ takes the S21 experience into a larger form factor. Its 6.7-inch Dynamic AMOLED 2X display and 120Hz refresh rate make it particularly suited to customers who enjoy video, browsing, social media and other content on a larger screen. The same versatile 12MP, 64MP and 12MP rear-camera arrangement as the S21 gives it a capable everyday photography proposition, while the 4800mAh battery provides more capacity than the smaller S21. IP68 protection and wireless charging reinforce its flagship positioning. The S21+ is a strong used-market choice for customers who want a premium Samsung display and large-screen experience without paying the premium associated with the Ultra models.",
    "image": "/products/phones/Galaxy S21+ .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.7-inch Dynamic AMOLED 2X, 120Hz, FHD+",
      "Processor: Exynos 2100 in applicable African/regional configurations",
      "Rear cameras: 12MP + 64MP + 12MP",
      "Front camera: 10MP",
      "Battery: 4800mAh typical",
      "Durability: IP68",
      "Charging: wired and wireless charging support"
    ],
    "quickSpecs": "6.7-inch Dynamic AMOLED 2X; 120Hz; Exynos 2100 regional configuration; 12MP + 64MP + 12MP; 10MP front; 4800mAh; IP68.",
    "images": [
      "/products/phones/Galaxy S21+ .jpg"
    ]
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
        "ram": "12GB",
        "price": 950000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 1050000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 1200000
      }
    ],
    "description": "Samsung Galaxy S21 Ultra is the high-end flagship of the S21 generation and is designed for customers who want the largest display, most advanced camera system and highest-end feature set of the family. Its 6.8-inch QHD+ LTPO Dynamic AMOLED 2X display combines high resolution with an adaptive high refresh rate, making it well suited to media, productivity and premium everyday use. The 108MP main camera is supported by an ultrawide and two telephoto cameras, giving the Ultra a broader photography proposition than the standard S21 models. A 5000mAh battery, IP68 protection and S Pen support add to its flagship identity. With storage up to 512GB, it is particularly suitable for users who keep large media libraries and want a premium Samsung experience.",
    "image": "/products/phones/Galaxy S21 ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB",
      "RAM: 12GB/16GB configurations depending storage",
      "Display: 6.8-inch QHD+ LTPO Dynamic AMOLED 2X, up to 120Hz",
      "Processor: Exynos 2100 in applicable African/regional configurations",
      "Rear cameras: 108MP + 12MP ultrawide + 10MP telephoto + 10MP telephoto",
      "Front camera: 40MP",
      "Battery: 5000mAh typical",
      "Durability: IP68",
      "S Pen support",
      "Wireless charging support"
    ],
    "quickSpecs": "6.8-inch QHD+ Dynamic AMOLED 2X; 120Hz; 108MP + 12MP + 10MP + 10MP; 40MP front; 5000mAh; IP68; S Pen support.",
    "images": [
      "/products/phones/Galaxy S21 ultra.jpg"
    ]
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
        "ram": "8GB",
        "price": 750000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 850000
      }
    ],
    "description": "Samsung Galaxy S22 is the compact member of the S22 generation and offers a premium Samsung experience in a smaller body. Its 6.1-inch Dynamic AMOLED 2X display with 120Hz refresh is suited to customers who prefer a phone that is easier to handle while still delivering a high-end screen experience. The camera system moves to a 50MP main camera alongside 10MP telephoto and 12MP ultrawide cameras, giving it a flexible everyday imaging setup. The 3700mAh battery reflects the compact design, while IP68 protection adds durability. The S22 is particularly attractive in the used market for customers who want a recent-feeling Samsung flagship at a lower price and who value compact size over the larger battery and display of the Plus and Ultra models.",
    "image": "/products/phones/Galaxy S22.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.1-inch FHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Exynos 2200 in applicable African/regional configurations",
      "Rear cameras: 50MP + 10MP telephoto + 12MP ultrawide",
      "Front camera: 10MP",
      "Battery: 3700mAh typical",
      "Durability: IP68"
    ],
    "quickSpecs": "6.1-inch FHD+ Dynamic AMOLED 2X; 120Hz; 50MP + 10MP + 12MP rear; 10MP front; 3700mAh; IP68.",
    "images": [
      "/products/phones/Galaxy S22.jpg"
    ]
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
        "ram": "8GB",
        "price": 900000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1000000
      }
    ],
    "description": "Samsung Galaxy S22+ is the larger, more endurance-focused alternative to the compact S22. Its 6.6-inch Dynamic AMOLED 2X 120Hz display gives customers more space for video, browsing, gaming and productivity, while the 4500mAh battery provides additional capacity. The 50MP main camera, 10MP telephoto and 12MP ultrawide create a versatile photography system, and IP68 protection reinforces its premium positioning. The S22+ is a good fit for customers who want the flagship S-series experience but prefer a large-screen phone without moving to the more expensive and feature-heavy Ultra. In the used market, it offers a strong balance between physical size, display quality, camera versatility and price.",
    "image": "/products/phones/Galaxy S22+.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.6-inch FHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Exynos 2200 in applicable African/regional configurations",
      "Rear cameras: 50MP + 10MP telephoto + 12MP ultrawide",
      "Front camera: 10MP",
      "Battery: 4500mAh typical",
      "Durability: IP68"
    ],
    "quickSpecs": "6.6-inch FHD+ Dynamic AMOLED 2X; 120Hz; 50MP + 10MP + 12MP; 10MP front; 4500mAh; IP68.",
    "images": [
      "/products/phones/Galaxy S22+.jpg"
    ]
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
        "ram": "8GB",
        "price": 1200000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 1300000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1500000
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB"
      }
    ],
    "description": "Samsung Galaxy S22 Ultra is the flagship of the S22 generation and represents the point where Samsung's S-series and Note-style productivity experience meet. Its 6.8-inch QHD+ Dynamic AMOLED 2X display with 120Hz refresh is designed for premium media, productivity and content creation. The 108MP main camera is paired with two telephoto cameras and an ultrawide, giving the Ultra a highly flexible camera system. The integrated S Pen is a major distinction, making the model relevant to customers who take handwritten notes, annotate documents or want stylus-based interaction. A 5000mAh battery and IP68 protection complete the flagship proposition. Its 128GB, 256GB and 512GB options provide clear storage choices for different budgets and usage levels.",
    "image": "/products/phones/Galaxy S22 ultra .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB",
      "RAM: 8GB/12GB configurations",
      "Display: 6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Exynos 2200 in applicable African/regional configurations",
      "Rear cameras: 108MP + 10MP telephoto + 10MP telephoto + 12MP ultrawide",
      "Front camera: 40MP",
      "Battery: 5000mAh typical",
      "Durability: IP68",
      "Integrated S Pen"
    ],
    "quickSpecs": "6.8-inch QHD+ Dynamic AMOLED 2X; 120Hz; 108MP + 10MP + 10MP + 12MP; 40MP front; 5000mAh; S Pen; IP68.",
    "images": [
      "/products/phones/Galaxy S22 ultra .jpg"
    ]
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
        "ram": "8GB",
        "price": 1000000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1100000
      }
    ],
    "description": "Samsung Galaxy S23 is a compact flagship built around a combination of premium display quality, flagship processing and a versatile triple-camera system. The 6.1-inch Dynamic AMOLED 2X display runs at 120Hz and gives the phone a high-end viewing experience while maintaining a relatively compact form. Samsung's Snapdragon 8 Gen 2 for Galaxy platform gives the S23 a clear performance-focused identity, while the 50MP main, 10MP telephoto and 12MP ultrawide cameras cover a broad range of photography. Its 3900mAh battery is paired with a compact form factor, and IP68 protection adds durability. With 128GB and 256GB storage, the S23 is especially attractive to customers who want a current-feeling flagship in a smaller phone.",
    "image": "/products/phones/Galaxy S23.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.1-inch FHD+ Dynamic AMOLED 2X, 2340 × 1080, 120Hz",
      "Processor: Snapdragon 8 Gen 2 for Galaxy",
      "Rear cameras: 50MP + 10MP telephoto + 12MP ultrawide",
      "Front camera: 12MP",
      "Battery: 3900mAh typical",
      "Connectivity: Wi-Fi 6E, Bluetooth 5.3, NFC, USB 3.2 Gen1",
      "Durability: IP68",
      "Dimensions: 146.3 × 70.9 × 7.6mm; 168g"
    ],
    "quickSpecs": "6.1-inch FHD+ Dynamic AMOLED 2X; 120Hz; 50MP + 10MP + 12MP; 12MP front; 3900mAh; Snapdragon 8 Gen 2 for Galaxy; IP68.",
    "images": [
      "/products/phones/Galaxy S23.jpg"
    ]
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
        "ram": "8GB",
        "price": 1250000
      },
      {
        "label": "512GB · 8GB RAM",
        "storage": "512GB",
        "ram": "8GB",
        "price": 1450000
      }
    ],
    "description": "Samsung Galaxy S23+ expands the S23 experience with a larger 6.6-inch display and a larger 4700mAh battery. It retains the Snapdragon 8 Gen 2 for Galaxy platform and versatile 50MP, 10MP telephoto and 12MP ultrawide rear cameras, making it a balanced premium phone for customers who value both performance and screen size. The 120Hz Dynamic AMOLED 2X display is particularly suited to media, browsing and gaming, while IP68 protection adds confidence for everyday use. With 256GB and 512GB configurations, the S23+ is aimed at customers who want more storage and a larger flagship form factor than the standard S23 but do not need the S23 Ultra's specialised camera and S Pen features.",
    "image": "/products/phones/Galaxy S23+ .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB",
      "RAM: 8GB",
      "Display: 6.6-inch FHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Snapdragon 8 Gen 2 for Galaxy",
      "Rear cameras: 50MP + 10MP telephoto + 12MP ultrawide",
      "Front camera: 12MP",
      "Battery: 4700mAh typical",
      "Durability: IP68"
    ],
    "quickSpecs": "6.6-inch FHD+ Dynamic AMOLED 2X; 120Hz; Snapdragon 8 Gen 2 for Galaxy; 50MP + 10MP + 12MP; 12MP front; 4700mAh; IP68.",
    "images": [
      "/products/phones/Galaxy S23+ .jpg"
    ]
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
        "ram": "8GB",
        "price": 1600000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 1600000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1800000
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB",
        "price": 2100000
      }
    ],
    "description": "Samsung Galaxy S23 Ultra is the top-tier model of the S23 generation and is built for customers who want the most complete flagship experience in the family. Its 6.8-inch QHD+ Dynamic AMOLED 2X display combines large size, high resolution and 120Hz refresh, making it suitable for entertainment and productivity. The 200MP main camera is joined by two telephoto cameras and a 12MP ultrawide, giving the Ultra a broad photography toolkit. The Snapdragon 8 Gen 2 for Galaxy platform provides its flagship performance foundation, while the integrated S Pen adds a dedicated productivity and creativity dimension. A 5000mAh battery, IP68 protection and storage up to 1TB make it especially suited to heavy users and customers who want a premium Samsung phone with minimal compromise.",
    "image": "/products/phones/Galaxy S23 ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB / 1TB",
      "RAM: 8GB/12GB configurations",
      "Display: 6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Snapdragon 8 Gen 2 for Galaxy",
      "Rear cameras: 200MP + 10MP telephoto + 10MP telephoto + 12MP ultrawide",
      "Front camera: 12MP",
      "Battery: 5000mAh typical",
      "Durability: IP68",
      "Integrated S Pen"
    ],
    "quickSpecs": "6.8-inch QHD+ Dynamic AMOLED 2X; 120Hz; Snapdragon 8 Gen 2 for Galaxy; 200MP + 10MP + 10MP + 12MP; 12MP front; 5000mAh; S Pen; IP68.",
    "images": [
      "/products/phones/Galaxy S23 ultra.jpg"
    ]
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
        "ram": "8GB",
        "price": 1300000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1400000
      }
    ],
    "description": "Samsung Galaxy S24 is the compact flagship of the S24 family and combines a manageable form factor with Samsung's premium display, camera and software ecosystem. Its 6.2-inch Dynamic AMOLED 2X screen runs at 120Hz and delivers a sharp 2340 × 1080 resolution. The 50MP, 10MP and 12MP rear-camera combination provides a flexible everyday imaging setup, while the 12MP front camera handles selfies and video calls. With 8GB RAM, 128GB or 256GB storage, 4000mAh battery capacity and 5G connectivity, it is designed as a balanced premium daily driver. Features such as stereo speakers, NFC, Wi-Fi 6E and DeX broaden its use beyond basic smartphone tasks. The S24 is particularly suited to customers who want flagship Samsung functionality without the larger dimensions of the Plus and Ultra models.",
    "image": "/products/phones/Galaxy S24.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.2-inch Dynamic AMOLED 2X, 2340 × 1080, 120Hz",
      "Rear cameras: 50MP + 10MP + 12MP",
      "Front camera: 12MP",
      "Battery: 4000mAh typical",
      "SIM: dual SIM; nano-SIM + eSIM options depending configuration/market",
      "Connectivity: 2G/3G/4G/5G, USB-C 3.2 Gen1, Wi-Fi 6E, Bluetooth 5.3, NFC, GPS",
      "Audio: stereo speakers",
      "Features: DeX, IP68",
      "Dimensions: 147.0 × 70.6 × 7.6mm; 167g"
    ],
    "quickSpecs": "6.2-inch Dynamic AMOLED 2X; 2340×1080; 120Hz; 50MP + 10MP + 12MP; 12MP front; 8GB RAM; 4000mAh; 5G; IP68; DeX.",
    "images": [
      "/products/phones/Galaxy S24.jpg"
    ]
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
        "ram": "12GB",
        "price": 1700000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1900000
      }
    ],
    "description": "Samsung Galaxy S24+ is the large-screen flagship for customers who want the S24 family's premium experience without moving to the Ultra. Its 6.7-inch QHD+ Dynamic AMOLED 2X display combines 3120 × 1440 resolution with 120Hz refresh, making it particularly attractive for video, productivity, browsing and other screen-intensive use. The 50MP, 10MP and 12MP rear cameras provide a versatile imaging system, while the 12MP front camera supports selfies and video communication. Its 12GB RAM configuration and 256GB/512GB storage options give the S24+ a strong premium multitasking and storage position. It is the natural choice for buyers who prioritise screen size and flagship presentation but prefer the cleaner, simpler S24+ design over the more specialised Ultra.",
    "image": "/products/phones/Galaxy S24+.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB",
      "RAM: 12GB",
      "Display: 6.7-inch QHD+ Dynamic AMOLED 2X, 3120 × 1440, 120Hz",
      "Rear cameras: 50MP + 10MP + 12MP",
      "Front camera: 12MP",
      "Position: larger S24 flagship with higher-resolution display and expanded storage choices"
    ],
    "quickSpecs": "6.7-inch QHD+ Dynamic AMOLED 2X; 3120×1440; 120Hz; 50MP + 10MP + 12MP; 12MP front; 12GB RAM; 256GB/512GB.",
    "images": [
      "/products/phones/Galaxy S24+.jpg"
    ]
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
        "ram": "12GB",
        "price": 2500000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 2700000
      },
      {
        "label": "1TB · 12GB RAM",
        "storage": "1TB",
        "ram": "12GB",
        "price": 3100000
      }
    ],
    "description": "Samsung Galaxy S24 Ultra is the flagship reference point for the S24 family and is designed for customers who want Samsung's most complete premium smartphone experience in this generation. Its 6.8-inch QHD+ Dynamic AMOLED 2X display with 120Hz refresh provides a large, high-resolution canvas for entertainment, productivity and creative work. The camera system combines a 200MP main camera with 50MP and 10MP telephoto cameras plus a 12MP ultrawide, giving the Ultra a broad range of shooting perspectives. Snapdragon 8 Gen 3 for Galaxy provides the flagship processing platform, while the integrated S Pen makes the phone relevant to note-taking, annotation and creative workflows. A 5000mAh battery, IP68 protection and storage up to 1TB complete the high-end proposition. It is the Samsung model for customers who want maximum capability and are willing to pay for it.",
    "image": "/products/phones/Galaxy S24 ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB / 1TB",
      "RAM: 12GB",
      "Display: 6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz",
      "Processor: Snapdragon 8 Gen 3 for Galaxy",
      "Rear cameras: 200MP + 50MP telephoto + 10MP telephoto + 12MP ultrawide",
      "Front camera: 12MP",
      "Battery: 5000mAh",
      "Durability: IP68",
      "Integrated S Pen",
      "Position: top-tier S-series flagship"
    ],
    "quickSpecs": "6.8-inch QHD+ Dynamic AMOLED 2X; 120Hz; Snapdragon 8 Gen 3 for Galaxy; 200MP + 50MP + 10MP + 12MP; 12MP front; 5000mAh; 12GB; S Pen; IP68.",
    "images": [
      "/products/phones/Galaxy S24 ultra.jpg"
    ]
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
    "image": "/products/phones/Galaxy S25 plus.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy S25 plus.jpg"
    ]
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
    "image": "/products/phones/Galaxy S25 edge .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy S25 edge .jpg"
    ]
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
    "image": "/products/phones/Galaxy S26 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy S26 .jpg"
    ]
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
    "image": "/products/phones/Galaxy S26 plus .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy S26 plus .jpg"
    ]
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
    "image": "/products/phones/Galaxy S26 ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy S26 ultra.jpg"
    ]
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
    "image": "/products/phones/Galaxy Z fold 6 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy Z fold 6 .jpg"
    ]
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
    "image": "/products/phones/Galaxy fold 7.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy fold 7.jpg"
    ]
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
    "image": "/products/phones/Galaxy fold 8 standard passport.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy fold 8 standard passport.jpg"
    ]
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
    "image": "/products/phones/Galaxy fold 8 ultra .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy fold 8 ultra .jpg"
    ]
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
    "image": "/products/phones/Flip 6.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Flip 6.jpg"
    ]
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
    "image": "/products/phones/Galaxy Z flip 7.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Galaxy Z flip 7.jpg",
      "/products/phones/Galaxy flip 7.jpg"
    ]
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
    "image": "/products/phones/Flip 8.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Flip 8.jpg"
    ]
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
        "ram": "8GB",
        "price": 700000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 800000
      }
    ],
    "description": "Google Pixel 6 introduced Google's Tensor-era flagship direction and remains a strong choice for customers who want the Pixel software and camera experience at a lower used-market price. Its 6.4-inch FHD+ OLED display with 90Hz refresh gives it a modern viewing experience, while 8GB RAM and Google Tensor provide the hardware foundation for everyday apps and Google's computational approach to photography. The 50MP main and 12MP ultrawide cameras form the core rear imaging system. A 4614mAh typical battery, wireless charging and IP68 protection give the Pixel 6 a more complete flagship profile than its current used-market price might suggest. The 128GB and 256GB options make it easy to position for both moderate and heavier storage users.",
    "image": "/products/phones/Pixel 6.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB UFS 3.1",
      "RAM: 8GB",
      "Display: 6.4-inch FHD+ OLED, 1080 × 2400, 90Hz",
      "Processor: Google Tensor",
      "Rear cameras: 50MP + 12MP ultrawide",
      "Front camera: 8MP",
      "Battery: 4614mAh typical",
      "Charging: wired and wireless charging",
      "Durability: IP68"
    ],
    "quickSpecs": "6.4-inch FHD+ OLED 90Hz; Google Tensor; 8GB RAM; 50MP + 12MP rear; 8MP front; 4614mAh; wireless charging; IP68.",
    "images": [
      "/products/phones/Pixel 6.jpg"
    ]
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
        "ram": "12GB",
        "price": 850000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 950000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1100000
      }
    ],
    "description": "Google Pixel 6 Pro is the larger and more advanced Pixel 6 generation model, designed for customers who want a bigger premium display and a more capable camera system. Its 6.7-inch QHD+ LTPO OLED panel supports 120Hz refresh, giving the phone a high-end visual experience. The 12GB RAM configuration and Google Tensor platform provide its flagship foundation, while the 50MP main, 12MP ultrawide and 48MP 4x telephoto cameras give it a broader photography range than the standard Pixel 6. A 5003mAh typical battery, wireless charging and IP68 protection complete the premium package. With storage up to 512GB, the Pixel 6 Pro is particularly suited to customers who keep substantial photo and video libraries.",
    "image": "/products/phones/Pixel 6 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB UFS 3.1",
      "RAM: 12GB",
      "Display: 6.7-inch QHD+ LTPO OLED, 120Hz",
      "Processor: Google Tensor",
      "Rear cameras: 50MP + 12MP ultrawide + 48MP 4x telephoto",
      "Battery: 5003mAh typical",
      "Charging: wired and wireless charging",
      "Durability: IP68"
    ],
    "quickSpecs": "6.7-inch QHD+ LTPO OLED 120Hz; Tensor; 12GB RAM; 50MP + 12MP + 48MP 4x telephoto; 5003mAh; wireless; IP68.",
    "images": [
      "/products/phones/Pixel 6 pro .jpg"
    ]
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
        "ram": "6GB",
        "price": 550000
      }
    ],
    "description": "Google Pixel 6a brings the core Pixel and Tensor experience into a more affordable, compact package. Its 6.134-inch OLED display is smaller and runs at 60Hz, but the phone retains Google's Tensor platform and Pixel camera approach. The 12.2MP main camera and 12MP ultrawide cover the key photography perspectives, while the 8MP front camera handles selfies and video calls. With 6GB LPDDR5 RAM and 128GB storage, it is straightforward to position as a compact daily Pixel rather than a storage-heavy flagship. The 4410mAh typical battery, 18W wired charging and IP67 protection give it practical everyday credentials. It is particularly suited to customers who want the Pixel software and camera identity at a lower price than the Pro models.",
    "image": "/products/phones/Pixel 6a.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB UFS",
      "RAM: 6GB LPDDR5",
      "OS: Android 12 at launch",
      "Display: 6.134-inch FHD+ OLED, 1080 × 2400, 60Hz",
      "Processor: Google Tensor",
      "Rear cameras: 12.2MP + 12MP ultrawide",
      "Front camera: 8MP",
      "Battery: 4410mAh typical",
      "Charging: 18W wired",
      "Connectivity: Wi-Fi 6E, Bluetooth 5.2, NFC, USB-C, nano-SIM + eSIM",
      "Durability: IP67"
    ],
    "quickSpecs": "6.134-inch FHD+ OLED 60Hz; Google Tensor; 6GB LPDDR5; 128GB; 12.2MP + 12MP; 8MP front; 4410mAh; 18W; IP67.",
    "images": [
      "/products/phones/Pixel 6a.jpg"
    ]
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
        "ram": "8GB",
        "price": 900000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1000000
      }
    ],
    "description": "Google Pixel 7 is a compact flagship Pixel built around Google's Tensor G2 platform and computational photography approach. Its 6.3-inch OLED display with 90Hz refresh keeps the device relatively compact while still offering a smooth modern viewing experience. The 50MP main and 12MP ultrawide cameras form the central imaging proposition, making the Pixel 7 a natural choice for customers who prioritise photography and Google's software experience. The 128GB and 256GB options give buyers a choice between lower entry pricing and additional storage. Wireless charging and IP68 protection reinforce its flagship positioning. In the used market, the Pixel 7 is a strong balance between premium Pixel features, manageable size and a lower price than the Pro generation.",
    "image": "/products/phones/Pixel 7.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB",
      "Display: 6.3-inch OLED, 90Hz",
      "Processor: Google Tensor G2",
      "Rear cameras: 50MP main + 12MP ultrawide",
      "Charging: wired and wireless charging support",
      "Durability: IP68"
    ],
    "quickSpecs": "6.3-inch OLED 90Hz; Google Tensor G2; 8GB RAM; 50MP + 12MP rear; 10.8MP-class front; wireless charging; IP68.",
    "images": [
      "/products/phones/Pixel 7.jpg"
    ]
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
        "ram": "12GB",
        "price": 1200000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 1300000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1500000
      }
    ],
    "description": "Google Pixel 7 Pro is the premium Pixel 7 generation model, built for customers who want a larger high-resolution display and a more versatile camera system. Its 6.7-inch QHD+ LTPO OLED panel supports 120Hz refresh and provides a premium viewing experience for video, browsing and productivity. Google Tensor G2 and 12GB RAM form the performance foundation, while the 50MP main, 12MP ultrawide and 48MP 5x telephoto cameras provide three distinct photography perspectives. A 5000mAh typical battery and IP68 protection support its flagship positioning. Storage reaches 512GB, making it suitable for customers who maintain large photo and video libraries. It is the Pixel choice for users who want a larger, more capable camera-focused flagship.",
    "image": "/products/phones/Pixel 7 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB UFS 3.1",
      "RAM: 12GB LPDDR5",
      "Display: 6.7-inch QHD+ 1440 × 3120 LTPO OLED, 120Hz",
      "Processor: Google Tensor G2",
      "Rear cameras: 50MP + 12MP ultrawide + 48MP 5x telephoto",
      "Battery: 5000mAh typical",
      "Weight: 212g",
      "Durability: IP68"
    ],
    "quickSpecs": "6.7-inch QHD+ LTPO OLED 120Hz; Tensor G2; 12GB RAM; 50MP + 12MP + 48MP 5x telephoto; 5000mAh; IP68.",
    "images": [
      "/products/phones/Pixel 7 pro .jpg"
    ]
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
        "ram": "8GB",
        "price": 650000
      }
    ],
    "description": "Google Pixel 7a is the more affordable entry into the Tensor G2 generation and is aimed at customers who want the Pixel software and camera identity without paying for the flagship Pro models. Its 6.1-inch OLED 90Hz display keeps the device compact, while 8GB RAM and Tensor G2 provide a strong foundation for everyday use. The 64MP main and 13MP ultrawide cameras give the phone a flexible imaging setup, complemented by a 13MP front camera. A 4385mAh typical battery, wireless charging and IP67 protection add useful features for daily use. The 128GB configuration makes the model simple to position as an affordable compact Pixel for photography, social media, communication and everyday smartphone use.",
    "image": "/products/phones/Pixel 7a .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB",
      "RAM: 8GB",
      "Display: 6.1-inch OLED, 90Hz",
      "Processor: Google Tensor G2",
      "Rear cameras: 64MP + 13MP ultrawide",
      "Front camera: 13MP",
      "Battery: 4385mAh typical",
      "Charging: wireless charging support",
      "Durability: IP67"
    ],
    "quickSpecs": "6.1-inch OLED 90Hz; Tensor G2; 8GB RAM; 64MP + 13MP; 13MP front; 4385mAh; wireless charging; IP67.",
    "images": [
      "/products/phones/Pixel 7a .jpg"
    ]
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
        "ram": "8GB",
        "price": 1100000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1300000
      }
    ],
    "description": "Google Pixel 8 is a compact modern Pixel built around the Tensor G3 platform and Google's camera-focused software experience. Its 6.2-inch Actua OLED display can operate from 60Hz to 120Hz, giving it a smooth and responsive presentation while retaining a compact form. The 50MP main and 12MP ultrawide cameras provide the primary rear imaging system, while the 10.5MP front camera supports selfies and video calls. With 8GB LPDDR5X RAM, 128GB or 256GB UFS storage, a 4575mAh typical battery, wireless charging and IP68 protection, the Pixel 8 is a well-rounded premium daily phone. It is particularly attractive to customers who want a modern compact Pixel without moving into the larger Pro model.",
    "image": "/products/phones/Pixel 8.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB UFS 3.1",
      "RAM: 8GB LPDDR5X",
      "Display: 6.2-inch Actua OLED, 1080 × 2400, 60–120Hz",
      "Processor: Google Tensor G3",
      "Rear cameras: 50MP + 12MP ultrawide",
      "Front camera: 10.5MP",
      "Battery: 4575mAh typical",
      "Charging: wired and wireless charging",
      "Durability: IP68"
    ],
    "quickSpecs": "6.2-inch Actua OLED 60–120Hz; Tensor G3; 8GB LPDDR5X; 50MP + 12MP; 10.5MP front; 4575mAh; wireless; IP68.",
    "images": [
      "/products/phones/Pixel 8.jpg"
    ]
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
        "ram": "12GB",
        "price": 1500000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 1700000
      },
      {
        "label": "512GB · 12GB RAM",
        "storage": "512GB",
        "ram": "12GB",
        "price": 1900000
      }
    ],
    "description": "Google Pixel 8 Pro is the premium camera and display model of the Pixel 8 generation. Its 6.7-inch Super Actua LTPO OLED display supports an adaptive 1–120Hz refresh range and high 1344 × 2992 resolution, giving it a premium large-screen experience. Tensor G3 and 12GB LPDDR5X RAM provide the hardware foundation, while the 50MP main, 48MP ultrawide and 48MP 5x telephoto cameras create a comprehensive rear camera system. The 10.5MP autofocus front camera adds a more advanced front-camera setup. A 5050mAh typical battery, wireless charging, IP68 protection and a temperature sensor add to the feature set. With storage options reaching 1TB in this catalogue, the Pixel 8 Pro is suited to heavy users, photography enthusiasts and customers who want Google's most capable conventional Pixel of this generation.",
    "image": "/products/phones/Pixel 8 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB / 1TB catalogue configurations",
      "RAM: 12GB LPDDR5X",
      "Display: 6.7-inch Super Actua LTPO OLED, 1344 × 2992, 1–120Hz",
      "Processor: Google Tensor G3",
      "Rear cameras: 50MP + 48MP ultrawide + 48MP 5x telephoto",
      "Front camera: 10.5MP autofocus",
      "Battery: 5050mAh typical",
      "Features: temperature sensor, wireless charging, IP68"
    ],
    "quickSpecs": "6.7-inch Super Actua LTPO OLED 1–120Hz; Tensor G3; 12GB LPDDR5X; 50MP + 48MP + 48MP 5x; 10.5MP AF front; 5050mAh; IP68; temperature sensor.",
    "images": [
      "/products/phones/Pixel 8 pro .jpg"
    ]
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
        "ram": "8GB",
        "price": 900000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1000000
      }
    ],
    "description": "Google Pixel 8a brings the Tensor G3 generation into the more affordable A-series while retaining a modern 120Hz Actua OLED display and Pixel's camera-focused identity. The 6.1-inch screen keeps the phone compact, while 8GB LPDDR5X RAM and Tensor G3 provide a strong platform for everyday apps and Google's software features. The 64MP main and 13MP ultrawide cameras form the rear imaging system, while Qi wireless charging, Titan M2 security and IP67 protection add useful premium touches. The 128GB and 256GB configurations make it accessible to different storage needs. Its seven-year update commitment is a major long-term selling point. The Pixel 8a is therefore best positioned as the value-conscious route into a modern Tensor Pixel experience.",
    "image": "/products/phones/Pixel 8a.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB UFS 3.1",
      "RAM: 8GB LPDDR5X",
      "Display: 6.1-inch Actua OLED, 1080 × 2400, 120Hz",
      "Processor: Google Tensor G3",
      "Rear cameras: 64MP + 13MP ultrawide",
      "Battery: 4492mAh typical",
      "Charging: Qi wireless charging",
      "Security: Titan M2",
      "Durability: IP67",
      "Software support: 7 years of updates"
    ],
    "quickSpecs": "6.1-inch Actua OLED 120Hz; Tensor G3; 8GB LPDDR5X; 64MP + 13MP; 4492mAh; wireless Qi; IP67; 7 years updates.",
    "images": [
      "/products/phones/Pixel 8a.jpg"
    ]
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
        "ram": "12GB",
        "price": 2000000
      },
      {
        "label": "256GB · 12GB RAM",
        "storage": "256GB",
        "ram": "12GB",
        "price": 2300000
      }
    ],
    "description": "Google Pixel 9 is the standard flagship of the Pixel 9 generation and is designed for customers who want Google's current flagship experience in a compact form. Its 6.3-inch Actua OLED display supports 60–120Hz refresh, giving the phone a smooth modern presentation without becoming as large as the Pro XL. Tensor G4 and 12GB RAM provide the core platform, while the 50MP and 48MP rear cameras give the Pixel 9 a strong imaging proposition. The 10.5MP front camera supports selfies and video communication, while wireless charging and IP68 protection reinforce the premium positioning. Available in 128GB and 256GB, the Pixel 9 is a balanced choice for customers who want current-generation Pixel hardware without the larger size and higher price of the Pro XL.",
    "image": "/products/phones/Pixel 9.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 12GB",
      "Display: 6.3-inch Actua OLED, 60–120Hz",
      "Processor: Google Tensor G4",
      "Rear cameras: 50MP + 48MP",
      "Front camera: 10.5MP",
      "Charging: wireless charging support",
      "Durability: IP68"
    ],
    "quickSpecs": "6.3-inch Actua OLED 60–120Hz; Tensor G4; 12GB RAM; 50MP + 48MP; 10.5MP front; wireless charging; IP68.",
    "images": [
      "/products/phones/Pixel 9.jpg"
    ]
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
        "ram": "16GB",
        "price": 2400000
      },
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB",
        "price": 2700000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 3100000
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB",
        "price": 3500000
      }
    ],
    "description": "Google Pixel 9 Pro is the compact Pro flagship for customers who want Google's highest-end camera and display experience without moving to the larger Pro XL. Its 6.3-inch Super Actua LTPO display supports an adaptive 1–120Hz range, while Tensor G4 and 16GB RAM give the model a distinctly premium hardware position. The rear camera system combines 50MP main, 48MP ultrawide and 48MP 5x telephoto cameras, while the 42MP front camera gives the Pro a particularly high-resolution selfie and video-call proposition. Storage options extend from 128GB to 1TB, allowing the phone to serve both moderate and very heavy users. Wireless charging and IP68 protection round out the premium package. It is the Pixel choice for customers who prioritise camera versatility and high-end hardware in a smaller body.",
    "image": "/products/phones/Pixel 9 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB / 1TB",
      "RAM: 16GB",
      "Display: 6.3-inch Super Actua LTPO OLED, 1–120Hz",
      "Processor: Google Tensor G4",
      "Rear cameras: 50MP + 48MP ultrawide + 48MP 5x telephoto",
      "Front camera: 42MP",
      "Charging: wireless charging support",
      "Durability: IP68"
    ],
    "quickSpecs": "6.3-inch Super Actua LTPO 1–120Hz; Tensor G4; 16GB RAM; 50MP + 48MP + 48MP 5x; 42MP front; wireless; IP68.",
    "images": [
      "/products/phones/Pixel 9 pro .jpg"
    ]
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
        "ram": "16GB",
        "price": 2700000
      },
      {
        "label": "256GB · 16GB RAM",
        "storage": "256GB",
        "ram": "16GB",
        "price": 3300000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 3700000
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB",
        "price": 4100000
      }
    ],
    "description": "Google Pixel 9 Pro XL is the largest conventional flagship in the Pixel 9 family and is designed for customers who want the Pro camera system together with a large-screen experience. Tensor G4 and 16GB RAM provide the high-end platform, while the 50MP main, 48MP ultrawide and 48MP 5x telephoto cameras give the phone a comprehensive imaging system. The 42MP front camera supports high-resolution selfies and video calls. Storage extends to 1TB, making the Pro XL suitable for customers with extensive media libraries and demanding usage patterns. Its large Super Actua LTPO display, wireless charging and IP68 protection reinforce the premium identity. In the catalogue, the Pro XL should be positioned as the choice for customers who want maximum Pixel screen size without moving to the foldable category.",
    "image": "/products/phones/Pixel 9 pro XL.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB / 512GB / 1TB",
      "RAM: 16GB",
      "Display: 6.8-inch-class Super Actua LTPO OLED",
      "Processor: Google Tensor G4",
      "Rear cameras: 50MP + 48MP ultrawide + 48MP 5x telephoto",
      "Front camera: 42MP",
      "Charging: wireless charging support",
      "Durability: IP68",
      "Position: largest conventional Pixel 9 Pro model"
    ],
    "quickSpecs": "6.8-inch-class Super Actua LTPO display; Tensor G4; 16GB RAM; 50MP + 48MP + 48MP 5x; 42MP front; large battery; wireless; IP68.",
    "images": [
      "/products/phones/Pixel 9 pro XL.jpg"
    ]
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
    "image": "/products/phones/Pixel 9a.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Pixel 9a.jpg"
    ]
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
    "image": "/products/phones/Pixel 10 .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Pixel 10 .jpg"
    ]
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
    "image": "/products/phones/Pixel 10 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Pixel 10 pro .jpg"
    ]
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
    "image": "/products/phones/Google pixel 10 pro Xl .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Google pixel 10 pro Xl .jpg"
    ]
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
    "image": "/products/phones/Pixel 10 pro fold .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Pixel 10 pro fold .jpg"
    ]
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
    "image": "/products/phones/Pixel 10a .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Pixel 10a .jpg"
    ]
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
        "ram": "12GB",
        "price": 3700000
      }
    ],
    "description": "Google Pixel 11 is the standard model of the Pixel 11 generation in this catalogue. It is positioned as the mainstream current-generation Pixel for customers who want the latest numbered Pixel experience without moving into the Pro, Pro XL or foldable tiers. The 256GB and 512GB configurations give customers meaningful storage choices, with the 512GB version suited to heavier media and application use. Because the authoritative technical dataset currently confirms the model, storage configurations and approved Uganda catalogue prices but does not provide a complete verified technical specification sheet, the individual page must not invent camera, battery, processor, display or connectivity details. Its marketing should therefore focus on its current-generation Pixel positioning, storage choices and premium place within the range until a complete OEM specification set is added.",
    "image": "/products/phones/Pixel 11.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB",
      "Catalogue price: approved Uganda retail prices shown below",
      "Model generation: Pixel 11",
      "Note: only specifications confirmed in the approved source-of-truth dataset are listed here; do not invent additional technical specifications."
    ],
    "quickSpecs": "Pixel 11 family model; 256GB/512GB; official catalogue pricing; current-generation Pixel positioning.",
    "images": [
      "/products/phones/Pixel 11.jpg"
    ]
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
        "ram": "12GB",
        "price": 4500000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 5100000
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB",
        "price": 5700000
      }
    ],
    "description": "Google Pixel 11 Pro is the premium conventional Pro model of the Pixel 11 generation. It is intended for customers who want the higher tier of the current Pixel range and need more storage than the standard model. The 256GB, 512GB and 1TB options make the Pro suitable for customers ranging from moderate to very heavy storage users. The individual product page should clearly distinguish it from Pixel 11 through its Pro positioning, while avoiding unsupported claims about specific cameras, processor performance, battery or display characteristics until those details are verified from Google's official technical documentation. Its catalogue role is straightforward: a premium current-generation Pixel for customers who want the Pro tier and substantial storage.",
    "image": "/products/phones/Pixel 11 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB / 1TB",
      "Model generation: Pixel 11 Pro",
      "Note: only specifications confirmed in the approved source-of-truth dataset are listed here; do not invent additional technical specifications."
    ],
    "quickSpecs": "Pixel 11 Pro; 256GB/512GB/1TB; premium current-generation Pixel positioning.",
    "images": [
      "/products/phones/Pixel 11 pro .jpg"
    ]
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
        "ram": "12GB",
        "price": 5000000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 5600000
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB",
        "price": 6200000
      }
    ],
    "description": "Google Pixel 11 Pro XL is positioned as the largest conventional Pro-tier model in the Pixel 11 generation. It is aimed at customers who want the highest conventional Pixel tier and prefer the larger Pro XL format. The three catalogue storage choices—256GB, 512GB and 1TB—allow the product to serve users with different levels of content storage. The individual page should present the Pro XL as a premium, large-format Pixel while keeping the technical specification section strictly limited to verified information. No unverified camera, battery, display or chipset claims should be added to the product record. This makes the Pro XL a clear premium step above Pixel 11 Pro in the catalogue hierarchy without creating unsupported specifications.",
    "image": "/products/phones/Pixel 11 pro xl .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB / 1TB",
      "Model generation: Pixel 11 Pro XL",
      "Note: only specifications confirmed in the approved source-of-truth dataset are listed here; do not invent additional technical specifications."
    ],
    "quickSpecs": "Pixel 11 Pro XL; 256GB/512GB/1TB; largest conventional Pro-tier positioning.",
    "images": [
      "/products/phones/Pixel 11 pro xl .jpg"
    ]
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
        "ram": "16GB",
        "price": 7000000
      },
      {
        "label": "512GB · 16GB RAM",
        "storage": "512GB",
        "ram": "16GB",
        "price": 7600000
      },
      {
        "label": "1TB · 16GB RAM",
        "storage": "1TB",
        "ram": "16GB",
        "price": 8200000
      }
    ],
    "description": "Google Pixel 11 Pro Fold is the premium foldable member of the Pixel 11 generation and occupies the highest-priced position in the Google catalogue. Its 256GB, 512GB and 1TB configurations are designed for customers who want a foldable Pixel and require different levels of storage. The product page should make the foldable form factor and Pro-tier positioning central to its marketing. Because the current approved technical dataset does not yet contain a complete verified OEM specification sheet for this model, the page must not invent screen sizes, cameras, battery capacity, processor details or other hardware specifications. It should instead present the model as Google's premium foldable Pixel option, with exact catalogue pricing and storage clearly displayed.",
    "image": "/products/phones/Pixel 11 pro fold .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB / 1TB",
      "Model generation: Pixel 11 Pro Fold",
      "Form factor: foldable Pixel",
      "Note: only specifications confirmed in the approved source-of-truth dataset are listed here; do not invent additional technical specifications."
    ],
    "quickSpecs": "Pixel 11 Pro Fold; 256GB/512GB/1TB; premium foldable Pixel positioning.",
    "images": [
      "/products/phones/Pixel 11 pro fold .jpg"
    ]
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
        "ram": "12GB",
        "price": 1850000
      }
    ],
    "description": "TECNO CAMON 50 Ultra 5G is the flagship-oriented member of the CAMON 50 family, combining a curved high-refresh display, dedicated telephoto photography and 5G connectivity. The 6.78-inch 144Hz 1.5K AMOLED display gives the device a premium visual presentation, while the camera system is designed around multiple focal lengths: a 50MP Sony main camera, a 50MP 3x telephoto camera and an 8MP 112-degree ultrawide camera. This makes the Ultra particularly relevant to customers who want flexibility when photographing people, distant subjects, landscapes and everyday scenes. The 32MP front camera provides a high-resolution front-facing option for selfies and video calls. Available storage reaches 512GB, making it suitable for customers who keep substantial media libraries. The addition of 5G places it above the 4G CAMON models in connectivity positioning. In the catalogue, the CAMON 50 Ultra 5G should be presented as TECNO's premium camera-and-connectivity choice in this family.",
    "image": "/products/phones/Tecno camon 50 Ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB / 512GB",
      "RAM: 8GB / 12GB physical configurations",
      "Network: 5G",
      "Display: 6.78-inch curved AMOLED, 144Hz, 1.5K",
      "Rear cameras: 50MP Sony main (f/1.8, 23mm) + 50MP telephoto (f/2.4, 70mm, 3x) + 8MP ultrawide (112°)",
      "Front camera: 32MP",
      "Other confirmed positioning: premium CAMON imaging and 5G model"
    ],
    "quickSpecs": "6.78-inch curved AMOLED 144Hz 1.5K display; 5G; 50MP Sony main camera; 50MP 3x telephoto; 8MP 112° ultrawide; 32MP front camera; 256GB/512GB.",
    "images": [
      "/products/phones/Tecno camon 50 Ultra.jpg"
    ]
  },
  {
    "slug": "tecno-spark-slim",
    "brand": "TECNO",
    "family": "Spark",
    "series": "Spark",
    "name": "Spark Slim",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 900000
      }
    ],
    "description": "TECNO SPARK Slim is a design-led SPARK model that combines a slim-oriented form factor with a curved AMOLED display and a strong everyday hardware package. The 6.78-inch 3D curved AMOLED screen uses a 144Hz refresh rate and 1.5K resolution, giving the phone a visually premium identity. The Helio G200 platform and 8GB physical RAM configuration support its upper-SPARK positioning, while 256GB storage provides room for a substantial app and media library. Its 50MP rear and 13MP front cameras cover the main imaging needs. A 5160mAh battery and 45W charging provide a balance between capacity and charging convenience. NFC, IP64 protection, military-grade shock testing and a mood light add further differentiation. The SPARK Slim should be marketed to customers who care about appearance and display technology but still want practical battery, camera and connectivity features.",
    "image": "/products/phones/Tecno spark slim.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "RAM: 8GB physical configuration",
      "OS: Android 15",
      "Chipset: Helio G200",
      "Network: 2G / 3G / 4G",
      "Display: 6.78-inch 3D curved AMOLED, 144Hz, 1.5K, 1224 × 2720",
      "Rear camera: 50MP",
      "Front camera: 13MP",
      "Battery: 5160mAh",
      "Charging: 45W",
      "Features: NFC, IP64, military-grade shock testing, mood light"
    ],
    "quickSpecs": "6.78-inch 3D curved AMOLED 144Hz 1.5K; Helio G200; 8GB RAM configuration; 50MP rear; 13MP front; 5160mAh; 45W; NFC; IP64.",
    "images": [
      "/products/phones/Tecno spark slim.jpg",
      "/products/phones/Tecno spark slim...jpg"
    ]
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
        "ram": "12GB",
        "price": 1300000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1300000
      }
    ],
    "description": "TECNO CAMON 50 Pro moves the CAMON experience further toward photography and premium presentation. Its curved 6.78-inch AMOLED display combines 144Hz refresh with 1.5K resolution, giving the phone a display experience suited to media, browsing and visual content. The Helio G200 Ultimate platform and 8GB physical RAM position it as a capable upper-mid-range device for everyday productivity and entertainment. The defining upgrade is its camera system: a 50MP main camera is joined by a 50MP 3x telephoto camera and an 8MP ultrawide, giving users three distinct perspectives rather than relying on a single main camera. The 32MP front camera completes the imaging package. With 256GB storage, the CAMON 50 Pro is particularly suited to buyers who keep large photo, video and app libraries. Its combination of curved AMOLED design, high refresh rate, dedicated telephoto hardware and modern connectivity makes it a strong individual-page product for customers prioritising photography and premium feel.",
    "image": "/products/phones/Tecno camon 50 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "RAM: 8GB physical",
      "OS: HiOS 16",
      "Chipset: MediaTek Helio G200 Ultimate",
      "Network: 2G / 3G / 4G",
      "Display: 6.78-inch curved AMOLED, 144Hz, 1.5K",
      "Rear cameras: 50MP main + 50MP 3x telephoto + 8MP ultrawide",
      "Front camera: 32MP",
      "Connectivity/features: Wi-Fi, Bluetooth, FM, GPS, NFC, USB-C, OTG"
    ],
    "quickSpecs": "6.78-inch curved AMOLED 144Hz 1.5K display; Helio G200 Ultimate; 8GB RAM; 50MP main + 50MP 3x telephoto + 8MP ultrawide; 32MP front camera; 4G.",
    "images": [
      "/products/phones/Tecno camon 50 pro .jpg"
    ]
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
        "ram": "8GB",
        "price": 1150000
      },
      {
        "label": "128GB · 8GB RAM",
        "storage": "128GB",
        "ram": "8GB",
        "price": 1050000
      }
    ],
    "description": "TECNO CAMON 50 is a camera-oriented smartphone aimed at buyers who want a premium-looking display and strong imaging hardware without moving into the highest price tier. Its 6.78-inch 144Hz AMOLED display is one of the defining parts of the experience, pairing a high refresh rate with a 1.5K resolution for a sharper, more fluid presentation. The Helio G200 Ultimate platform provides the performance foundation for everyday apps, communication, media and general multitasking, while 8GB physical RAM configurations support the phone's mid-range positioning. Photography is a major focus: the 50MP OIS main camera uses a Sony LYTIA 700C sensor and is paired with an 8MP ultrawide AF camera, while the 32MP front camera targets detailed selfies and video communication. The 6500mAh battery and 45W charging give the CAMON 50 an endurance-and-convenience focus. Its IP68/IP69/IP69K protection, NFC and additional imaging tools further reinforce its position as a feature-heavy camera and lifestyle phone.",
    "image": "/products/phones/Tecno camon 50.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB physical configurations",
      "OS: HiOS 16",
      "Chipset: MediaTek Helio G200 Ultimate",
      "Network: 2G / 3G / 4G",
      "Display: 6.78-inch AMOLED, 144Hz, 1.5K, 1208 × 2644",
      "Rear cameras: 50MP OIS main + 8MP ultrawide AF",
      "Main sensor: Sony LYTIA 700C 50MP",
      "Front camera: 32MP",
      "Battery: 6500mAh",
      "Charging: 45W",
      "Connectivity/features: Wi-Fi, Bluetooth, FM, GPS, NFC, OTG, IP68/IP69/IP69K, Super-Zoom, FlashSnap, AI features"
    ],
    "quickSpecs": "6.78-inch 144Hz curved AMOLED-class display; Helio G200 Ultimate; 8GB RAM configurations; 50MP OIS main camera plus 8MP ultrawide; 32MP front camera; 6500mAh battery; 45W charging; IP68/IP69/IP69K.",
    "images": [
      "/products/phones/Tecno camon 50.jpg"
    ]
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
        "ram": "8GB",
        "price": 850000
      }
    ],
    "description": "TECNO SPARK 50 Pro is positioned as an upper-SPARK model for customers looking for a larger display, higher-refresh experience and a capable everyday camera setup. Its 6.78-inch 120Hz screen is designed around smooth everyday interaction and a large viewing area, while the 50MP rear camera system with AI support provides the core photography experience. The 8MP front camera handles selfies and video communication. Support for 4.5G gives the model a higher mobile-network positioning than basic 4G devices where compatible networks are available. The 256GB catalogue configuration provides generous internal space for apps, photos, videos and other content. It is best presented as a lifestyle-focused SPARK model that combines a large high-refresh display with practical imaging and enhanced mobile connectivity.",
    "image": "/products/phones/Spark 50 pro tecno .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB product configurations; catalogue price approved for 256GB",
      "Display: 6.78-inch HD+, 120Hz, 720 × 1576",
      "Rear camera: 50MP + AI camera system",
      "Front camera: 8MP",
      "Network: 2G / 3G / 4G / 4.5G"
    ],
    "quickSpecs": "6.78-inch HD+ 120Hz display; 50MP + AI rear camera; 8MP front camera; 4G/4.5G; 256GB.",
    "images": [
      "/products/phones/Spark 50 pro tecno .jpg"
    ]
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
        "ram": "6GB",
        "price": 800000
      },
      {
        "label": "128GB · 4GB RAM",
        "storage": "128GB",
        "ram": "4GB",
        "network": "4G",
        "price": 700000
      }
    ],
    "description": "TECNO SPARK 50 5G is built for customers who want the SPARK family's accessible pricing philosophy while adding 5G connectivity. Its MediaTek Dimensity 6400 5G+ platform gives the model a clear connectivity and performance step above standard 4G SPARK devices. The 50MP FlashSnap camera provides the main imaging proposition, while the 6500mAh battery gives the phone a strong endurance-oriented identity. 45W charging complements that large battery by reducing the practical inconvenience of recharging. Offered in 128GB and 256GB, the phone can accommodate different storage needs without changing its core 5G proposition. For the individual product page, the SPARK 50 5G should be marketed as a practical route into 5G: a large-battery smartphone with modern mobile-network capability and a high-resolution main camera, aimed at customers who want longevity and connectivity without moving into flagship pricing.",
    "image": "/products/phones/Tecno spark 50 5G.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "Chipset: MediaTek Dimensity 6400 5G+",
      "Network: 5G",
      "Rear camera: 50MP FlashSnap",
      "Battery: 6500mAh",
      "Charging: 45W"
    ],
    "quickSpecs": "Dimensity 6400 5G+; 5G; 50MP FlashSnap camera; 6500mAh battery; 45W charging; 128GB/256GB.",
    "images": [
      "/products/phones/Tecno spark 50 5G.jpg"
    ]
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
    "image": "/products/phones/Tecno spark 50.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "images": [
      "/products/phones/Tecno spark 50.jpg"
    ]
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
        "network": "4G",
        "price": 400000
      },
      {
        "label": "64GB · 4GB RAM",
        "storage": "64GB",
        "ram": "4GB",
        "network": "4G",
        "price": 400000
      }
    ],
    "description": "TECNO POP 20 is an entry-level smartphone designed around the essentials that matter most to everyday users: a large 120Hz screen, dependable battery capacity, practical cameras, modern Android software and useful connectivity features. Its 6.75-inch display gives the phone a spacious viewing area for social media, messaging, video and general browsing, while the 120Hz refresh rate is aimed at making everyday movement through supported interfaces feel more fluid. The UNISOC T7250 platform and 4GB physical RAM place the POP 20 in the everyday-use segment rather than the performance-focused category. Its 5000mAh battery is suited to users who value endurance, and USB-C makes charging and accessory compatibility straightforward. The 13MP rear camera and 8MP front camera cover routine photography, video calls and social content. With Android 15, side fingerprint security, 4G connectivity, FM, OTG, IR and FreeLink 2.0, the POP 20 is positioned as a practical, feature-rich affordable smartphone.",
    "image": "/products/phones/Tecno pop 20.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB / 128GB",
      "RAM: 4GB physical, up to 4GB extended RAM",
      "OS: Android 15",
      "Chipset: UNISOC T7250",
      "Network: 2G / 3G / 4G",
      "Display: 6.75-inch, 120Hz, 720 × 1600",
      "Rear camera: 13MP dual-flash camera system",
      "Front camera: 8MP",
      "Battery: 5000mAh",
      "Charging: 15W, USB-C",
      "Biometrics: Side-mounted fingerprint sensor",
      "Connectivity/features: Wi-Fi, Bluetooth, GPS, FM, OTG, IR, software gyroscope, FreeLink 2.0, IP64, TECNO AI",
      "Colours: Ink Black, Titanium Grey, Aurora Purple, Galaxy Blue"
    ],
    "quickSpecs": "6.75-inch 120Hz display; UNISOC T7250; 4GB RAM with up to 4GB extended RAM; 13MP rear camera; 8MP front camera; 5000mAh battery; 15W USB-C charging; 4G.",
    "images": [
      "/products/phones/Tecno pop 20.jpg",
      "/products/phones/Tecno pop 20...jpg"
    ]
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
        "ram": "12GB",
        "price": 3100000
      }
    ],
    "description": "Infinix NOTE 60 Ultra is positioned at the top of the NOTE family and should be presented as a flagship-tier Infinix product. Its 512GB storage and confirmed 12GB/512GB configuration give it a substantial memory and storage profile for customers who keep extensive applications and media on their phone. The Ultra designation separates it from the mainstream NOTE models and places it in a premium buying category. Its individual page should therefore focus on the premium nature of the product, large storage capacity and top-of-family positioning, while avoiding unsupported technical claims. It is the Infinix choice for customers who want the highest level of NOTE-series positioning in the catalogue.",
    "image": "/products/phones/Infinix note 60 ultra.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 512GB",
      "RAM configuration confirmed for product: 12GB / 512GB",
      "Market position: NOTE Ultra flagship-tier model",
      "Brand: Infinix"
    ],
    "quickSpecs": "Premium NOTE Ultra model; 512GB; high-end Infinix positioning.",
    "images": [
      "/products/phones/Infinix note 60 ultra.jpg"
    ]
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
        "ram": "12GB",
        "price": 1450000
      },
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 1450000
      }
    ],
    "description": "Infinix NOTE 60 Pro is a premium NOTE-series model aimed at customers who want to move beyond the standard NOTE 60. Its 256GB configuration provides substantial space for apps, media and files, while the Pro designation places it higher within the family. The model is best suited to buyers who want a more premium everyday smartphone for communication, entertainment, productivity and content storage. On the individual product page, it should be presented as a step-up NOTE model rather than a budget device, with the emphasis on its Pro positioning and generous storage. It provides a clear middle ground between mainstream HOT models and the much more expensive Ultra tier.",
    "image": "/products/phones/Infinix note 60 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "Market position: NOTE-series Pro smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "NOTE-series Pro smartphone; 256GB; premium everyday Infinix positioning.",
    "images": [
      "/products/phones/Infinix note 60 pro .jpg"
    ]
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
        "ram": "8GB",
        "price": 1150000
      }
    ],
    "description": "Infinix NOTE Edge 5G combines NOTE-series positioning with 5G connectivity in a product aimed at customers who want a premium step above the HOT family. Its 256GB configuration provides useful room for applications, photographs, video and files, while 5G gives the phone a clear connectivity advantage where compatible networks are available. The individual product page should position NOTE Edge 5G as a modern lifestyle and connectivity upgrade: a phone for customers who want more than an entry-level daily device but do not necessarily need the highest-priced NOTE Ultra. Storage, 5G and NOTE-series positioning are the core selling themes.",
    "image": "/products/phones/Infinix note edge .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "Network positioning: 5G",
      "Market position: NOTE-series 5G smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "5G NOTE-series smartphone; 256GB; positioned around premium everyday use and next-generation connectivity.",
    "images": [
      "/products/phones/Infinix note edge .jpg"
    ]
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
        "ram": "12GB",
        "price": 950000
      }
    ],
    "description": "Infinix HOT 70 Pro 5G is the HOT 70 choice for customers who specifically want 5G connectivity. The 256GB configuration provides substantial internal storage for applications, photos, video and other content, while the 5G positioning makes it relevant to buyers with access to compatible next-generation mobile networks. Its market identity is therefore built around combining the HOT family's accessible positioning with a more advanced connectivity tier. The individual product page should make 5G the central differentiator and position the phone as an upgrade for customers who want faster-generation mobile-network capability without moving into the highest Infinix price categories.",
    "image": "/products/phones/Infinix hot 70 pro 5g+.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "Network positioning: 5G",
      "Market position: higher HOT-series 5G model",
      "Brand: Infinix"
    ],
    "quickSpecs": "5G HOT-series smartphone; 256GB; positioned around next-generation mobile connectivity and all-round use.",
    "images": [
      "/products/phones/Infinix hot 70 pro 5g+.jpg"
    ]
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
        "ram": "8GB",
        "price": 850000
      }
    ],
    "description": "Infinix HOT 70 is an all-round HOT-series smartphone aimed at customers who want a capable daily device with a choice of storage capacities. The 128GB version offers a lower entry point, while 256GB gives customers more space for media, applications and files. Its market role is broader than a basic entry-level phone: it is intended for everyday communication, social media, browsing, entertainment and general smartphone use. The individual page should present HOT 70 as a balanced choice for customers who want to step into a more substantial Infinix model without moving all the way to the NOTE range.",
    "image": "/products/phones/Infinix hot 70.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "Market position: HOT-series all-round smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "HOT-series smartphone; 128GB/256GB; positioned for everyday performance, entertainment and storage.",
    "images": [
      "/products/phones/Infinix hot 70.jpg"
    ]
  },
  {
    "slug": "infinix-hot-60-pro-plus",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "HOT",
    "name": "Hot 60 Pro+",
    "network": "See model / regional variant",
    "variants": [
      {
        "label": "256GB · 8GB RAM",
        "storage": "256GB",
        "ram": "8GB",
        "price": 800000
      }
    ],
    "description": "Infinix HOT 60 Pro+ represents the premium end of the HOT 60 family in this catalogue. With 256GB storage, it is aimed at customers who want more room for apps and media and who are prepared to move above the standard HOT models. Its market position makes it suitable for buyers seeking a stronger everyday smartphone experience while remaining below the NOTE family's more premium positioning. The individual product page should frame it as a lifestyle and daily-use upgrade: a model for customers who value storage, presentation and an upper-tier HOT experience. The 256GB configuration is especially relevant for customers who take many photos, save video and install a larger selection of applications.",
    "image": "/products/phones/Infinix hot 60 pro plus .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 256GB",
      "Market position: premium HOT-series smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "Premium HOT-series model; 256GB; positioned as a higher-end everyday Infinix smartphone.",
    "images": [
      "/products/phones/Infinix hot 60 pro plus .jpg"
    ]
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
        "network": "4G",
        "price": 500000
      }
    ],
    "description": "Infinix HOT 60i is an accessible HOT-series model for customers looking for an affordable smartphone with enough internal storage for everyday apps, photographs and media. Its 128GB and 256GB options make storage one of the straightforward purchasing decisions. The model is best positioned for communication, social media, browsing, streaming and general daily use rather than as a specialist flagship device. For an individual product page, the HOT 60i should communicate practical value, accessible pricing and useful everyday storage. It is an appropriate choice for buyers moving up from a basic handset or replacing an older smartphone while keeping the purchase within a more approachable budget.",
    "image": "/products/phones/Infinix hot 60i.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 128GB / 256GB",
      "Market position: accessible HOT-series smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "Affordable HOT-series smartphone; 128GB/256GB; positioned for everyday communication, social media, browsing and entertainment.",
    "images": [
      "/products/phones/Infinix hot 60i.jpg"
    ]
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
        "network": "4G",
        "price": 530000
      }
    ],
    "description": "Infinix SMART 20 is positioned as an accessible everyday smartphone for customers whose priorities are affordability, communication, social media, browsing and routine entertainment. It belongs at the practical end of the Infinix catalogue, making it suitable for first-time smartphone buyers, secondary-phone users and customers who want a straightforward device without paying for flagship-oriented hardware. The 64GB and 128GB options provide a simple choice between entry pricing and additional internal storage. On an individual product page, SMART 20 should be presented around everyday value and ease of use rather than exaggerated performance claims. Its role in the range is to provide a lower-cost Infinix option while retaining the brand's focus on modern smartphone usability.",
    "image": "/products/phones/Infinix smart 20.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Mobile_Phone_Catalogue_Master_2026.md",
    "specifications": [
      "Storage: 64GB / 128GB",
      "Market position: entry-level everyday smartphone",
      "Brand: Infinix"
    ],
    "quickSpecs": "Entry-level Infinix smartphone; 64GB/128GB; designed for everyday communication, social media, browsing and media use.",
    "images": [
      "/products/phones/Infinix smart 20.jpg"
    ]
  },
  {
    "slug": "tecno-spark-40",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "Spark 40",
    "name": "Spark 40",
    "network": "",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 530000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 600000
      }
    ],
    "description": "TECNO SPARK 40 is built for customers who want a large-screen everyday smartphone with a strong balance of battery, charging speed and practical features at an accessible price. Its 6.67-inch 120Hz display is designed for everyday scrolling, video and social-media use, while the 50MP rear camera and 8MP front camera cover the core photography and communication needs of the segment. A 5200mAh battery gives the phone an endurance-oriented character, and 45W charging is an important convenience feature for users who do not want long charging sessions. Android 15 provides the software foundation, while dual speakers make the SPARK 40 suitable for casual media consumption. IP64 protection, infrared capability, FreeLink and AI features add practical breadth. The 128GB and 256GB options allow customers to choose between a lower entry price and more internal storage for apps, photographs and media.",
    "quickSpecs": "6.67-inch 120Hz display; Helio G81 (G91 NFC version); 50MP rear camera; 8MP front camera; 5200mAh; 45W charging; dual speakers; 4G.",
    "specifications": [
      "Storage: 128GB / 256GB",
      "OS: Android 15",
      "Chipset: Helio G81; G91 on NFC version",
      "Network: 2G / 3G / 4G",
      "Display: 6.67-inch, 120Hz, 720 × 1600",
      "Rear camera: 50MP with dual flash",
      "Front camera: 8MP with dual flash",
      "Battery: 5200mAh",
      "Charging: 45W",
      "Features: IP64, dual speakers, FreeLink, IR, AI features"
    ],
    "image": "/products/phones/Tecno spark 40.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md",
    "images": [
      "/products/phones/Tecno spark 40.jpg"
    ]
  },
  {
    "slug": "tecno-spark-40c",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "Spark 40C",
    "name": "Spark 40C",
    "network": "",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 450000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 500000
      }
    ],
    "description": "TECNO SPARK 40C is the practical, value-focused member of the SPARK 40 family. It is designed for customers who want a modern large-screen Android phone without paying for the higher camera and charging specifications of the more advanced SPARK models. The 6.67-inch 120Hz display gives it a contemporary everyday viewing experience, while the Helio G81 platform is positioned for routine communication, social apps, browsing and media. Its 13MP rear camera and 8MP front camera cover everyday photography, selfies and calls. Android 15 keeps the software platform current within its product generation, and useful features such as side fingerprint security, IR, FM, OTG and software gyroscope give the phone more versatility than its entry price might suggest. With both 128GB and 256GB configurations, the SPARK 40C can serve buyers looking for a straightforward daily smartphone or customers who need more internal storage without stepping into a higher price bracket.",
    "quickSpecs": "6.67-inch 120Hz display; Helio G81; 13MP rear camera; 8MP front camera; Android 15; 4G; side fingerprint; IR; 128GB/256GB.",
    "specifications": [
      "Storage: 128GB / 256GB",
      "OS: Android 15",
      "Chipset: Helio G81",
      "Network: 2G / 3G / 4G",
      "Display: 6.67-inch, 120Hz, 720 × 1600, hole-punch design",
      "Rear camera: 13MP",
      "Front camera: 8MP with dual flash",
      "Connectivity/features: GPS, Wi-Fi, Bluetooth, FM, OTG, software gyroscope, side fingerprint, IR"
    ],
    "image": "/products/phones/Tecno spark 40c .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md",
    "images": [
      "/products/phones/Tecno spark 40c .jpg"
    ]
  },
  {
    "slug": "tecno-spark-40-pro",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "Spark 40",
    "name": "Spark 40 Pro",
    "network": "",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 700000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 770000
      }
    ],
    "description": "TECNO SPARK 40 Pro is aimed at customers who want to step beyond basic smartphone specifications and into a more display- and entertainment-focused experience. Its 6.78-inch 1.5K AMOLED display with a 144Hz refresh rate is the centrepiece, giving the phone a premium visual character for video, social content, browsing and games that support higher refresh rates. The Helio G100 Ultimate platform supports the phone's upper-SPARK positioning, while 5200mAh capacity and 45W charging provide a practical combination for active daily use. The 50MP rear camera and 13MP front camera cover the main imaging needs, and dual speakers with Dolby Atmos strengthen its media-oriented identity. IP64 protection and FreeLink add practical features. Available in 128GB and 256GB, the SPARK 40 Pro is well positioned for customers who want a large AMOLED display and a richer entertainment experience without moving to TECNO's premium CAMON range.",
    "quickSpecs": "6.78-inch 144Hz 1.5K AMOLED display; Helio G100 Ultimate; 50MP rear; 13MP front; 5200mAh; 45W; IP64; Dolby Atmos; dual speakers.",
    "specifications": [
      "Storage: 128GB / 256GB",
      "OS: Android 15",
      "Chipset: Helio G100 Ultimate",
      "Network: 2G / 3G / 4G",
      "Display: 6.78-inch AMOLED, 144Hz, 1.5K",
      "Rear camera: 50MP",
      "Front camera: 13MP",
      "Battery: 5200mAh",
      "Charging: 45W",
      "Features: IP64, FreeLink, dual speakers, Dolby Atmos, AI features"
    ],
    "image": "/products/phones/Tecno spark 40 pro.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md",
    "images": [
      "/products/phones/Tecno spark 40 pro.jpg"
    ]
  },
  {
    "slug": "tecno-spark-40-pro-plus",
    "brand": "TECNO",
    "family": "TECNO",
    "series": "Spark 40",
    "name": "Spark 40 Pro+",
    "network": "",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 760000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 850000
      }
    ],
    "description": "TECNO SPARK 40 Pro+ is designed for buyers who want the SPARK range's most premium combination of display, charging and wireless convenience. Its 6.78-inch 3D AMOLED panel uses a 144Hz refresh rate and 1.5K resolution, giving the phone a strong visual and design-led identity. The Helio G200 platform and 8GB physical RAM configurations support the phone's performance positioning for everyday multitasking, entertainment and demanding mobile use. A 5200mAh battery is paired with 45W wired charging, but the major differentiator is the addition of 30W wireless charging and 5W reverse wireless charging. That gives the SPARK 40 Pro+ a more premium charging experience than typical phones in its broader price class. The 50MP rear and 13MP front cameras provide the core imaging package, while Dolby Atmos and dual speakers support media consumption. It is the SPARK choice for customers prioritising display design and charging versatility.",
    "quickSpecs": "6.78-inch 3D AMOLED 144Hz 1.5K display; Helio G200; 8GB RAM configurations; 50MP rear; 13MP front; 5200mAh; 45W wired + 30W wireless + 5W reverse wireless.",
    "specifications": [
      "Storage: 128GB / 256GB",
      "RAM: 8GB physical configurations",
      "OS: Android 15",
      "Chipset: Helio G200",
      "Network: 2G / 3G / 4G",
      "Display: 6.78-inch 3D AMOLED, 144Hz, 1.5K, 1224 × 2720",
      "Rear camera: 50MP",
      "Front camera: 13MP",
      "Battery: 5200mAh",
      "Charging: 45W wired, 30W wireless, 5W reverse wireless",
      "Features: dual speakers, Dolby Atmos, IP64, FreeLink"
    ],
    "image": "/products/phones/Tecno spark 40 pro plus.jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md",
    "images": [
      "/products/phones/Tecno spark 40 pro plus.jpg"
    ]
  },
  {
    "slug": "infinix-hot-60-pro",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "Hot",
    "name": "Hot 60 Pro",
    "network": "",
    "variants": [
      {
        "label": "128GB",
        "storage": "128GB",
        "price": 600000
      },
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 700000
      }
    ],
    "description": "Infinix HOT 60 Pro sits above the more accessible HOT 60i and is aimed at buyers who want a more substantial all-round smartphone within the HOT family. The two storage options let customers choose between a lower entry price and additional room for apps, photographs, videos and files. Its market role is the balanced HOT model: suitable for everyday communication, social platforms, entertainment and general smartphone productivity. Rather than presenting it as a flagship, the individual page should focus on the combination of accessible pricing and a step-up product position within the series. It is a strong fit for users who want a modern daily phone without moving into the higher-priced NOTE range.",
    "quickSpecs": "Upper HOT-series model; 128GB/256GB; designed for customers wanting a stronger all-round everyday smartphone experience.",
    "specifications": [
      "Storage: 128GB / 256GB",
      "Market position: upper HOT-series smartphone",
      "Brand: Infinix"
    ],
    "image": "/products/phones/Infinix hot 60 pro .jpg",
    "photoNote": "Supplied Amaal product image",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md",
    "images": [
      "/products/phones/Infinix hot 60 pro .jpg"
    ]
  },
  {
    "slug": "infinix-hot-70-pro",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "Hot",
    "name": "Hot 70 Pro",
    "network": "",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 800000
      }
    ],
    "description": "Infinix HOT 70 Pro is the higher-positioned member of the HOT 70 line in this catalogue. Its 256GB configuration gives it a storage advantage for customers with larger application and media libraries. The phone is suited to everyday users who want an upgrade from entry-level hardware while keeping the purchase within the HOT-series price structure. Its individual-page description should emphasise balanced daily use, storage and the Pro positioning rather than make unsupported claims about specific components. It is a natural choice for customers who use their phone heavily for social platforms, communication, browsing and entertainment and want more internal space.",
    "quickSpecs": "Higher HOT 70 model; 256GB; designed for customers seeking an upgraded everyday Infinix experience.",
    "specifications": [
      "Storage: 256GB",
      "Market position: higher HOT 70 model",
      "Brand: Infinix"
    ],
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md"
  },
  {
    "slug": "infinix-note-60",
    "brand": "Infinix",
    "family": "Infinix",
    "series": "Note",
    "name": "Note 60",
    "network": "",
    "variants": [
      {
        "label": "256GB",
        "storage": "256GB",
        "price": 1250000
      }
    ],
    "description": "Infinix NOTE 60 marks the move into the more premium NOTE family. With 256GB storage, it is aimed at customers who expect more room for applications, photographs, video and documents and who want a step above the HOT range. The NOTE name gives the model a more productivity- and lifestyle-oriented position in the catalogue. Its individual page should focus on this role: a more substantial Infinix smartphone for customers who want a premium step-up experience while remaining below the Ultra tier. It is particularly appropriate for users who rely heavily on their phone for communication, social media, media consumption and storing a larger amount of personal content.",
    "quickSpecs": "NOTE-series smartphone; 256GB; positioned for customers wanting a more premium Infinix experience.",
    "specifications": [
      "Storage: 256GB",
      "Market position: NOTE-series smartphone",
      "Brand: Infinix"
    ],
    "image": "",
    "photoNote": "Product photo to be supplied by Amaal",
    "source": "Amaal_Master_Product_Source_of_Truth_Complete.md"
  }
];
