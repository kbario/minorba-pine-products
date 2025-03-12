export type Diameter =
  | 80
  | 100
  | 120
  | 140
  | 160
  | 180
  | 200
  | "225-250"
  | "250-275"
  | "150-175"
  | "175-200";
export type PostLength =
  | 1.8
  | 2.1
  | 2.4
  | 2.7
  | 3.0
  | 3.6
  | 4.2
  | 4.8
  | 5.4
  | 6.0
  | 7.0
  | 9.6;
export type Grade = 1 | 2;
export type PostLengthBin = "long" | "short" | "extra-long" | "super-long";

export const PostPerPackByDiameters = {
  short: {
    80: 100,
    100: 60,
    120: 42,
    140: 30,
    160: 21,
    180: 16,
    200: 12,
    "225-250": 10,
    "250-275": 8,
    "150-175": 0,
    "175-200": 0,
  },
  long: {
    80: 0,
    100: 26,
    120: 15,
    140: 12,
    160: 9,
    180: 7,
    200: 7,
    "225-250": 0,
    "250-275": 0,
    "150-175": 0,
    "175-200": 0,
  },
  "extra-long": {
    80: 0,
    100: 0,
    120: 0,
    140: 0,
    160: 0,
    180: 0,
    200: 0,
    "225-250": 0,
    "250-275": 0,
    "150-175": 9,
    "175-200": 7,
  },
  "super-long": {
    80: 0,
    100: 0,
    120: 0,
    140: 0,
    160: 0,
    180: 0,
    200: 0,
    "225-250": 0,
    "250-275": 0,
    "150-175": 5,
    "175-200": 4,
  },
} as const satisfies {
  [t in PostLengthBin]: { [k in Diameter]: number };
};

export type PostPerPackByDiameter =
  (typeof PostPerPackByDiameters)[PostLengthBin][Diameter];

export const PostVariants = {
  Regular: "R",
  Pointed: "P",
  SheepYard: "S",
  CattleYard: "C",
  HorsePosts: "H",
  HalfPosts: "HP",
} as const;
export type PostVariant = (typeof PostVariants)[keyof typeof PostVariants];

export const PostVariantLables = {
  [PostVariants.Regular]: "Regular",
  [PostVariants.Pointed]: "Pointed",
  [PostVariants.SheepYard]: "Sheep Yard",
  [PostVariants.CattleYard]: "Cattle Yard",
  [PostVariants.HorsePosts]: "Horse Rails",
  [PostVariants.HalfPosts]: "Half Posts",
} as const satisfies { [k in PostVariant]: string };

export const PostVariantDescriptions = {
  [PostVariants.Regular]: "",
  [PostVariants.Pointed]: "",
  [PostVariants.SheepYard]:
    "All posts have a 100mm wide flat cut on one side to allow a board to be screwed to the post. Suitable for garden fencing and sheep yards.",
  [PostVariants.CattleYard]:
    "All posts have a 150mm wide flat cut on one side to allow a board to be screwed to the post. Suitable for cattle yards. Only made to order.",
  [PostVariants.HorsePosts]: "",
  [PostVariants.HalfPosts]: "",
};

export type PostVariantLable =
  (typeof PostVariantLables)[keyof typeof PostVariantLables];

//Pointed posts will be charged at a price of $80.00 per pack for all size posts from 160 Dia and larger and $100.00 per pack 140 Dia and smaller
export const pointedPriceByDiameter = {
  80: 100,
  100: 100,
  120: 100,
  140: 100,
  160: 80,
  180: 80,
  200: 80,
  "225-250": 80,
  "250-275": 80,
} satisfies { [k in Exclude<Diameter, "150-175" | "175-200">]: number };

export type Dimensions = 50 | 75 | 100 | 200;
export type SawnLength =
  | 0.2
  | 0.3
  | 0.5
  | 0.6
  | 0.8
  | 0.9
  | 1
  | 1.2
  | 1.5
  | 1.8
  | 2.1
  | 2.4
  | 3
  | 3.6;
export const SawnVariants = {
  Sleepers: "L",
  Sawn: "W",
  HouseStumps: "U",
  SolePlates: "O",
} as const;
export type SawnVariant = (typeof SawnVariants)[keyof typeof SawnVariants];

export const SawnVariantLables = {
  [SawnVariants.Sleepers]: "Sleepers",
  [SawnVariants.Sawn]: "Sawn",
  [SawnVariants.HouseStumps]: "House Stumps",
  [SawnVariants.SolePlates]: "Sole Plates",
} as const satisfies { [k in SawnVariant]: string };

export const SawnVariantDescriptions = {
  [SawnVariants.Sleepers]:
    "Prices Quoted are for full packs only, mixed packs or part packs will incur an additional charge of $33.00 per pack",
  [SawnVariants.Sawn]: "",
  [SawnVariants.HouseStumps]: "",
  [SawnVariants.SolePlates]: "",
} as const satisfies { [k in SawnVariant]: string };

export type SawnVariantLable =
  (typeof SawnVariantLables)[keyof typeof SawnVariantLables];
