import rebate from './gen/rebate';
import retail from './gen/retail';
import wholesale from './gen/wholesale';
import { FinalConfig, PostConfig, PostPricelistData, PricelistData } from './types/config';
import {
  PostVariantDescriptions,
  PostVariantLables,
  PostVariants,
  SawnVariant,
  SawnVariantDescriptions,
  SawnVariantLable,
  SawnVariantLables,
  SawnVariants,
  type PostVariant,
  type PostVariantLable,
} from './types/post-details';

const date = 'Sept 2024';

export {
  date,
  PostVariantDescriptions,
  PostVariantLables,
  PostVariants,
  rebate,
  retail,
  SawnVariantDescriptions,
  SawnVariantLables,
  SawnVariants,
  wholesale,
  type PostConfig as Config,
  type FinalConfig,
  type PostVariant,
  type PostVariantLable,
  type PricelistData,
  type SawnVariant,
  type SawnVariantLable,
};
