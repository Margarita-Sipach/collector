import { Menu, MenuProps } from 'antd';
import classNames from 'classnames';
import {
    Dispatch, FC, SetStateAction, memo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './MainMenu.module.scss';
import { useItems } from '../lib/hooks/useItems';

interface MainMenuProps{
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const MainMenu: FC<MainMenuProps> = memo(({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const isAdmin = false;
    const isAuth = true;

    const items = useItems(isAuth, isAdmin);

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
        setIsOpen(false);
    };

    return (
        <Menu
            className={classNames(cls.menu, { [cls.open]: isOpen })}
            mode="vertical"
            items={items}
            onClick={onClick}
        />
    );
});
