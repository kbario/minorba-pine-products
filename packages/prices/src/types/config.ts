import {
  Diameter,
  Dimensions,
  Grade,
  PostLength,
  PostLengthBin,
  PostPerPackByDiameter,
  PostVariant,
  SawnLength,
  SawnVariant,
} from "./post-details";

export type PostConfig = {
  /** millimeters */
  diameter: Diameter;
  /** meters */
  length: PostLength;
  postLengthBin: PostLengthBin;
  postPrice: number;
  packPrice: number;
  code: string;
  weight: number;

  hasGrade2?: boolean;
  hasPointed?: boolean;
  hasSheepYard?: boolean;
  hasCattleYard?: boolean;
  hasHorseRails?: boolean;
  hasHalfPost?: boolean;
};

export type ConfigUpdated = Omit<PostConfig, "postLengthBin"> & {
  postPerPack: PostPerPackByDiameter;
};

export type FinalConfig = Omit<
  ConfigUpdated,
  | "postLengthBin"
  | "hasGrade2"
  | "hasPointed"
  | "hasSheepYard"
  | "hasCattleYard"
  | "hasHorseRails"
  | "hasHalfPost"
  | "postPrice"
  | "packPrice"
  | "postPerPack"
> & {
  postPerPack: number;
  postPrice: string;
  packPrice: string;
  grade: Grade;
};

export type PostPricelistData = {
  [k in PostVariant]: FinalConfig[];
};

export type SawnConfig = {
  /** millimeters */
  dimensions: Dimensions[];
  /** meters */
  length: SawnLength;
  postPerPack: number;
  postPrice: number;
  packPrice: number;
  code: string;
  weight: number;
  type: SawnVariant;
  hasGrade2?: boolean;
};

export type SawnFinalConfig = Omit<
  SawnConfig,
  | "postLengthBin"
  | "hasGrade2"
  | "hasPointed"
  | "hasSheepYard"
  | "hasCattleYard"
  | "hasHorseRails"
  | "hasHalfPost"
  | "postPrice"
  | "packPrice"
  | "postPerPack"
> & {
  postPerPack: number;
  postPrice: string;
  packPrice: string;
  grade: Grade;
};

export type SawnPricelistData = {
  [k in SawnVariant]: SawnFinalConfig[];
};

export type PricelistData = {
  rounds: PostPricelistData;
  sawn: SawnPricelistData;
};
