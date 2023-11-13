import { FC } from 'react';
import { FieldTypes } from 'entities/Collection';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';

const FieldInputTypes = {
    [FieldTypes.BOOLEAN]: FormItemTypes.switch,
    [FieldTypes.CHAR]: FormItemTypes.input,
    [FieldTypes.DATE]: FormItemTypes.date,
    [FieldTypes.INTEGER]: FormItemTypes.inputNumber,
    [FieldTypes.TEXT]: FormItemTypes.textarea,
};

interface FieldInputProps {
  className?: string
  type: FieldTypes
  title: string
  id: number
}

export const FieldInput: FC<FieldInputProps> = (props) => {
    const { className, type, title, id } = props;

    return (
        <FormItem type={FieldInputTypes[type]}  name={`${id}-field`} label={title} isRequired={false} />
    );
};
