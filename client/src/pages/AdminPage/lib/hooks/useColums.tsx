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

    const generateInfoColumn = (title: string) => ({
        title: t(`user:${title}`),
        dataIndex: title,
        key: title,
    });

    const generateRenderComponent = (tagText: string, changedCell: any) => (
        <div>
            <Tag>{t(`user:${tagText}`)}</Tag>
            <Button
                onClick={() => changeHandler(changedCell)}
            >
                {t('button:change')}
            </Button>
        </div>
    );

    const columns: ColumnsType<any> = [
        generateInfoColumn('username'),
        generateInfoColumn('email'),
        {
            ...generateInfoColumn('role'),
            render: (_, { id, role }) => (
                generateRenderComponent(
                    role === Role.ADMIN ? 'admin' : 'user',
                    { id, role: role === Role.USER ? Role.ADMIN : Role.USER },
                )
            ),
        },
        {
            ...generateInfoColumn('isActive'),
            title: t('user:status'),
            render: (_, { id, isActive }) => (
                generateRenderComponent(
                    isActive ? 'active' : 'blocked',
                    { id, isActive: !isActive },
                )
            ),
        },

        {
            ...generateInfoColumn('delete'),
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
