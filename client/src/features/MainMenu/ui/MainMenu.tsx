import { Menu, MenuProps } from 'antd';
import classNames from 'classnames';
import {
    Dispatch, FC, SetStateAction, memo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { useTranslation } from 'react-i18next';
import cls from './MainMenu.module.scss';
import { useItems } from '../lib/hooks/useItems';

interface MainMenuProps{
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	userId: number
}

export const MainMenu: FC<MainMenuProps> = memo(observer((props) => {
    const { isOpen, setIsOpen, userId } = props;
    const navigate = useNavigate();

    const { isAdmin, isAuth } = userState;
    const { t } = useTranslation();

    const items = useItems(isAuth, isAdmin, t, userId);

    const onClick: MenuProps['onClick'] = ({ key }) => {
        let path = key;
        if (key === 'exit') {
            userState.exit();
            path = CommonRoutePath.main;
        }
        navigate(path);
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
}));
