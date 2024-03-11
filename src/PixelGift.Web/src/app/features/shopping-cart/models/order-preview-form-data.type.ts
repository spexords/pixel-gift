export interface OrderPreviewCategoryData {
  promoCode: string;
  [key: string]: unknown;
}

export type OrderPreviewFormData = Record<string, OrderPreviewCategoryData>;
