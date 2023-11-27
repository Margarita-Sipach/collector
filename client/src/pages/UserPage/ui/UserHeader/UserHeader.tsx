import { FC } from 'react';
import {
    Typography,
} from 'antd';
import { AppStatistic } from 'features/AppStatistic';
import { useTranslation } from 'react-i18next';
import { User } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { PageHeader } from 'shared/ui/PageHeader/PageHeader';
import { ElementsTypes } from 'shared/class/ElementState';

const { Title } = Typography;

interface UserHeaderProps {
  className?: string
  user: User
}

export const UserHeader: FC<UserHeaderProps> = observer((props) => {
    const { user } = props;
    const { t } = useTranslation();

    return (
        <PageHeader img="" type={ElementsTypes.collection} userId={user.id}>
            <Title>{user.username}</Title>
            <AppStatistic itemsAmount={200} collectionsAmount={300} />
        </PageHeader>

    );
});
