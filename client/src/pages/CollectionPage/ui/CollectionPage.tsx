import { collectionState } from 'entities/Collection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { itemState } from 'entities/Item';
import { AppCard, CardType } from 'shared/ui/AppCard/AppCard';
import cls from './CollectionPage.module.scss';
import { CollectionHeader } from './CollectionHeader/CollectionHeader';

const CollectionPage = observer(() => {
    const { id } = useParams();

    useEffect(() => {
        const numberId = Number(id);
        collectionState.getById(numberId);
        itemState.getAll({ collectionId: numberId });
        return () => {
            collectionState.setCollection(null);
        };
    }, [id]);

    return (
        <div className={cls.content}>
            {collectionState.collection && (
                <CollectionHeader
                    collection={collectionState.collection}
                />
            )}
            <div className={cls.body}>
                {itemState.items?.map((item: any) => (
                    <AppCard
                        key={item.id}
                        type={CardType.item}
                        value={item}
                    />
                ))}
            </div>
        </div>
    );
});

export default CollectionPage;
