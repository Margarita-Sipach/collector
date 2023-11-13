import { Form, Input, Select } from 'antd';
import { FC, useMemo } from 'react';

export enum FormItemTypes {
	'input' = 'input',
	'textarea' = 'textarea',
	'select' = 'select',
}

export interface FormItemProps {
  name: string | [string | number, string]
  label?: string
  isRequired?: boolean
  type?: FormItemTypes
  options?: string[]
  placeholder?: string
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
        placeholder = '',
    } = props;

    const Children = useMemo(() => {
        switch (type) {
        case 'textarea': return <Input.TextArea />;
        case 'select': return (
            <Select>
                {options && options.map((item) => (
                    <Select.Option
                        value={item}
                        key={item}
                    >
                        {item}
                    </Select.Option>
                ))}
            </Select>
        );
        default: return <Input placeholder={placeholder} />;
        }
    }, []);

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{
                required: isRequired,
                message: 'Please input title!',
            }]}
        >
            {Children}
        </Form.Item>
    );
};
