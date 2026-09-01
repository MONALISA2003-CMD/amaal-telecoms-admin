export type TVProduct = { brand:string; model:string; sizes:string[]; technology:string; generation:string; verificationStatus:'VERIFIED'|'PARTIALLY_VERIFIED'|'UNVERIFIED'|'RETIRED'; market:'UGANDA'|'EAST_AFRICA'|'AFRICA'|'GLOBAL'; slug:string; };
export const tvMasterBrands = ['TCL','Hisense','CHiQ','Samsung','LG','Global Star','Black Ark'] as const;
export const tvCatalogue: TVProduct[] = [
  {
    "brand": "TCL",
    "model": "C655",
    "sizes": [
      "43",
      "50",
      "55",
      "65",
      "75",
      "85"
    ],
    "technology": "QLED / QLED PRO / 4K",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-c655"
  },
  {
    "brand": "TCL",
    "model": "C6K",
    "sizes": [
      "50",
      "55",
      "65",
      "75",
      "85",
      "98"
    ],
    "technology": "QD-Mini LED / QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-c6k"
  },
  {
    "brand": "TCL",
    "model": "C855",
    "sizes": [
      "65",
      "75",
      "85"
    ],
    "technology": "QD-Mini LED / QLED PRO",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-c855"
  },
  {
    "brand": "TCL",
    "model": "C755",
    "sizes": [
      "50",
      "55",
      "65",
      "75",
      "85",
      "98"
    ],
    "technology": "QD-Mini LED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-c755"
  },
  {
    "brand": "TCL",
    "model": "P6K",
    "sizes": [
      "50",
      "55",
      "65",
      "75"
    ],
    "technology": "4K LED / HDR",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-p6k"
  },
  {
    "brand": "TCL",
    "model": "V6C",
    "sizes": [
      "43",
      "50",
      "55",
      "65",
      "75"
    ],
    "technology": "4K LED / HDR",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-v6c"
  },
  {
    "brand": "TCL",
    "model": "S5K",
    "sizes": [
      "50"
    ],
    "technology": "QLED / FHD",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-s5k"
  },
  {
    "brand": "TCL",
    "model": "S5400",
    "sizes": [
      "43"
    ],
    "technology": "FHD LED / Smart TV",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-s5400"
  },
  {
    "brand": "TCL",
    "model": "C645",
    "sizes": [],
    "technology": "",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-c645"
  },
  {
    "brand": "TCL",
    "model": "P635",
    "sizes": [],
    "technology": "",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-p635"
  },
  {
    "brand": "TCL",
    "model": "P745",
    "sizes": [],
    "technology": "",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "tcl-p745"
  },
  {
    "brand": "Hisense",
    "model": "32A4QS",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-32a4qs"
  },
  {
    "brand": "Hisense",
    "model": "40A4QS",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-40a4qs"
  },
  {
    "brand": "Hisense",
    "model": "43A4QS",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-43a4qs"
  },
  {
    "brand": "Hisense",
    "model": "43A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-43a6n"
  },
  {
    "brand": "Hisense",
    "model": "43A6Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-43a6q"
  },
  {
    "brand": "Hisense",
    "model": "50A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-50a6n"
  },
  {
    "brand": "Hisense",
    "model": "50A6Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-50a6q"
  },
  {
    "brand": "Hisense",
    "model": "55A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-55a6n"
  },
  {
    "brand": "Hisense",
    "model": "55A6Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-55a6q"
  },
  {
    "brand": "Hisense",
    "model": "65A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-65a6n"
  },
  {
    "brand": "Hisense",
    "model": "65A6Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-65a6q"
  },
  {
    "brand": "Hisense",
    "model": "75A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-75a6n"
  },
  {
    "brand": "Hisense",
    "model": "75A6Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-75a6q"
  },
  {
    "brand": "Hisense",
    "model": "85A6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-85a6n"
  },
  {
    "brand": "Hisense",
    "model": "40A5200F",
    "sizes": [],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-40a5200f"
  },
  {
    "brand": "Hisense",
    "model": "32A5200F",
    "sizes": [],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-32a5200f"
  },
  {
    "brand": "Hisense",
    "model": "32Q4Q",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-32q4q"
  },
  {
    "brand": "Hisense",
    "model": "43Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-43q6n"
  },
  {
    "brand": "Hisense",
    "model": "50Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-50q6n"
  },
  {
    "brand": "Hisense",
    "model": "55Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-55q6n"
  },
  {
    "brand": "Hisense",
    "model": "65Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-65q6n"
  },
  {
    "brand": "Hisense",
    "model": "75Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-75q6n"
  },
  {
    "brand": "Hisense",
    "model": "85Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-85q6n"
  },
  {
    "brand": "Hisense",
    "model": "85Q7Q",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-85q7q"
  },
  {
    "brand": "Hisense",
    "model": "55U6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-55u6n"
  },
  {
    "brand": "Hisense",
    "model": "55U7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-55u7n"
  },
  {
    "brand": "Hisense",
    "model": "65U7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-65u7n"
  },
  {
    "brand": "Hisense",
    "model": "75U7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-75u7n"
  },
  {
    "brand": "Hisense",
    "model": "85U7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-85u7n"
  },
  {
    "brand": "Hisense",
    "model": "65A85LEVS",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "hisense-65a85levs"
  },
  {
    "brand": "CHiQ",
    "model": "G5000",
    "sizes": [
      "32"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-g5000"
  },
  {
    "brand": "CHiQ",
    "model": "L32G7V",
    "sizes": [
      "32"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-l32g7v"
  },
  {
    "brand": "CHiQ",
    "model": "G7P",
    "sizes": [
      "32",
      "43",
      "75"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-g7p"
  },
  {
    "brand": "CHiQ",
    "model": "32G4500",
    "sizes": [
      "32"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-32g4500"
  },
  {
    "brand": "CHiQ",
    "model": "U43G7H",
    "sizes": [
      "43"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-u43g7h"
  },
  {
    "brand": "CHiQ",
    "model": "43G7P",
    "sizes": [
      "43"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-43g7p"
  },
  {
    "brand": "CHiQ",
    "model": "U50G7H",
    "sizes": [
      "50"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-u50g7h"
  },
  {
    "brand": "CHiQ",
    "model": "U55G7H",
    "sizes": [
      "55"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-u55g7h"
  },
  {
    "brand": "CHiQ",
    "model": "U65G7H",
    "sizes": [
      "65"
    ],
    "technology": "",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-u65g7h"
  },
  {
    "brand": "CHiQ",
    "model": "55Q6N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-55q6n"
  },
  {
    "brand": "CHiQ",
    "model": "55Q7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-55q7n"
  },
  {
    "brand": "CHiQ",
    "model": "65Q7N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-65q7n"
  },
  {
    "brand": "CHiQ",
    "model": "85Q8N",
    "sizes": [],
    "technology": "",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "chiq-85q8n"
  },
  {
    "brand": "Samsung",
    "model": "U7000H",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u7000h"
  },
  {
    "brand": "Samsung",
    "model": "U7020H",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u7020h"
  },
  {
    "brand": "Samsung",
    "model": "U8000H",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u8000h"
  },
  {
    "brand": "Samsung",
    "model": "U8020H",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u8020h"
  },
  {
    "brand": "Samsung",
    "model": "Q5F",
    "sizes": [],
    "technology": "QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q5f"
  },
  {
    "brand": "Samsung",
    "model": "QN70H",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn70h"
  },
  {
    "brand": "Samsung",
    "model": "QN73H",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn73h"
  },
  {
    "brand": "Samsung",
    "model": "QN80H",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn80h"
  },
  {
    "brand": "Samsung",
    "model": "QN1EH",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn1eh"
  },
  {
    "brand": "Samsung",
    "model": "QN60H",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn60h"
  },
  {
    "brand": "Samsung",
    "model": "S83H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s83h"
  },
  {
    "brand": "Samsung",
    "model": "S85H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s85h"
  },
  {
    "brand": "Samsung",
    "model": "S90H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s90h"
  },
  {
    "brand": "Samsung",
    "model": "S93H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s93h"
  },
  {
    "brand": "Samsung",
    "model": "S95H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s95h"
  },
  {
    "brand": "Samsung",
    "model": "S99H",
    "sizes": [],
    "technology": "OLED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s99h"
  },
  {
    "brand": "Samsung",
    "model": "R85H",
    "sizes": [],
    "technology": "Micro RGB",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-r85h"
  },
  {
    "brand": "Samsung",
    "model": "R95H",
    "sizes": [],
    "technology": "Micro RGB",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-r95h"
  },
  {
    "brand": "Samsung",
    "model": "U7000F",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u7000f"
  },
  {
    "brand": "Samsung",
    "model": "U8000F",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-u8000f"
  },
  {
    "brand": "Samsung",
    "model": "Q6F",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q6f"
  },
  {
    "brand": "Samsung",
    "model": "Q7F",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q7f"
  },
  {
    "brand": "Samsung",
    "model": "Q8F",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q8f"
  },
  {
    "brand": "Samsung",
    "model": "QN70F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn70f"
  },
  {
    "brand": "Samsung",
    "model": "QN80F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn80f"
  },
  {
    "brand": "Samsung",
    "model": "QN85F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn85f"
  },
  {
    "brand": "Samsung",
    "model": "QN90F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn90f"
  },
  {
    "brand": "Samsung",
    "model": "QN900F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn900f"
  },
  {
    "brand": "Samsung",
    "model": "QN950F",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn950f"
  },
  {
    "brand": "Samsung",
    "model": "S85F",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s85f"
  },
  {
    "brand": "Samsung",
    "model": "S90F",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s90f"
  },
  {
    "brand": "Samsung",
    "model": "S95F",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s95f"
  },
  {
    "brand": "Samsung",
    "model": "The Frame LS03F",
    "sizes": [],
    "technology": "Lifestyle",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-the-frame-ls03f"
  },
  {
    "brand": "Samsung",
    "model": "DU7000",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-du7000"
  },
  {
    "brand": "Samsung",
    "model": "DU8000",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-du8000"
  },
  {
    "brand": "Samsung",
    "model": "Q60D",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q60d"
  },
  {
    "brand": "Samsung",
    "model": "Q70D",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q70d"
  },
  {
    "brand": "Samsung",
    "model": "Q80D",
    "sizes": [],
    "technology": "QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q80d"
  },
  {
    "brand": "Samsung",
    "model": "QN85D",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn85d"
  },
  {
    "brand": "Samsung",
    "model": "QN90D",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn90d"
  },
  {
    "brand": "Samsung",
    "model": "QN95D",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn95d"
  },
  {
    "brand": "Samsung",
    "model": "QN800D",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn800d"
  },
  {
    "brand": "Samsung",
    "model": "QN900D",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn900d"
  },
  {
    "brand": "Samsung",
    "model": "S85D",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s85d"
  },
  {
    "brand": "Samsung",
    "model": "S90D",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s90d"
  },
  {
    "brand": "Samsung",
    "model": "S95D",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-s95d"
  },
  {
    "brand": "Samsung",
    "model": "The Frame LS03D",
    "sizes": [],
    "technology": "Lifestyle",
    "generation": "PREVIOUS",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-the-frame-ls03d"
  },
  {
    "brand": "Samsung",
    "model": "CU8000",
    "sizes": [],
    "technology": "Crystal UHD",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-cu8000"
  },
  {
    "brand": "Samsung",
    "model": "Q60C",
    "sizes": [],
    "technology": "QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q60c"
  },
  {
    "brand": "Samsung",
    "model": "Q70C",
    "sizes": [],
    "technology": "QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-q70c"
  },
  {
    "brand": "Samsung",
    "model": "QN90C",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn90c"
  },
  {
    "brand": "Samsung",
    "model": "QN95C",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn95c"
  },
  {
    "brand": "Samsung",
    "model": "QN800C",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn800c"
  },
  {
    "brand": "Samsung",
    "model": "QN900C",
    "sizes": [],
    "technology": "Neo QLED",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-qn900c"
  },
  {
    "brand": "Samsung",
    "model": "The Frame LS03C",
    "sizes": [],
    "technology": "Lifestyle",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "samsung-the-frame-ls03c"
  },
  {
    "brand": "LG",
    "model": "QNED93",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned93"
  },
  {
    "brand": "LG",
    "model": "QNED87",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned87"
  },
  {
    "brand": "LG",
    "model": "QNED86",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned86"
  },
  {
    "brand": "LG",
    "model": "QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned85"
  },
  {
    "brand": "LG",
    "model": "QNED83",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned83"
  },
  {
    "brand": "LG",
    "model": "QNED81",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned81"
  },
  {
    "brand": "LG",
    "model": "QNED80",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned80"
  },
  {
    "brand": "LG",
    "model": "QNED8E",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned8e"
  },
  {
    "brand": "LG",
    "model": "QNED72",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned72"
  },
  {
    "brand": "LG",
    "model": "QNED71",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned71"
  },
  {
    "brand": "LG",
    "model": "QNED70",
    "sizes": [],
    "technology": "QNED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned70"
  },
  {
    "brand": "LG",
    "model": "QNED EVO MINI LED",
    "sizes": [],
    "technology": "QNED EVO MINI LED",
    "generation": "CURRENT",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-qned-evo-mini-led"
  },
  {
    "brand": "LG",
    "model": "OLED55B5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55b5"
  },
  {
    "brand": "LG",
    "model": "OLED55C5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55c5"
  },
  {
    "brand": "LG",
    "model": "OLED55G5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55g5"
  },
  {
    "brand": "LG",
    "model": "OLED65B5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled65b5"
  },
  {
    "brand": "LG",
    "model": "OLED65C5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled65c5"
  },
  {
    "brand": "LG",
    "model": "OLED65G5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled65g5"
  },
  {
    "brand": "LG",
    "model": "OLED77C5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled77c5"
  },
  {
    "brand": "LG",
    "model": "OLED77G5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled77g5"
  },
  {
    "brand": "LG",
    "model": "OLED83C5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled83c5"
  },
  {
    "brand": "LG",
    "model": "OLED83G5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled83g5"
  },
  {
    "brand": "LG",
    "model": "OLED97M5",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled97m5"
  },
  {
    "brand": "LG",
    "model": "43UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-43ut8000"
  },
  {
    "brand": "LG",
    "model": "50UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-50ut8000"
  },
  {
    "brand": "LG",
    "model": "55UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55ut8000"
  },
  {
    "brand": "LG",
    "model": "65UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65ut8000"
  },
  {
    "brand": "LG",
    "model": "75UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75ut8000"
  },
  {
    "brand": "LG",
    "model": "86UT8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86ut8000"
  },
  {
    "brand": "LG",
    "model": "43QNED75",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-43qned75"
  },
  {
    "brand": "LG",
    "model": "50QNED75",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-50qned75"
  },
  {
    "brand": "LG",
    "model": "50QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-50qned85"
  },
  {
    "brand": "LG",
    "model": "55QNED70A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned70a6a"
  },
  {
    "brand": "LG",
    "model": "55QNED80A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned80a6a"
  },
  {
    "brand": "LG",
    "model": "55QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned85"
  },
  {
    "brand": "LG",
    "model": "55QNED92",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned92"
  },
  {
    "brand": "LG",
    "model": "65QNED70A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65qned70a6a"
  },
  {
    "brand": "LG",
    "model": "65QNED80A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65qned80a6a"
  },
  {
    "brand": "LG",
    "model": "65QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65qned85"
  },
  {
    "brand": "LG",
    "model": "65QNED92",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65qned92"
  },
  {
    "brand": "LG",
    "model": "75QNED70A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75qned70a6a"
  },
  {
    "brand": "LG",
    "model": "75QNED80A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75qned80a6a"
  },
  {
    "brand": "LG",
    "model": "75QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75qned85"
  },
  {
    "brand": "LG",
    "model": "75QNED92",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75qned92"
  },
  {
    "brand": "LG",
    "model": "86QNED70A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86qned70a6a"
  },
  {
    "brand": "LG",
    "model": "86QNED80A6A",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86qned80a6a"
  },
  {
    "brand": "LG",
    "model": "86QNED85",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86qned85"
  },
  {
    "brand": "LG",
    "model": "43UR7300",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-43ur7300"
  },
  {
    "brand": "LG",
    "model": "43UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-43ur8000"
  },
  {
    "brand": "LG",
    "model": "50UR7500",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-50ur7500"
  },
  {
    "brand": "LG",
    "model": "55UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55ur8000"
  },
  {
    "brand": "LG",
    "model": "65UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65ur8000"
  },
  {
    "brand": "LG",
    "model": "75UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75ur8000"
  },
  {
    "brand": "LG",
    "model": "86UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86ur8000"
  },
  {
    "brand": "LG",
    "model": "43NANO75",
    "sizes": [],
    "technology": "NanoCell",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-43nano75"
  },
  {
    "brand": "LG",
    "model": "50NANO77",
    "sizes": [],
    "technology": "NanoCell",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-50nano77"
  },
  {
    "brand": "LG",
    "model": "55QNED75",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned75"
  },
  {
    "brand": "LG",
    "model": "55QNED80",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-55qned80"
  },
  {
    "brand": "LG",
    "model": "65QNED80",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-65qned80"
  },
  {
    "brand": "LG",
    "model": "75QNED80",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-75qned80"
  },
  {
    "brand": "LG",
    "model": "86QNED80",
    "sizes": [],
    "technology": "QNED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-86qned80"
  },
  {
    "brand": "LG",
    "model": "OLED55B4",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55b4"
  },
  {
    "brand": "LG",
    "model": "OLED55C4",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55c4"
  },
  {
    "brand": "LG",
    "model": "OLED65B4",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled65b4"
  },
  {
    "brand": "LG",
    "model": "OLED65C4",
    "sizes": [],
    "technology": "OLED",
    "generation": "PREVIOUS",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled65c4"
  },
  {
    "brand": "LG",
    "model": "OLED55B3",
    "sizes": [],
    "technology": "OLED",
    "generation": "LEGACY",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55b3"
  },
  {
    "brand": "LG",
    "model": "OLED55C3",
    "sizes": [],
    "technology": "OLED",
    "generation": "LEGACY",
    "verificationStatus": "VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-oled55c3"
  },
  {
    "brand": "LG",
    "model": "UR7300",
    "sizes": [],
    "technology": "UHD",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-ur7300"
  },
  {
    "brand": "LG",
    "model": "UR8000",
    "sizes": [],
    "technology": "UHD",
    "generation": "LEGACY",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "lg-ur8000"
  },
  {
    "brand": "Global Star",
    "model": "GS-2219A",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-gs-2219a"
  },
  {
    "brand": "Global Star",
    "model": "GS-24D5",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-gs-24d5"
  },
  {
    "brand": "Global Star",
    "model": "GS-26D5 T2",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-gs-26d5-t2"
  },
  {
    "brand": "Global Star",
    "model": "GS-2624D",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-gs-2624d"
  },
  {
    "brand": "Global Star",
    "model": "32UK50",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-32uk50"
  },
  {
    "brand": "Global Star",
    "model": "32UK64",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-32uk64"
  },
  {
    "brand": "Global Star",
    "model": "42UK64",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-42uk64"
  },
  {
    "brand": "Global Star",
    "model": "43LK50",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-43lk50"
  },
  {
    "brand": "Global Star",
    "model": "75QD75",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-75qd75"
  },
  {
    "brand": "Global Star",
    "model": "85QD85",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-85qd85"
  },
  {
    "brand": "Global Star",
    "model": "22 inch Digital LED",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-22-inch-digital-led"
  },
  {
    "brand": "Global Star",
    "model": "24 inch AC/DC Digital LED",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-24-inch-ac-dc-digital-led"
  },
  {
    "brand": "Global Star",
    "model": "32 inch Frameless Digital TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-32-inch-frameless-digital-tv"
  },
  {
    "brand": "Global Star",
    "model": "32 inch VIDAA Smart",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-32-inch-vidaa-smart"
  },
  {
    "brand": "Global Star",
    "model": "40 inch Frameless Digital",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-40-inch-frameless-digital"
  },
  {
    "brand": "Global Star",
    "model": "40 inch Frameless Android Smart",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-40-inch-frameless-android-smart"
  },
  {
    "brand": "Global Star",
    "model": "43 inch QLED Satellite TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-43-inch-qled-satellite-tv"
  },
  {
    "brand": "Global Star",
    "model": "50 inch 4K UHD Android TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-50-inch-4k-uhd-android-tv"
  },
  {
    "brand": "Global Star",
    "model": "55 inch Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-55-inch-smart-tv"
  },
  {
    "brand": "Global Star",
    "model": "55 inch 4K UHD Android Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-55-inch-4k-uhd-android-smart-tv"
  },
  {
    "brand": "Global Star",
    "model": "65 inch 4K UHD Android Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "global-star-65-inch-4k-uhd-android-smart-tv"
  },
  {
    "brand": "Black Ark",
    "model": "22 inch Analog Frameless TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-22-inch-analog-frameless-tv"
  },
  {
    "brand": "Black Ark",
    "model": "24 inch Digital LED TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-24-inch-digital-led-tv"
  },
  {
    "brand": "Black Ark",
    "model": "32 inch Digital LED HD TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-32-inch-digital-led-hd-tv"
  },
  {
    "brand": "Black Ark",
    "model": "32 inch Android Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-32-inch-android-smart-tv"
  },
  {
    "brand": "Black Ark",
    "model": "40 inch Digital Frameless TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-40-inch-digital-frameless-tv"
  },
  {
    "brand": "Black Ark",
    "model": "43 inch FHD Smart LED TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-43-inch-fhd-smart-led-tv"
  },
  {
    "brand": "Black Ark",
    "model": "50 inch UHD 4K Smart Android TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-50-inch-uhd-4k-smart-android-tv"
  },
  {
    "brand": "Black Ark",
    "model": "55 inch 4K Android Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-55-inch-4k-android-smart-tv"
  },
  {
    "brand": "Black Ark",
    "model": "65 inch 4K Android Smart TV",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "UNVERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-65-inch-4k-android-smart-tv"
  },
  {
    "brand": "Black Ark",
    "model": "P40S10",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-p40s10"
  },
  {
    "brand": "Black Ark",
    "model": "T43D10",
    "sizes": [],
    "technology": "",
    "generation": "UNKNOWN",
    "verificationStatus": "PARTIALLY_VERIFIED",
    "market": "GLOBAL",
    "slug": "black-ark-t43d10"
  }
];
export const tvBrands = [...tvMasterBrands];
export function tvSlug(brand:string, model:string){return `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}
export function tvDescription(p:TVProduct){ const size=p.sizes.length ? p.sizes.map(s=>`${s}\"`).join(' · ') : 'multiple screen-size options'; const tech=p.technology || 'smart television'; return `${p.brand} ${p.model} with ${tech.toLowerCase()}, available in ${size}.`; }
export function tvMedia(p:TVProduct){ const known:Record<string,string>={'samsung-u8000h':'/products/samsung-u8000f-tv.webp'}; return known[p.slug]||''; }
