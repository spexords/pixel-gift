export interface ItemPayloadRequest {
  id: string;
  name: string;
  polishName: string;
  base64Image: string;
  quantity: number;
  unitPrice: number;
  categoryId: string;
}