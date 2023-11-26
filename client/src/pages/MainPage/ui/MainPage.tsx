import CheckableTag from 'antd/es/tag/CheckableTag';
import { Character, characterState } from 'entities/Character';
import { collectionState } from 'entities/Collection';
import { itemState } from 'entities/Item';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementsTypes } from 'shared/class/ElementState';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import cls from './MainPage.module.scss';

const MainPage = observer(() => {
    const { t } = useTranslation('main');

    const [selectedTags, setSelectedTags] = useState<Character[]>([]);

    useEffect(() => {
        collectionState.getAll({ amount: 5, sortLength: 'items' });
        itemState.getAll();
        characterState.getTags();
    }, []);

    useEffect(() => {
        itemState.filterElements(selectedTags ? { tag: selectedTags } : {});
    }, [selectedTags]);

    const handleChange = (tag: Character, checked: boolean) => {
        const nextSelectedTags = checked
		  ? [...selectedTags, tag]
		  : selectedTags.filter((t) => t.id !== tag.id);
        setSelectedTags(nextSelectedTags);
	  };

    return (
        <div className={cls.page}>
            <div className={cls.col}>
                <PageWrapper type={ElementsTypes.collection} />
                <PageWrapper type={ElementsTypes.item}>
                    <div className={cls.tags}>
                        {characterState.tags.map((tag) => (
                            <CheckableTag
                                key={tag.id}
                                checked={selectedTags.includes(tag)}
                                onChange={(checked) => handleChange(tag, checked)}
                            >
                                {tag.title}
                            </CheckableTag>
                        ))}
                    </div>
                </PageWrapper>
            </div>
        </div>
    );
});

export default MainPage;
