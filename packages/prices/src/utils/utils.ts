/* eslint-disable indent */
import {
  ConfigUpdated,
  FinalConfig,
  PostConfig,
  PostPricelistData,
  SawnConfig,
  SawnFinalConfig,
  SawnPricelistData,
} from '../types/config';
import {
  pointedPriceByDiameter,
  PostVariant,
  PostVariants,
  SawnVariants,
} from '../types/post-details';

const LABOUR_COST = 120;
const TIME_PER_HALF_POST = 1;
const TIME_PER_SHEEP_YARD_POST = 1;
const TIME_PER_CATTLE_YARD_POST = 1.5;

export const round = (num: number): string => Number(num).toFixed(2);
export const roundPackPrice = (num: number): string =>
  Math.ceil(Number(num)).toString();

const makePackPrice = (
  packPrice: number,
  postPerPack: number,
  isWholesale: boolean
): string =>
  isWholesale
    ? roundPackPrice(packPrice)
    : `(${round(packPrice / postPerPack)}) ${roundPackPrice(packPrice)}`;

export const calcWeight = (
  d: number | string,
  length: number,
  nPosts: number
) => {
  if (typeof d === 'string') {
    d = Number(d.split('-')[0]!);
  }
  const diameter = d / 1000;
  return Math.round(
    ((Math.PI / 4) * (diameter * diameter) * length * nPosts) / 0.0013
  );
};

export const makeCode = (
  size: ConfigUpdated | PostConfig,
  variant: PostVariant,
  isGrade2?: boolean
): string => {
  const len = size.length.toFixed(1).replace('.', '');

  const roundType =
    variant !== PostVariants.HalfPosts
      ? typeof size.diameter === 'string'
        ? 'L'
        : 'R'
      : '';

  const dia = size.diameter.toString().split('-')[0];
  const diam = dia?.length === 2 ? `0${dia}` : dia;

  return `${roundType}${isGrade2 ? '2' : variant}${diam}${len}`;
  // return `${roundType}${isGrade2 ? "2" : variant}${diam}${len}`;
};

export const reducePostPricelistData =
  (props: { isWholesale: boolean }) =>
  (
    acc: PostPricelistData,
    size: ConfigUpdated
  ): Required<PostPricelistData> => {
    if (!acc[PostVariants.Regular][size.length]) {
      acc[PostVariants.Regular][size.length] = [];
    }
    acc[PostVariants.Regular][size.length]?.push(
      makeRegular(size, props.isWholesale)
    );

    if (size.hasGrade2) {
      acc[PostVariants.Regular][size.length]?.push(
        makeGrade2(size, props.isWholesale)
      );
    }
    if (size.hasPointed && !props.isWholesale) {
      if (!acc[PostVariants.Pointed][size.length]) {
        acc[PostVariants.Pointed][size.length] = [];
      }
      acc[PostVariants.Pointed][size.length]?.push(
        makePointedPost(size, props.isWholesale)
      );
    }
    if (size.hasSheepYard) {
      if (!acc[PostVariants.SheepYard][size.length]) {
        acc[PostVariants.SheepYard][size.length] = [];
      }
      acc[PostVariants.SheepYard][size.length]?.push(
        makeSheepYard(size, props.isWholesale)
      );
    }
    if (size.hasCattleYard) {
      if (!acc[PostVariants.CattleYard][size.length]) {
        acc[PostVariants.CattleYard][size.length] = [];
      }
      acc[PostVariants.CattleYard][size.length]?.push(
        makeCattleYard(size, props.isWholesale)
      );
    }
    if (size.hasHorseRails) {
      if (!acc[PostVariants.HorsePosts][size.length]) {
        acc[PostVariants.HorsePosts][size.length] = [];
      }
      acc[PostVariants.HorsePosts][size.length]?.push(
        makeHorseRails(size, props.isWholesale)
      );
    }
    if (size.hasHalfPost) {
      if (!acc[PostVariants.HalfPosts][size.length]) {
        acc[PostVariants.HalfPosts][size.length] = [];
      }
      acc[PostVariants.HalfPosts][size.length]?.push(
        makeHalfPosts(size, props.isWholesale)
      );
    }

    return acc;
  };
export const postPricelistDataStarter = () =>
  ({
    [PostVariants.Regular]: {},
    [PostVariants.Pointed]: {},
    [PostVariants.SheepYard]: {},
    [PostVariants.CattleYard]: {},
    [PostVariants.HorsePosts]: {},
    [PostVariants.HalfPosts]: {},
  }) satisfies PostPricelistData;

export const reduceSawnPricelistData =
  (props: { isWholesale: boolean }) =>
  (acc: SawnPricelistData, size: SawnConfig): Required<SawnPricelistData> => {
    if (size.type === SawnVariants.Sawn && props.isWholesale) return acc;
    if (!acc[size.type][size.length]) {
      acc[size.type][size.length] = [];
    }
    acc[size.type][size.length]?.push(makeSawn(size, props.isWholesale));
    return acc;
  };
export const sawnPricelistDataStarter = () =>
  ({
    [SawnVariants.Sleepers]: {},
    [SawnVariants.Sawn]: {},
    [SawnVariants.HouseStumps]: {},
    [SawnVariants.SolePlates]: {},
  }) satisfies SawnPricelistData;

