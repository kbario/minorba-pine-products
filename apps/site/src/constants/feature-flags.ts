export const FEATURES = {
  ProductsPage: "products-page",
  ContactPage: "contact-page",
};
export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

const featureValue = {
  [FEATURES.ProductsPage]: true,
  [FEATURES.ContactPage]: true,
};

export const isFeatureEnabled = (feature: Feature) => featureValue[feature];
