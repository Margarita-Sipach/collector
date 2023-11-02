import { FloatButton } from 'antd';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
	Tag?: CompoundedComponent
}

export const LangSwitcher: FC<LangSwitcherProps> = memo((props) => {
    const { Tag = FloatButton } = props;
    const { t, i18n } = useTranslation();

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Tag
            icon={t('lang')}
            onClick={switchLang}
        />
    );
});
