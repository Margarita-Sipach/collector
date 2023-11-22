import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AppCard } from 'shared/ui/AppCard/AppCard';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps{
	type: ElementsTypes
	userId: number
}

export const PageWrapper: FC<PageWrapperProps> = observer((props) => {
    const { children, type, userId } = props;
    const state = elementsStates[type];

    return (
        <div className={cls.col}>
            {children}
            <div className={cls.body}>
                {state.elements?.map((item: any) => (
                    <AppCard
                        key={item.id}
                        type={type}
                        value={item}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    );
});
