export interface CreateDTO {
  collectionId: number;
  title: string;
  img?: string;
  tagsIds: number[];
  fields: {
    [key: number]: string;
  };
}