export const makeSawn = (
  config: SawnConfig,
  isWholesale: boolean
): SawnFinalConfig => {
  return {
    ...config,
    postPrice: round(config.postPrice),
    packPrice: makePackPrice(config.packPrice, config.postPerPack, isWholesale),
    grade: 1,
  };
};
export const makeRegular = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  return {
    ...config,
    postPrice: round(config.postPrice),
    packPrice: makePackPrice(config.packPrice, config.postPerPack, isWholesale),
    code: makeCode(config, PostVariants.Regular),
    grade: 1,
  };
};
export const makeGrade2 = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  return {
    ...config,
    postPrice: round(config.postPrice * 0.9),
    packPrice: makePackPrice(
      config.packPrice * 0.9,
      config.postPerPack,
      isWholesale
    ),
    code: makeCode(config, PostVariants.Regular, true),
    grade: 2,
  };
};
export const makePointedPost = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  if (config.diameter === '150-175' || config.diameter === '175-200')
    throw 'invalid pointed config';
  return {
    ...config,
    postPrice: round(
      config.postPrice +
        pointedPriceByDiameter[config.diameter] / config.postPerPack
    ),
    packPrice: makePackPrice(
      config.packPrice + pointedPriceByDiameter[config.diameter],
      config.postPerPack,
      isWholesale
    ),
    code: makeCode(config, PostVariants.Pointed),
    grade: 1,
  };
};
export const makeHorseRails = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  return {
    ...config,
    postPrice: round(config.postPrice * 1.1),
    packPrice: makePackPrice(
      config.packPrice * 1.1,
      config.postPerPack,
      isWholesale
    ),
    code: makeCode(config, PostVariants.HorsePosts),
    grade: 1,
  };
};

const makeHalfPosts = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  if (
    config.diameter === 80 ||
    config.diameter === 200 ||
    config.diameter === '150-175' ||
    config.diameter === '175-200' ||
    config.diameter === '225-250' ||
    config.diameter === '250-275'
  )
    throw 'invalid half post config';
  const LARGEST_SIZE = 180;
  const postPerPack = config.postPerPack * 2;
  const temp = TIME_PER_HALF_POST * (config.diameter / 100);
  const timePerPost = temp + LARGEST_SIZE / 100 / temp / 2;
  const timePerPack = timePerPost * config.postPerPack;
  const extraPricePerPack = ((timePerPack + 30) / 60) * LABOUR_COST;
  const newPackPrice = config.packPrice + extraPricePerPack;
  const newPostPrice = extraPricePerPack / postPerPack + config.postPrice / 2;
  return {
    ...config,
    postPrice: round(isWholesale ? newPackPrice / postPerPack : newPostPrice),
    packPrice: makePackPrice(newPackPrice, postPerPack, isWholesale),
    code: makeCode(config, PostVariants.HalfPosts),
    postPerPack,
    grade: 1,
  };
};

const makeSheepYard = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  if (
    config.diameter === 80 ||
    config.diameter === 100 ||
    config.diameter === 120 ||
    config.diameter === 140 ||
    config.diameter === 200 ||
    config.diameter === '225-250' ||
    config.diameter === '250-275' ||
    config.diameter === '150-175' ||
    config.diameter === '175-200'
  )
    throw 'invalid sheep yard post config';
  const LARGEST_SIZE = 180;
  const temp = TIME_PER_SHEEP_YARD_POST * (config.diameter / 100);
  const timePerPost = temp + LARGEST_SIZE / 100 / temp / 5;
  const timePerPack = timePerPost * config.postPerPack;
  const extraPricePerPack = ((timePerPack + 30) / 60) * LABOUR_COST;
  const newPackPrice = config.packPrice + extraPricePerPack;
  const newPostPrice =
    extraPricePerPack / config.postPerPack + config.postPrice;
  return {
    ...config,
    postPrice: round(
      isWholesale ? newPackPrice / config.postPerPack : newPostPrice
    ),
    packPrice: makePackPrice(newPackPrice, config.postPerPack, isWholesale),
    code: makeCode(config, PostVariants.SheepYard),
    grade: 1,
  };
};

const makeCattleYard = (
  config: ConfigUpdated,
  isWholesale: boolean
): FinalConfig => {
  if (
    config.diameter === 80 ||
    config.diameter === 100 ||
    config.diameter === 120 ||
    config.diameter === 140 ||
    config.diameter === 160 ||
    config.diameter === 180 ||
    config.diameter === '250-275' ||
    config.diameter === '150-175' ||
    config.diameter === '175-200'
  )
    throw 'invalid cattle yard post config';
  const LARGEST_SIZE = 225;
  const diameter =
    typeof config.diameter === 'string'
      ? Number(config.diameter.split('-')[0])
      : config.diameter;
  const temp = TIME_PER_CATTLE_YARD_POST * (diameter / 100);
  const timePerPost = temp + LARGEST_SIZE / 100 / temp / 5;
  const timePerPack = timePerPost * config.postPerPack;
  const extraPricePerPack = ((timePerPack + 30) / 60) * LABOUR_COST;
  const newPackPrice = config.packPrice + extraPricePerPack;
  const newPostPrice =
    extraPricePerPack / config.postPerPack + config.postPrice;
  return {
    ...config,
    postPrice: round(
      isWholesale ? newPackPrice / config.postPerPack : newPostPrice
    ),
    packPrice: makePackPrice(newPackPrice, config.postPerPack, isWholesale),
    code: makeCode(config, PostVariants.CattleYard),
    grade: 1,
  };
};
