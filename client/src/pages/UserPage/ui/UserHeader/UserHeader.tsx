import { FC } from 'react';
import {
    Avatar, Button, Typography,
} from 'antd';
import { AppStatistic } from 'features/AppStatistic';
import { useTranslation } from 'react-i18next';
import { User, userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import cls from './UserHeader.module.scss';

const { Title } = Typography;

interface UserHeaderProps {
  className?: string
  user: Partial<User>
  setIsVisible: (isVisible: boolean) => void
}

export const UserHeader: FC<UserHeaderProps> = observer((props) => {
    const { user, setIsVisible } = props;
    const { t } = useTranslation();

    return (
        <div className={cls.container}>
            <Avatar
                shape="square"
                className={cls.avatar}
            />
            <div className={cls.content}>
                <Title>{user.username}</Title>
                <AppStatistic itemsAmount={200} collectionsAmount={300} />
                {(user.id === userState.userId || userState.isAdmin) && (
                    <Button className={cls.buttons} 
					onClick={() => { setIsVisible(true); }}
					>
                        +
                        {t('collection')}
                    </Button>
                )}
            </div>
        </div>
    );
});
