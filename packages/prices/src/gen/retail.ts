import {
  ConfigUpdated,
  PostPricelistData,
  SawnConfig,
  SawnPricelistData,
} from "../types/config";
import {
  postPricelistDataStarter,
  reducePostPricelistData,
  reduceSawnPricelistData,
  sawnPricelistDataStarter,
} from "../utils/utils";
import { rounds, sawn } from "./base";

export default {
  rounds: rounds
    .map(
      (size: ConfigUpdated): ConfigUpdated => ({
        ...size,
        postPrice: ((size.packPrice * 1.15) / size.postPerPack) * 1.1,
        packPrice: size.packPrice * 1.15,
      }),
    )
    .reduce(
      reducePostPricelistData({ isWholesale: false }),
      postPricelistDataStarter(),
    ) satisfies PostPricelistData,
  sawn: sawn.map(
    (size: SawnConfig): SawnConfig => ({
      ...size,
      postPrice: ((size.packPrice * 1.15) / size.postPerPack) * 1.1,
      packPrice: size.packPrice * 1.15,
    })
  ).reduce(
    reduceSawnPricelistData({ isWholesale: false }),
    sawnPricelistDataStarter(),
  ) satisfies SawnPricelistData,
};
