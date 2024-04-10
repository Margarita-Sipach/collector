import Table from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import cls from './AdminPage.module.scss';
import { useColumns } from '../lib/hooks/useColums';

const AdminPage = observer(() => {
    const { columns, users } = useColumns();
    return (
        <Table columns={columns} dataSource={users} className={cls.table} />
    );
});

export default AdminPage;
