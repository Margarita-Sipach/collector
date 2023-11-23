import { Role, User, userState } from 'entities/User';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillDelete } from 'react-icons/ai';

export const useColumns = () => {
    const { t } = useTranslation(['user', 'button']);

    const changeHandler = async (args: Partial<User>) => {
        await userState.updateUser(args);
    };

    const deleteHandler = (id: number) => {
        userState.deleteUser(id);
    };

    const columns: ColumnsType<any> = [
        {
            title: t('user:username'),
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t('user:email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('user:role'),
            key: 'role',
            dataIndex: 'role',
            render: (_, { id, role }) => (
                <div>
                    <Tag>{t(`user:${role === Role.ADMIN ? 'admin' : 'user'}`)}</Tag>
                    <Button
                        onClick={() => changeHandler({
                            id,
                            role: role === Role.USER ? Role.ADMIN : Role.USER,
                        })}
                    >
                        {t('button:change')}
                    </Button>
                </div>
            ),
        },
        {
            title: t('user:status'),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_, { id, isActive }) => (
                <div>
                    <Tag>{t(`user:${isActive ? 'active' : 'blocked'}`)}</Tag>
                    <Button
                        onClick={() => changeHandler({
                            id,
                            isActive: !isActive,
                        })}
                    >
                        {t('button:change')}
                    </Button>
                </div>
            ),
        },

        {
            title: t('button:delete'),
            key: 'delete',
            dataIndex: 'delete',
            render: (_, { id }) => (
                <Button
                    onClick={() => deleteHandler(id)}
                    type="link"
                    size="large"
                >
                    <AiFillDelete />
                </Button>
            ),
        },
    ];

    useEffect(() => {
        userState.getUsers();
    }, []);

    return { columns, users: userState.pageUsers };
};
