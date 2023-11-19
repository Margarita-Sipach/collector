import {
    DatePicker, Form, Input, InputNumber, Select, Switch,
} from 'antd';
import { FC, useMemo } from 'react';

export enum FormItemTypes {
	'input' = 'input',
	'inputNumber' = 'inputNumber',
	'switch' = 'switch',
	'textarea' = 'textarea',
	'select' = 'select',
	'date' = 'date',
}

export interface FormItemProps {
  name: string | [string | number, string]
  label?: string
  isRequired?: boolean
  type?: FormItemTypes
  options?: string[]
  placeholder?: string
  mode?: 'multiple' | 'tags'
  className?: string
  defaultValue?: string
}

export const FormItem: FC<FormItemProps> = (props) => {
    const {
        name,
        type = FormItemTypes.input,
        label = typeof name === 'string'
            ? name[0].toUpperCase() + name.slice(1)
            : '',
        isRequired = true,
        options,
        mode,
        placeholder = '',
        className,
        defaultValue,
    } = props;

    const Children = useMemo(() => {
        switch (type) {
        case 'textarea': return <Input.TextArea />;
        case 'inputNumber': return <InputNumber />;
        case 'switch': return <Switch />;
        case 'date': return <DatePicker />;
        case 'select': return (
            options
            && (
                <Select mode={mode} defaultValue={defaultValue}>
                    {options.map((item) => (
                        <Select.Option
                            value={item}
                            key={item}
                        >
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            )

        );
        default: return <Input placeholder={placeholder} />;
        }
    }, [defaultValue, mode, options, placeholder, type]);

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{
                required: isRequired,
                message: 'Please input title!',
            }]}
            className={className}
        >
            {Children}
        </Form.Item>
    );
};
