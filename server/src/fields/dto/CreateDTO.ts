import { FieldTypes } from "../fields.model";

export interface CreateDTO {
  title: string;
  type: FieldTypes;
}
