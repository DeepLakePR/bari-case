"use client";

import { Button, Divider, Flex, Typography } from "antd";
import TaskFilters from "./task/TaskFilters";
import TaskTable from "./task/TaskTable";
import { PlusOutlined } from "@ant-design/icons";

export default function AppLayout() {

    return <main className="flex flex-col mx-auto p-8 max-w-[100rem]">
        <div className="p-4 bg-white rounded-t-xl">
            <Typography.Title level={3}>
                Controle de Tarefas
            </Typography.Title>

            <Divider size="medium" />

            <Flex justify="space-between">
                <TaskFilters />

                <Button type="primary" icon={<PlusOutlined />}>
                    Criar Tarefa
                </Button>
            </Flex>
        </div>

        <div className="p-4 pt-0 bg-white rounded-b-xl">
            <TaskTable />
        </div>
    </main>
}
