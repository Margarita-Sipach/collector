import { itemState } from 'entities/Item';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
    Avatar, Descriptions, Form, List,
} from 'antd';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { userState } from 'entities/User';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { FormButton } from 'shared/ui/FormButton/FormButton';
import { io } from 'socket.io-client';
import cls from './ItemPage.module.scss';
import { ItemHeader } from './ItemHeader/ItemHeader';

const ItemPage = observer(() => {
    const { id } = useParams();

    const { userId, isAuth } = userState;
    const { element } = itemState;

    useEffect(() => {
        const numberId = Number(id);
        itemState.getById(numberId);
    }, [id]);

    const socket = io(__API__);

    const onFinish = async (values: any) => {
        const comment = { ...values, userId, itemId: Number(id) };
        await itemState.comment(comment, () => socket.emit('comment', comment));
    };

    socket.on('comment', (message) => {
        console.log(message);
        if (message.itemId === Number(id)) {
            itemState.getById(Number(id));
        }
    });

    return element && (
        <div className={cls.col}>
            <ItemHeader
                item={element}
            />
            <div className={cls.body}>
                <Descriptions title="Item Info">
                    {
                        element.field.map(({ FieldItem, title, id }: any) => (
                            <Descriptions.Item key={id} label={title}>
                                {FieldItem.value}
                            </Descriptions.Item>
                        ))
                    }
                </Descriptions>
                <List
                    header="Comments"
                    itemLayout="horizontal"
                    style={{ width: '100%' }}
                >
                    {isAuth && (
                        <Form
                            onFinish={onFinish}
                        >
                            <FormItem
                                name="comment"
                                label=""
                                type={FormItemTypes.textarea}
                            />
                            <FormButton />
                        </Form>
                    )}
                    {[...element?.comments]?.reverse()?.map(({ Comment, username, id }: any, i: number) => (
                        <List.Item key={id}>
                            <List.Item.Meta
                                key={Comment.id}
                                style={{ width: '100%' }}
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`} />}
                                title={(
                                    <Link to={`${CommonRoutePath.user}/${id}`}>
                                        {username}
                                    </Link>
                                )}
                                description={Comment.comment}
                            />
                        </List.Item>
                    ))}
                </List>
            </div>

        </div>
		 );
});

export default ItemPage;
