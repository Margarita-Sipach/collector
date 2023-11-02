import { MenuProps } from 'antd';
import { useMemo } from 'react';
import { AdminRoutePath } from 'shared/config/routeConfig/adminConfig';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { NotAuthRoutePath } from 'shared/config/routeConfig/notAuthConfig';

export const useItems = (isAuth: boolean, isAdmin: boolean) => {
    const adminItems = useMemo(() => {
        if (isAdmin) {
            return [{
                label: 'Admin Page',
                key: AdminRoutePath.admin,
            }];
        }
        return [];
    }, [isAdmin]);

    const authItems = useMemo(() => {
        if (isAuth) {
            return [
                {
                    label: 'Exit',
                    key: CommonRoutePath.main,
                },
            ];
        }
        return [
            {
                label: 'Login Page',
                key: NotAuthRoutePath.login,
            },
            {
                label: 'Registration Page',
                key: NotAuthRoutePath.registration,
            },
        ];
    }, [isAuth]);

    const items: MenuProps['items'] = useMemo(() => [
        {
            label: 'Main Page',
            key: CommonRoutePath.main,
        },
        ...adminItems,
        ...authItems,
    ], [adminItems, authItems]);

    return items;
};
