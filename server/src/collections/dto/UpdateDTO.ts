import { FieldTypes } from "src/fields/fields.model";
import { CreateDTO } from "./CreateDTO";

type Fields = {
  title: string;
  type: FieldTypes;
  id: number;
};

export interface UpdateDTO extends CreateDTO {
  id: number;
  fields: Fields[];
}
