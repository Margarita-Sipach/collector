import {
    Button,
    DatePicker, Form, Input, InputNumber, Select, Switch, Upload,
} from 'antd';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export enum FormItemTypes {
	'input' = 'input',
	'inputNumber' = 'inputNumber',
	'switch' = 'switch',
	'textarea' = 'textarea',
	'select' = 'select',
	'date' = 'date',
	'img' = 'img'
}

interface BaseType{
	name: string | [string | number, string]
	label?: string
	isRequired?: boolean
	type?: FormItemTypes;
	args?: {
		formItem?: any
		item?: any
		itemChildren?: any
	}
	className?: string
}

interface SelectType extends BaseType{
	type?: FormItemTypes.select;
	args?: {
		item?: {
			mode?: 'multiple' | 'tags',
			defaultValue?: string
		},
		itemChildren?: string[]
		formItem?: undefined
	}
}

interface InputType extends BaseType{
	type?: FormItemTypes.input | FormItemTypes.textarea;
	args?: {
		item?: {
			placeholder: string
		}
		formItem?: undefined
		itemChildren?: undefined
	}
}

interface SwitchType extends BaseType{
	type?: FormItemTypes.switch;
	args?: {
		itemChildren?: undefined
		item?: undefined
		formItem?: undefined
	}
}

interface Other extends BaseType {
	type?: FormItemTypes.date | FormItemTypes.img | FormItemTypes.inputNumber
}

type FormItemProps = SelectType | InputType | SwitchType | Other

export const FormItem: FC<FormItemProps> = (props) => {
    const { t } = useTranslation();
    const {
        name,
        type = FormItemTypes.input,
        label = typeof name === 'string'
            ? name[0].toUpperCase() + name.slice(1)
            : '',
        isRequired = true,
        args = {
            formItem: {
                ...type === FormItemTypes.switch ? { valuePropName: 'checked' } : {},
            },
            item: {},
            itemChildren: {},
        },
        className,
    } = props;

    const Children = useMemo(() => {
        switch (type) {
        case FormItemTypes.textarea: return <Input.TextArea />;
        case FormItemTypes.inputNumber: return <InputNumber />;
        case FormItemTypes.switch: return <Switch />;
        case FormItemTypes.date: return <DatePicker />;
        case FormItemTypes.img: return (
            <Upload beforeUpload={() => false} listType="picture">
                <Button>{t('upload')}</Button>
            </Upload>
        );
        case FormItemTypes.select: return (
            <Select {...args?.item}>
                {args?.itemChildren?.map((item: string) => (
                    <Select.Option
                        value={item}
                        key={item}
                    >
                        {item}
                    </Select.Option>
                ))}
            </Select>

        );
        default: return <Input {...args.item} />;
        }
    }, [args, type]);

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{
                required: isRequired,
                message: 'Please input title!',
            }]}
            className={className}
            {...args?.formItem}
        >
            {Children}
        </Form.Item>
    );
};
