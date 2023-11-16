import { FC } from 'react';
import {
    Avatar, Button, Typography,
} from 'antd';
import { AppStatistic } from 'features/AppStatistic';
import { useTranslation } from 'react-i18next';
import { User, userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { settingsState } from 'app/providers/SettingsProvider';
import { collectionState } from 'entities/Collection';
import cls from './UserHeader.module.scss';

const { Title } = Typography;

interface UserHeaderProps {
  className?: string
  user: Partial<User>
}

export const UserHeader: FC<UserHeaderProps> = observer((props) => {
    const { user } = props;
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
                    <Button
                        className={cls.buttons}
                        onClick={() => {
                            collectionState.openModal();
                        }}
                    >
                        +
                        {t('collection')}
                    </Button>
                )}
            </div>
        </div>
    );
});
