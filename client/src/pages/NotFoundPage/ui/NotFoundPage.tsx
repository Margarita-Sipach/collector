import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
}

export const NotFoundPage: FC<NotFoundPageProps> = memo(() => {
    const { t } = useTranslation('error');
    return <div>{t('notFound')}</div>;
});
