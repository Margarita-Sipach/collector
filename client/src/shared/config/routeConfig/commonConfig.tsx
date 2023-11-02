import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export enum CommonRoutes {
    MAIN = 'main',

	// last
    NOT_FOUND = 'not_found',
}

export const CommonRoutePath: Record<CommonRoutes, string> = {
    [CommonRoutes.MAIN]: '/',
    [CommonRoutes.NOT_FOUND]: '*',
};

export const commonRouteConfig: Record<CommonRoutes, RouteProps> = {
    [CommonRoutes.MAIN]: {
        path: CommonRoutePath.main,
        element: <MainPage />,
    },
    [CommonRoutes.NOT_FOUND]: {
        path: CommonRoutePath.not_found,
        element: <NotFoundPage />,
    },
};
