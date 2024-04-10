import { FloatButton } from 'antd';
import { CompoundedComponent } from 'antd/es/float-button/interface';
import { Theme, themeState } from 'app/providers/ThemeProvider';
import { observer } from 'mobx-react-lite';
import { FC, memo } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

interface ThemeSwitcherProps {
	Tag?: CompoundedComponent
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(observer((props) => {
    const { Tag = FloatButton } = props;
    const { isLight } = themeState;

    const switchTheme = () => {
        const newTheme = isLight ? Theme.dark : Theme.light;
        themeState.setTheme(newTheme);
    };

    return (
        <Tag
            icon={isLight ? <BsSun /> : <BsMoon />}
            onClick={switchTheme}
        />
    );
}));
