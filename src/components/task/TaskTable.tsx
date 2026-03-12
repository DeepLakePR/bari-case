import { useState } from 'react';
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Space, Button } from "antd";

const { Column } = Table;

import type { TableProps } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface TableDataType {
    key: React.Key;
    id: string;
    title: string;
    priority: string;
    dueDate: string;
    status: boolean;
    actions: React.ReactElement;
}

const priorityConverter = {
    high: {
        display: "Alta",
        color: "#fff"
    },
    medium: {
        display: "Média",
        color: "#fff"
    },
    low: {
        display: "Baixa",
        color: "#fff"
    }
};

export default function TaskTable() {

    const data: TableDataType[] = [];
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const rowSelection: TableRowSelection<TableDataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return <Table<TableDataType> dataSource={data} rowSelection={rowSelection}>
        <Column title="Título" dataIndex="title" key="title" />
        <Column
            title="Prioridade"
            dataIndex="priority"
            key="priority"
            render={(priority: "high" | "medium" | "low") => (
                <Tag color={priorityConverter[priority].color} key={priority}>
                    {priorityConverter[priority].display.toUpperCase()}
                </Tag>
            )}
        />
        <Column title="Data de Entrega" dataIndex="dueDate" key="dueDate" />
        <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status: boolean) => (
                status
                    ? <p><CheckOutlined /> Concluída</p>
                    : <p><ClockCircleOutlined /> Pendente</p>
            )}
        // Or use badge
        />
        <Column
            title="Ações"
            key="actions"
            render={(_: React.ReactElement, record: TableDataType) => (
                <Space size="medium">
                    <Button>Editar {record.id}</Button>
                    <Button>Deletar {record.id}</Button>
                </Space>
            )}
        />
    </Table>
}
