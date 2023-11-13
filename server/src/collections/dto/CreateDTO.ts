import { FieldTypes } from "src/fields/fields.model";

type Fields = {
  title: string;
  type: FieldTypes;
};

export interface CreateDTO {
  userId: number;
  title: string;
  description?: string;
  img?: string;
  theme: string;
  fields: Fields[];
}
