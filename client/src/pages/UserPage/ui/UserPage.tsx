import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { User, userState } from 'entities/User';
import { CollectionItem, collectionState } from 'entities/Collection';
import cls from './UserPage.module.scss';
import { UserHeader } from './UserHeader/UserHeader';

const UserPage = observer(() => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);

    const setUserById = (id: number) => {
        userState.getUserById(id).then((data) => setUser(data));
    };

	const setCollectionsById = (id: number) => {
        collectionState.getAll({userId: id})
    };

	useEffect(() => {
		const numberId = Number(id)
		setUserById(numberId)
		setCollectionsById(numberId)

		return () => {
			collectionState.setCollections([])
		}
	}, [])


    return (
        <>
            {user && (
                <div className={cls.col}>
                    <UserHeader user={user} />
                    <div className={cls.body}>
                        {collectionState.collections?.map((item: any) => <CollectionItem key={item.id} collection={item} />)}
                    </div>
                </div>
            )}
        </>

    );
});

export default UserPage;
