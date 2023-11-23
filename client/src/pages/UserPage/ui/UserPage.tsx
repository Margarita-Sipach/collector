import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userState } from 'entities/User';
import { collectionState } from 'entities/Collection';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ElementsTypes } from 'shared/class/ElementState';
import { UserHeader } from './UserHeader/UserHeader';

const UserPage = observer(() => {
    const { id } = useParams();

    useEffect(() => {
        const numberId = Number(id);
        userState.getUserById(numberId);
        collectionState.getAll({ userId: numberId });

        return () => {
            collectionState.setElements([]);
        };
    }, [id]);

    return (
        <>
            {userState.pageUser && (
                <PageWrapper type={ElementsTypes.collection}>
                    <UserHeader user={userState.pageUser} />
                </PageWrapper>
            )}
        </>
    );
});

export default UserPage;
