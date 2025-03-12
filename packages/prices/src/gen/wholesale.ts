import { PostPricelistData, SawnPricelistData } from "../types/config";
import {
  postPricelistDataStarter,
  reducePostPricelistData,
  reduceSawnPricelistData,
  sawnPricelistDataStarter,
} from "../utils/utils";
import { rounds, sawn } from "./base";

export default {
  rounds: rounds.reduce(
    reducePostPricelistData({ isWholesale: true }),
    postPricelistDataStarter(),
  ) satisfies PostPricelistData,
  sawn: sawn.reduce(
    reduceSawnPricelistData({ isWholesale: true }),
    sawnPricelistDataStarter(),
  ) satisfies SawnPricelistData,
};
