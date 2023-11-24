import { FieldTypes } from "src/fields/fields.model";

export type Fields = {
  title: string;
  type: FieldTypes;
  id?: number;
};

export interface CreateDTO {
  userId: number;
  title: string;
  description?: string;
  img?: string;
  theme: string;
  fields: Fields[];
}
