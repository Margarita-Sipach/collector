import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <div>
            <div>{t('main')}</div>
        </div>
    );
};

export default MainPage;
