import { AuthPage } from 'pages/AuthPage';
import { RouteProps } from 'react-router-dom';

export enum NotAuthRoutes {
    LOGIN = 'login',
	REGISTRATION = 'registration'
}

export const NotAuthRoutePath: Record<NotAuthRoutes, string> = {
    [NotAuthRoutes.LOGIN]: `/${NotAuthRoutes.LOGIN}`,
    [NotAuthRoutes.REGISTRATION]: `/${NotAuthRoutes.REGISTRATION}`,
};

export const notAuthRouteConfig: Record<NotAuthRoutes, RouteProps> = {
    [NotAuthRoutes.LOGIN]: {
        path: NotAuthRoutePath.login,
        element: <AuthPage isRegistration={false} />,
    },
    [NotAuthRoutes.REGISTRATION]: {
        path: NotAuthRoutePath.registration,
        element: <AuthPage />,
    },
};
