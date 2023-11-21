import { collectionState } from 'entities/Collection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { itemState } from 'entities/Item';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ElementsTypes } from 'shared/class/ElementState';
import { CollectionHeader } from './CollectionHeader/CollectionHeader';

const CollectionPage = observer(() => {
    const { id } = useParams();

    useEffect(() => {
        const numberId = Number(id);
        collectionState.getById(numberId);
        itemState.getAll({ collectionId: numberId });

        return () => {
            collectionState.setElement(null);
            itemState.setElements([]);
        };
    }, [id]);

    return (
        <>

            {collectionState.element && (
                <PageWrapper type={ElementsTypes.item} userId={collectionState.element.userId}>
                    <CollectionHeader
                        collection={collectionState.element}
                    />

                </PageWrapper>
		 )}
        </>
    );
});

export default CollectionPage;
