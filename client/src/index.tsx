import { render } from 'react-dom';
import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import 'shared/config/i18n/i18n';
import 'app/style/style.scss';
import { SettingsProvider } from 'app/providers/SettingsProvider';

render(

    <ThemeProvider>
        <SettingsProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </SettingsProvider>
    </ThemeProvider>,
    document.getElementById('root'),
);
