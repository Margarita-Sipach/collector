import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { UserPage } from 'pages/UserPage';
import { RouteProps } from 'react-router-dom';

export enum CommonRoutes {
    MAIN = 'main',
    USER = 'user',

	// last
    NOT_FOUND = 'not_found',
}

export const CommonRoutePath: Record<CommonRoutes, string> = {
    [CommonRoutes.MAIN]: '/',
    [CommonRoutes.USER]: '/user',
    [CommonRoutes.NOT_FOUND]: '*',
};

export const commonRouteConfig: Record<CommonRoutes, RouteProps> = {
    [CommonRoutes.MAIN]: {
        path: CommonRoutePath.main,
        element: <MainPage />,
    },
    [CommonRoutes.USER]: {
        path: `${CommonRoutePath.user}/:id`,
        element: <UserPage />,
    },
    [CommonRoutes.NOT_FOUND]: {
        path: CommonRoutePath.not_found,
        element: <NotFoundPage />,
    },
};
