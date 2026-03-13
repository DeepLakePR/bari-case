"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import TaskFilters from "@/components/task/TaskFilters";
import TaskTable from "@/components/task/TaskTable";
import TaskModalForm from "./task/TaskModalForm";
import useModalForm from "@/hooks/useModalForm";

export default function AppLayout() {

    const { open, setOpen } = useModalForm();
    
    return (
        <main className="mx-auto flex max-w-[100rem] flex-col p-8 bg-white rounded-lg">
            <TaskModalForm open={open} />

            <div className="rounded-t-xl py-4 pt-0">
                <Typography.Title level={3}>Controle de Tarefas</Typography.Title>

                <Divider size="medium" />

                <Flex justify="space-between">
                    <TaskFilters />

                    <Button type="primary" icon={<PlusOutlined />}
                    onClick={() => setOpen(true)}>
                        Nova tarefa
                    </Button>
                </Flex>
            </div>

            <div className="rounded-b-xl py-4 pt-0">
                <TaskTable />
            </div>
        </main>
    );
}
