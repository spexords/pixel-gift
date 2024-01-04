
export interface PromoCodePayloadRequest {
  id: string;
  code: string;
  discount: number;
  expiry: Date;
}
