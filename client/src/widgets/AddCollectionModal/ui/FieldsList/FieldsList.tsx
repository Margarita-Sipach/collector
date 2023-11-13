import { FC } from 'react';
import { Button, Form, Space } from 'antd';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { FieldTypes } from 'entities/Collection';

interface FieldsListProps {
  className?: string
}

export const FieldsList: FC<FieldsListProps> = (props) => {
    const { } = props;

    return (
        <Form.List name="fields">

            {(fields, { add, remove }) => (
                <div>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                    >
                        Add field
                    </Button>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key}>
                            <FormItem
                                {...restField}
                                name={[name, 'title']}
                                placeholder="Title"
                            />
                            <FormItem
                                {...restField}
                                name={[name, 'type']}
                                type={FormItemTypes.select}
                                options={Object.values(FieldTypes)}
                            />
                            <Button onClick={() => remove(name)}>-</Button>

                        </Space>

                    ))}

                </div>
            )}
        </Form.List>
    );
};
