import { FC, useMemo, useState } from 'react';
import {
    Avatar,
    Button,
    Flex,
    Tag, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Item, itemState } from 'entities/Item';
import { PageHeader } from 'shared/ui/PageHeader/PageHeader';
import { ElementsTypes } from 'shared/class/ElementState';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { userState } from 'entities/User';
import cls from './ItemHeader.module.scss';

const { Title } = Typography;

interface ItemHeaderProps {
  className?: string
  item: Item
}

export const ItemHeader: FC<ItemHeaderProps> = observer((props) => {
    const { item } = props;
    const { t } = useTranslation();
    const { isAuth, user, userId } = userState;

    const [isLiked, setIsLiked] = useState(user?.likedItems.find(({ Like }: any) => Like.itemId === item.id)?.Like?.like);
    const like = async () => {
        const newLike = !isLiked;
        await itemState.like(userId, newLike);
        setIsLiked(newLike);
    };
    return (
        <PageHeader img="" userId={item.userId} isButton={false}>
            <Flex>
                {isAuth && (
                    <Button type="link" size="large" onClick={like}>
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                )}
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
