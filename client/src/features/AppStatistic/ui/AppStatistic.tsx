import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import cls from './AppStatistic.module.scss';

interface AppStatisticProps {
  className?: string
  itemsAmount: number
  collectionsAmount: number
}

const formatter: any = (value: number) => <CountUp end={value} />;

export const AppStatistic: FC<AppStatisticProps> = (props) => {
    const { itemsAmount, collectionsAmount } = props;
    const { t } = useTranslation();

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
