import { AdminPage } from 'pages/AdminPage';
import { RouteProps } from 'react-router-dom';

export enum AdminRoutes {
    ADMIN = 'admin'
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
    [AdminRoutes.ADMIN]: `/${AdminRoutes.ADMIN}`,
};

export const adminRouteConfig: Record<AdminRoutes, RouteProps> = {
    [AdminRoutes.ADMIN]: {
        path: AdminRoutePath.admin,
        element: <AdminPage />,
    },
};
