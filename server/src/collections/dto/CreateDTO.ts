import { FieldTypes } from "src/fields/fields.model";

type Fields = {
  [key in FieldTypes]: string[];
};

export interface CreateDTO {
  userId: number;
  title: string;
  description?: string;
  img?: string;
  theme: string;
  fields: Fields;
}
