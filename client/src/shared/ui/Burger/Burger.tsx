import {
    FC, memo,
} from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import cls from './Burger.module.scss';

interface BurgerProps{
	onClick: () => void
}

export const Burger: FC<BurgerProps> = memo(({ onClick }: BurgerProps) => (
    <button
        className={cls.burger}
        onClick={onClick}
    >
        <RxHamburgerMenu
            className={cls.icon}
        />
    </button>
));
