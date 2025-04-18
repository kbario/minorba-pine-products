const Pages = {
  Products: "products-page",
  Contact: "contact-page",
  DecisionTree: "decision-tree-page",
} as const;
const Features = {
  Ordering: "ordering-feature",
  Pricelist: "pricelist-feature",
} as const;

export const FLAGS = {
  Pages,
  Features,
} as const;
export type Feature =
  | (typeof Pages)[keyof typeof Pages]
  | (typeof Features)[keyof typeof Features];

const featureValue = {
  [FLAGS.Pages.Products]: !import.meta.env.PROD,
  [FLAGS.Pages.Contact]: !import.meta.env.PROD,
  [FLAGS.Pages.DecisionTree]: !import.meta.env.PROD,
  [FLAGS.Features.Ordering]: false,
  [FLAGS.Features.Pricelist]: false,
};

export const isFeatureEnabled = (feature: Feature | undefined) =>
  !!feature ? featureValue[feature] : true;
