import { collectionState } from 'entities/Collection';
import { itemState } from 'entities/Item';
import { ElementsTypes } from 'shared/class/ElementState';

export const elementsStates = {
    [ElementsTypes.collection]: collectionState,
    [ElementsTypes.item]: itemState,
};
