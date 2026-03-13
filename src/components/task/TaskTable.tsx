"use client";

import { useState } from "react";
import { CheckOutlined, ClockCircleOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Empty, Space, Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PRIORITY_META } from "@/lib/task";
import type { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

export default function TaskTable() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { tasks } = useTasks();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<Task> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: TableColumnsType<Task> = [
        {
            title: "Prioridade",
            dataIndex: "priority",
            key: "priority",
            render: (priority: string, _, index) => (
                <Tag color={PRIORITY_META[priority as keyof typeof PRIORITY_META].color} key={index}>
                    {PRIORITY_META[priority as keyof typeof PRIORITY_META].label.toUpperCase()}
                </Tag>
            ),
            width: 100
        },
        { title: "Título", dataIndex: "title", key: "title" },
        {
            title: "Data de entrega", 
            dataIndex: "dueDate", 
            key: "dueDate", 
            render: (value: string) => 
                value 
                ? new Date(value).toLocaleDateString("pt-BR") 
                : <p className="text-black/40">Sem data de entrega</p>
        },
        {
            title: "Status",
            dataIndex: "done",
            key: "done",
            render: (done: boolean) =>
                done ? (
                    <p className="text-green-500">
                        <CheckOutlined /> Concluída
                    </p>
                ) : (
                    <p className="text-amber-500">
                        <ClockCircleOutlined /> Pendente
                    </p>
                ),
        },
        {
            title: "Ações",
            key: "actions",
            render: (_: unknown, record) => (
                <Space size="small">
                    <Button icon={<EditFilled />} type="primary" />
                    <Button icon={<DeleteFilled />} danger />
                </Space>
            ),
        },
    ];

    return (
        <Table<Task>
            rowKey="id"
            dataSource={tasks}
            rowSelection={rowSelection}
            columns={columns}
            locale={{
                emptyText: (
                    <div className="p-12">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={"Nenhuma tarefa encontrada."}
                        />
                    </div>
                ),
            }}
        />
    );
}
