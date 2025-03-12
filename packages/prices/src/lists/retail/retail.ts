import { FinalConfig } from "../../types/config";
import { PostPerPackByDiameters } from "../../types/post-details";
import { retail } from "../../data/prices";
import { calcWeight, makeCode, round } from "../../utils/utils";
import { rawWholesale } from "../wholesale/wholesale";
export default retail.map((size) => {
  const wholesaleData = rawWholesale.find((x) => x.code === size.code);
  const postPerPack = PostPerPackByDiameters[size.postLengthBin][size.diameter];
  if (!wholesaleData) {
    console.log("size without wholesale counter:", size.code);
    return { ...size, postPerPack };
  }
  return {
    ...size,
    postPerPack,
    postPrice: round(((size.packPrice * 1.04) / postPerPack) * 1.1),
    packPrice: round(wholesaleData.packPrice),
    weight: calcWeight(size.diameter, size.length, postPerPack),
    code: makeCode(size),
  };
}) satisfies FinalConfig[];
