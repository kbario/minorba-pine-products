import { postWholesale, sawnWholesale } from "../data/prices";
import { ConfigUpdated } from "../types/config";
import { PostPerPackByDiameters, PostVariants } from "../types/post-details";
import { makeCode } from "../utils/utils";

export const rounds = postWholesale.map((size) => {
  const newPackPrice = size.packPrice * 1.04;
  const postPerPack = PostPerPackByDiameters[size.postLengthBin][size.diameter];
  return {
    ...size,
    postPerPack,
    postPrice: (newPackPrice / postPerPack),
    packPrice: newPackPrice,
    code: makeCode(size, PostVariants.Regular),
  };
}) satisfies ConfigUpdated[];

export const sawn = sawnWholesale.map((size) => {
  const newPackPrice = size.packPrice * 1.04;
  return {
    ...size,
    dimensions: size.dimensions.sort((a, b) => b - a),
    postPrice: (newPackPrice / size.postPerPack),
    packPrice: newPackPrice,
  };
});
