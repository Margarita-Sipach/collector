import { Button, Spin } from 'antd';
import { Theme, themeState } from 'app/providers/ThemeProvider';
import React, { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRouter = memo(() => {
    const isAuth = true;

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        const isAuthOnly = route.authOnly;
        return !(isAuthOnly && !isAuth);
    }), [isAuth]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<Spin size="large" />}>
                            <Button onClick={() => themeState.setTheme(Theme[themeState.isLight ? 'dark' : 'light'])}>
                                header
                            </Button>
                            <div className="container main">
                                {element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
});
