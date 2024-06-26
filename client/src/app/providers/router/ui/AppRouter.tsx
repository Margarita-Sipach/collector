import { Spin } from 'antd';
import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Sidebar } from 'widgets/Sidebar';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { UpdateCollectionModal } from 'widgets/UpdateCollectionModal';
import { UpdateItemModal } from 'widgets/UpdateItemModal';
import { useRoutes } from '../lib/useRoutes';

export const AppRouter = memo(observer(() => {
    const { isAuth, isAdmin } = userState;

    const routes = useRoutes(isAuth, isAdmin);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<Spin size="large" />}>
                            <Header />
                            <Sidebar />
                            <div className="container main">
                                {element}
                            </div>
                            <UpdateCollectionModal />
                            <UpdateItemModal />
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
}));
