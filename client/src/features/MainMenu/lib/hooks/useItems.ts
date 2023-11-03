import { MenuProps } from 'antd';
import { useMemo } from 'react';
import { AdminRoutePath } from 'shared/config/routeConfig/adminConfig';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { NotAuthRoutePath } from 'shared/config/routeConfig/notAuthConfig';

const getAdminItems = (isAdmin: boolean) => {
    if (isAdmin) {
        return [{
            label: 'Admin Page',
            key: AdminRoutePath.admin,
        }];
    }
    return [];
};

const getAuthItems = (isAuth: boolean) => {
    if (isAuth) {
        return [
            {
                label: 'Exit',
                key: 'exit',
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
};

const commonItems = [{
    label: 'Main Page',
    key: CommonRoutePath.main,
}];

export const useItems = (isAuth: boolean, isAdmin: boolean) => {
    const adminItems = useMemo(() => getAdminItems(isAdmin), [isAdmin]);
    const authItems = useMemo(() => getAuthItems(isAuth), [isAuth]);

    const items: MenuProps['items'] = useMemo(() => [
        ...commonItems,
        ...adminItems,
        ...authItems,
    ], [adminItems, authItems]);

    return items;
};
