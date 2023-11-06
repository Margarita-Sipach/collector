import { Role, User, userState } from 'entities/User';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Tag } from 'antd';

export const useColumns = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const updatedUsers = await userState.getUsers();
        setUsers(updatedUsers);
    };
    const changeHandler = async (args: Partial<User>) => {
        await userState.updateUser(args);
        await getUsers();
    };

    const deleteHandler = (id: number) => {
        userState.deleteUser(id);
        getUsers();
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (_, { id, role }) => (
                <div>
                    <Tag>{role}</Tag>
                    <Button
                        onClick={() => changeHandler({
                            id,
                            role: role === Role.USER ? Role.ADMIN : Role.USER,
                        })}
                    >
                        change
                    </Button>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_, { id, isActive }) => (
                <div>
                    <Tag>{isActive ? 'active' : 'blocked'}</Tag>
                    <Button
                        onClick={() => changeHandler({
                            id,
                            isActive: !isActive,
                        })}
                    >
                        change
                    </Button>
                </div>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, { id }) => (
                <Button
                    onClick={() => deleteHandler(id)}
                >
                    delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        getUsers();
    }, []);

    return { columns, users };
};
