import { Button, Input } from 'antd';
import {
    FC, memo, useState,
} from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { UserOutlined } from '@ant-design/icons';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Burger } from 'shared/ui/Burger/Burger';
import classNames from 'classnames';
import { MainMenu } from 'features/MainMenu';
import { useNavigate } from 'react-router-dom';
import { AdminRoutePath } from 'shared/config/routeConfig/adminConfig';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import cls from './Header.module.scss';

interface HeaderProps {
}

export const Header: FC<HeaderProps> = memo(observer(() => {
    const navigate = useNavigate();
    const { isAuth, isAdmin } = userState;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={classNames(cls.Header, 'container')}>
            <div className={cls.col}>
                <Logo />
                <Input
                    suffix={<AiOutlineSearch />}
                    bordered={false}
                    className={cls.input}
                />
            </div>
            <div className={cls.col}>
                {isAdmin && (
                    <Button
                        icon={<MdOutlineAdminPanelSettings />}
                        onClick={() => navigate(AdminRoutePath.admin)}
                    />
                )}
                {isAuth && <Button icon={<UserOutlined />} />}
                <Burger onClick={() => setIsMenuOpen((prev) => !prev)} />
            </div>
            <MainMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </header>
    );
}));
