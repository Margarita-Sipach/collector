import { observer } from 'mobx-react-lite';
import { ConfigProvider, theme } from 'antd';
import { themeState } from '../model/themeState';

export const ThemeProvider = observer(({ children }) => (
    <ConfigProvider theme={{
        algorithm: theme[themeState.isLight ? 'defaultAlgorithm' : 'darkAlgorithm'],
    }}
    >
        {children}
    </ConfigProvider>
));
