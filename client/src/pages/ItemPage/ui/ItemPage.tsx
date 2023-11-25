import { itemState } from 'entities/Item';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Descriptions, List } from 'antd';
import { clearScreenDown } from 'readline';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { ItemHeader } from './ItemHeader/ItemHeader';
import cls from './ItemPage.module.scss';

const ItemPage = observer(() => {
    const { id } = useParams();

    useEffect(() => {
        const numberId = Number(id);
        itemState.getById(numberId);

        return () => {
        };
    }, [id]);

    return itemState.element && (
        <div className={cls.col}>
            <ItemHeader
                item={itemState.element}
            />
            <div className={cls.body}>
                <Descriptions title="Item Info">
                    {
                        itemState.element.field.map(({ FieldItem, title, id }: any) => (
                            <Descriptions.Item key={id} label={title}>{FieldItem.value}</Descriptions.Item>
                        ))
                    }
                </Descriptions>
                <List
                    header="Comments"
                    itemLayout="horizontal"
                    style={{ width: '100%' }}
                >
                    {new Array(10).fill('wertyuiknbvdrty htresxcvg').map((i, index) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{ width: '100%' }}
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design">{i}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    ))}
                </List>
            </div>

        </div>
		 );
});

export default ItemPage;
