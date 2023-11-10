import { MenuProps } from 'antd';
import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { AdminRoutePath } from 'shared/config/routeConfig/adminConfig';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { NotAuthRoutePath } from 'shared/config/routeConfig/notAuthConfig';

const getAdminItems = (isAdmin: boolean, t: TFunction) => {
    if (isAdmin) {
        return [{
            label: t('admin'),
            key: AdminRoutePath.admin,
        }];
    }
    return [];
};

const getAuthItems = (isAuth: boolean, t: TFunction) => {
    if (isAuth) {
        return [
            {
                label: t('exit'),
                key: 'exit',
            },
        ];
    }
    return [
        {
            label: t('login'),
            key: NotAuthRoutePath.login,
        },
        {
            label: t('registration'),
            key: NotAuthRoutePath.registration,
        },
    ];
};

const getCommonItems = (t: TFunction) => [{
    label: t('main'),
    key: CommonRoutePath.main,
}];

export const useItems = (isAuth: boolean, isAdmin: boolean, t: TFunction) => {
    const adminItems = useMemo(() => getAdminItems(isAdmin, t), [isAdmin, t]);
    const authItems = useMemo(() => getAuthItems(isAuth, t), [isAuth, t]);
    const commonItems = useMemo(() => getCommonItems(t), [t]);

    const items: MenuProps['items'] = useMemo(() => [
        ...commonItems,
        ...adminItems,
        ...authItems,
    ], [adminItems, authItems, commonItems]);

    return items;
};
