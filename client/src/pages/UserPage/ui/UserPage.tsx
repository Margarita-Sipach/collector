import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { User, userState } from 'entities/User';
import { collectionState } from 'entities/Collection';
import { AppCard, CardType } from 'shared/ui/AppCard/AppCard';
import cls from './UserPage.module.scss';
import { UserHeader } from './UserHeader/UserHeader';

const UserPage = observer(() => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);

    const setUserById = (id: number) => {
        userState.getUserById(id).then((data) => setUser(data));
    };

    const setCollectionsById = (id: number) => {
        collectionState.getAll({ userId: id });
    };

    useEffect(() => {
        const numberId = Number(id);
        setUserById(numberId);
        setCollectionsById(numberId);

        return () => {
            collectionState.setElements([]);
        };
    }, [id]);

    return (
        <>
            {user && (
                <div className={cls.col}>
                    <UserHeader user={user} />
                    <div className={cls.body}>
                        {collectionState.elements?.map((item: any) => (
                            <AppCard
                                key={item.id}
                                type={CardType.collection}
                                value={item}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
});

export default UserPage;
