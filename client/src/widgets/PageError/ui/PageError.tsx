import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface PageErrorProps {
}

export const PageError: FC<PageErrorProps> = memo(() => {
    const { t } = useTranslation('error');
    return <div>{t('pageError')}</div>;
});
