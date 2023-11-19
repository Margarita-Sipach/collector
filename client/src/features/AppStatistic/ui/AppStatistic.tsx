import { FC } from 'react';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import cls from './AppStatistic.module.scss';

interface AppStatisticProps {
  itemsAmount: number
  collectionsAmount: number
}

const formatter: any = (value: number) => <CountUp end={value} />;

export const AppStatistic: FC<AppStatisticProps> = (props) => {
    const { itemsAmount, collectionsAmount } = props;

    return (
        <div className={cls.container}>
            <Statistic
                title="Items"
                value={itemsAmount}
                formatter={formatter}
            />
            <Statistic
                title="Collections"
                value={collectionsAmount}
                formatter={formatter}
            />
        </div>
    );
};
