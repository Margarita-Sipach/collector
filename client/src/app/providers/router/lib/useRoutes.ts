import { adminRouteConfig } from 'shared/config/routeConfig/adminConfig';
import { authRouteConfig } from 'shared/config/routeConfig/authConfig';
import { commonRouteConfig } from 'shared/config/routeConfig/commonConfig';
import { notAuthRouteConfig } from 'shared/config/routeConfig/notAuthConfig';

export const useRoutes = (isAuth: boolean, isAdmin: boolean) => Object.values({
    ...commonRouteConfig,
    ...(isAuth ? authRouteConfig : notAuthRouteConfig),
    ...(isAdmin ? adminRouteConfig : {}),
}).filter(Boolean);
