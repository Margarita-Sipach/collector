import { collectionState } from 'entities/Collection';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { CollectionHeader } from './CollectionHeader/CollectionHeader';
import { observer } from 'mobx-react-lite';
import cls from './CollectionPage.module.scss'
import { itemState } from 'entities/Item';
import { AppCard, CardType } from 'shared/ui/AppCard/AppCard';

const CollectionPage = observer(() => {
    const { t } = useTranslation('main');
    const { id } = useParams();

	useEffect(() => {
		collectionState.getById(Number(id))
		itemState.getAll()
		return () => {
			collectionState.setCollection(null)
		}
	}, [])

    return (
        <div className={cls.content}>
            {collectionState.collection && <CollectionHeader collection={collectionState.collection}></CollectionHeader>}
			<div className={cls.body}>
                        {itemState.items?.map((item: any) => <AppCard key={item.id} type={CardType.item} value={item} />)}
                    </div>
	    </div>
    );
});

export default CollectionPage;
