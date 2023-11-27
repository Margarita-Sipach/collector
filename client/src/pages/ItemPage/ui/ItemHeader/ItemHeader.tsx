import { FC, useState } from 'react';
import {
    Button,
    Flex,
    Tag, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Item, itemState } from 'entities/Item';
import { PageHeader } from 'shared/ui/PageHeader/PageHeader';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { userState } from 'entities/User';

const { Title } = Typography;

interface ItemHeaderProps {
  className?: string
  item: Item
}

export const ItemHeader: FC<ItemHeaderProps> = observer((props) => {
    const { item } = props;
    const { t } = useTranslation();
    const { isAuth, userId } = userState;
    const [like, setLike] = useState({
        status: item?.likes?.find?.(({ id, Like }: any) => id === userId && Like.like),
        amount: item?.likes.filter?.(({ Like }: any) => Like.like).length,
    });

    const likeHandler = async () => {
        const { status, amount } = like;
        const newLike = { status: !status, amount: amount + (status ? -1 : +1) };
        await itemState.like(userId, newLike.status);
        setLike(newLike);
    };
    return (
        <PageHeader img="" userId={item.userId} isButton={false}>
            <Flex>
                <Button disabled={!isAuth} type="link" size="large" onClick={likeHandler}>
                    {like.amount}
                    {like.status ? <FaHeart /> : <FaRegHeart />}
                </Button>

                <Title>{item.title}</Title>
            </Flex>
            <Title level={3}>
                {t('tags')}
                :
                {' '}
                {item.tag.map(({ title }) => <Tag key={title}>{title}</Tag>)}
            </Title>
        </PageHeader>
    );
});
