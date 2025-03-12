import { FinalConfig } from "../../types/config";
import { PostPerPackByDiameters } from "../../types/post-details";
import { wholesale } from "../../data/prices";
import { calcWeight, makeCode, round } from "../../utils/utils";

export default wholesale.map((size) => {
  const newPostPrice = (size.postPrice * 1.04) / 0.96;
  const postPerPack = PostPerPackByDiameters[size.postLengthBin][size.diameter];
  return {
    ...size,
    postPerPack,
    postPrice: round(newPostPrice),
    packPrice: round(newPostPrice * postPerPack),
    weight: calcWeight(size.diameter, size.length, postPerPack),
    code: makeCode(size),
  };
}) satisfies FinalConfig[];
