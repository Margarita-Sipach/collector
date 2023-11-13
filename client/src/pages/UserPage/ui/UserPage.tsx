import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userState } from 'entities/User';
import { AddCollectionModal } from 'widgets/AddCollectionModal';
import cls from './UserPage.module.scss';
import { UserHeader } from './UserHeader/UserHeader';

const UserPage = observer(() => {
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        userState.getUserById(Number(id)).then((data) => setUser(data));
    }, [id]);

    return (
        <div className={cls.col}>
            <UserHeader user={user} setIsVisible={setIsVisible} />
            <AddCollectionModal userId={Number(id)} isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
});

export default UserPage;
