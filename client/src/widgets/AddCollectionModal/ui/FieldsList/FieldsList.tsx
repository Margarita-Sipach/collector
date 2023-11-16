import { FC } from 'react';
import { Button, Form, Space } from 'antd';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { FieldTypes } from 'entities/Collection';
import { AiFillDelete } from 'react-icons/ai';
import cls from './FieldList.module.scss';

interface FieldsListProps {
  className?: string
}

export const FieldsList: FC<FieldsListProps> = (props) => {
    const { } = props;

    return (
        <Form.List name="fields">

            {(fields, { add, remove }) => (
                <>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        className={cls.addButton}
                    >
                        Add field
                    </Button>
                    <div className={cls.fields}>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className={cls.field}>
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
                                <Button onClick={() => remove(name)} type="link">
                                    <AiFillDelete />
                                </Button>

                            </div>

                        ))}

                    </div>
                </>
            )}

        </Form.List>
    );
};
