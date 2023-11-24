export interface CreateDTO {
  collectionId: number;
  title: string;
  img?: string;
  tags: string[];
  fields: [number, any][];
}
