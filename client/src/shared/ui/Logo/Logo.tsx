import { memo } from 'react';
import { GiAbstract061 } from 'react-icons/gi';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import cls from './Logo.module.scss';

export const Logo = memo(() => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(CommonRoutePath.main);
    };

    return (
        <Button onClick={handleClick} type="link" className={cls.Logo}>
            <GiAbstract061 className={cls.icon} />
            <span className={cls.text}>collector</span>
        </Button>
    );
});
