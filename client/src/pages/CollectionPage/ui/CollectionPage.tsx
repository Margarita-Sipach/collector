import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AddItemModal } from 'widgets/AddItemModal';

const CollectionPage = () => {
    const { t } = useTranslation('main');
    const [isVisible, setIsVisible] = useState(false);
    const { id } = useParams();

    return (
        <div>
            <Button onClick={() => setIsVisible(true)}>collection click</Button>
            <AddItemModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                collectionId={Number(id)}
            />
        </div>
    );
};

export default CollectionPage;
