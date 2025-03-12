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
        postPrice: size.postPrice / 0.96,
        packPrice: size.packPrice / 0.96,
      }),
    )
    .reduce(
      reducePostPricelistData({ isWholesale: true }),
      postPricelistDataStarter(),
    ) satisfies PostPricelistData,

  sawn: sawn
    .map(
      (size: SawnConfig): SawnConfig => ({
        ...size,
        postPrice: size.postPrice / 0.96,
        packPrice: size.packPrice / 0.96,
      }),
    ).reduce(
      reduceSawnPricelistData({ isWholesale: true }),
      sawnPricelistDataStarter(),
    ) satisfies SawnPricelistData,
};
