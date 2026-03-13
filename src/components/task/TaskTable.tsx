"use client";

import { useState } from "react";
import { CheckOutlined, ClockCircleOutlined, DeleteFilled, EditFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Empty, message, Popconfirm, Space, Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PRIORITY_META } from "@/lib/task";
import type { Task } from "@/types/task";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

type TaskTableProps = {
    tasks: Task[];
    onDeleteTask: (id: string) => Promise<boolean>;
    onUpdateMany: (id: string[]) => Promise<boolean>;
    onEditTask: (task: Task) => void;
};

export default function TaskTable({ tasks, onDeleteTask, onUpdateMany, onEditTask }: TaskTableProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
        tasks.filter((t) => t.done === true).map((t) => t.id)
    );
    const [messageApi, context] = message.useMessage();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onUpdateMany(newSelectedRowKeys as string[]);
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
                    <Button
                        icon={<EditFilled />}
                        type="primary"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEditTask(record);
                        }}
                    />
                    <Popconfirm
                        title="Deletar Tarefa"
                        description="Você tem certeza que deseja deletar essa tarefa?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText="Sim"
                        onConfirm={async () => {
                            const success = await onDeleteTask(record.id);
                            if (success) messageApi.success("Tarefa deletada com sucesso.")
                            else messageApi.error("Erro ao deletar tarefa.");
                        }}
                    >
                        <Button
                            icon={<DeleteFilled />}
                            danger
                            onClick={(event) => event.stopPropagation()}
                        />

                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (<>
        {context}
        <Table<Task>
            rowKey="id"
            dataSource={tasks}
            rowSelection={rowSelection}
            columns={columns}
            onRow={(record) => ({
                onClick: (event) => {
                    const target = event.target as HTMLElement;
                    if (target.closest("button") || target.closest(".ant-checkbox")) {
                        return;
                    }
                    onEditTask(record);
                },
            })}
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
    </>
    );

}
