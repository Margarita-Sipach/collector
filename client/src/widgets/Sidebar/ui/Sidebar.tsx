import { FloatButton } from 'antd';
import { LangSwitcher } from 'features/LangSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { FC, memo } from 'react';

interface SidebarProps {
}

export const Sidebar: FC<SidebarProps> = memo(() => (
    <FloatButton.Group shape="square">
        <ThemeSwitcher />
        <LangSwitcher />
    </FloatButton.Group>
));
