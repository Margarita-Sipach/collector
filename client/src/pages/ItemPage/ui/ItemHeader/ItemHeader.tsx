import { FC } from 'react';
import {
    Avatar,
    Button,
    Flex,
    Tag, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Item } from 'entities/Item';
import { PageHeader } from 'shared/ui/PageHeader/PageHeader';
import { ElementsTypes } from 'shared/class/ElementState';
import cls from './ItemHeader.module.scss';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

const { Title } = Typography;

interface ItemHeaderProps {
  className?: string
  item: Item
}

export const ItemHeader: FC<ItemHeaderProps> = observer((props) => {
    const { item } = props;
    const { t } = useTranslation();

    return (
        <PageHeader img="" userId={item.userId} isButton={false}>
            <Flex>
			<Button type='link' size='large'>{true ? <FaRegHeart /> : <FaHeart />}</Button>
			<Title>{item.title}</Title>

			</Flex>
            <Title level={3}>
                Tags:
                {' '}
                {item.tag.map(({ title }) => <Tag>{title}</Tag>)}
            </Title>
			
        </PageHeader>
    );
});
