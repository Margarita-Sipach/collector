import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { User, userState } from 'entities/User';
import { collectionState } from 'entities/Collection';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ElementsTypes } from 'shared/class/ElementState';
import { UserHeader } from './UserHeader/UserHeader';

const UserPage = observer(() => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const numberId = Number(id);
        userState.getUserById(numberId).then((data) => setUser(data));
        collectionState.getAll({ userId: numberId });

        return () => {
            collectionState.setElements([]);
        };
    }, [id]);

    return (
        <PageWrapper type={ElementsTypes.collection}>
            {user && <UserHeader user={user} />}
        </PageWrapper>
    );
});

export default UserPage;
