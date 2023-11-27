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
import { Collection, collectionState } from 'entities/Collection';

const { Title } = Typography;

interface UserHeaderProps {
  className?: string
  user: User
  collections: Collection[]
}

export const UserHeader: FC<UserHeaderProps> = observer((props) => {
    const { user, collections } = props;
    const { t } = useTranslation();

    return (
        <PageHeader img="" type={ElementsTypes.collection} userId={user.id}>
            <Title>{user.username}</Title>
            <AppStatistic itemsAmount={collections ? collections?.reduce((acc, {items}: any) => acc + items?.length, 0) : 0} collectionsAmount={collections.length} />
        </PageHeader>

    );
});
