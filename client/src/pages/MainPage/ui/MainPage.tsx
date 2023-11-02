import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t, i18n } = useTranslation('');

    const handleClick = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div>
            <Button onClick={handleClick} icon={t('lang')} />
            <div>{t('main')}</div>
        </div>
    );
};

export default MainPage;
