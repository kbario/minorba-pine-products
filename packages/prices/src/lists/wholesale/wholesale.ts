import { FinalConfig } from "../../types/config";
import { PostPerPackByDiameters } from "../../types/post-details";
import { wholesale } from "../../data/prices";
import { makeCode, round } from "../../utils/utils";

export const rawWholesale = wholesale.map((size) => {
  const newPackPrice = size.packPrice * 1.04;
  const postPerPack = PostPerPackByDiameters[size.postLengthBin][size.diameter];
  return {
    ...size,
    postPerPack,
    postPrice: (newPackPrice / postPerPack) * 1.1,
    packPrice: newPackPrice,
    code: makeCode(size),
  };
}) satisfies FinalConfig[];

export default rawWholesale.map((size) => ({
  ...size,
  postPrice: round(size.postPrice),
  packPrice: round(size.packPrice),
}));
// pack price is important
// 70% is wholesale
