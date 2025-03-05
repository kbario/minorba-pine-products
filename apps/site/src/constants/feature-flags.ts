export const FEATURES = {
  ProductsPage: "products-page",
  ContactPage: "contact-page",
};
export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

const featureValue = {
  [FEATURES.ProductsPage]: !import.meta.env.PROD,
  [FEATURES.ContactPage]: !import.meta.env.PROD,
};

export const isFeatureEnabled = (feature: Feature | undefined) =>
  !!feature ? featureValue[feature] : true;
