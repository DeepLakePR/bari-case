"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import TaskFilters from "@/components/task/TaskFilters";
import TaskTable from "@/components/task/TaskTable";
import TaskModalForm from "./task/TaskModalForm";
import useModalForm from "@/hooks/useModalForm";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";
import { useState } from "react";

export default function AppLayout() {

    const { open, setOpen } = useModalForm();
    const { tasks, createTask, deleteTask, updateManyTask, updateTask } = useTasks();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    
    return (
        <main className="mx-auto flex max-w-[100rem] flex-col p-8 bg-white rounded-lg">
            <TaskModalForm
                open={open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) setEditingTask(null);
                    setOpen(nextOpen);
                }}
                onCreate={createTask}
                onUpdate={updateTask}
                task={editingTask}
            />

            <div className="rounded-t-xl py-4 pt-0">
                <Typography.Title level={3}>Controle de Tarefas</Typography.Title>

                <Divider size="medium" />

                <Flex justify="space-between">
                    <TaskFilters />

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setEditingTask(null);
                            setOpen(true);
                        }}
                    >
                        Nova tarefa
                    </Button>
                </Flex>
            </div>

            <div className="rounded-b-xl py-4 pt-0">
                <TaskTable
                    tasks={tasks}
                    onDeleteTask={deleteTask}
                    onUpdateMany={updateManyTask}
                    onEditTask={(task) => {
                        setEditingTask(task);
                        setOpen(true);
                    }}
                />
            </div>
        </main>
    );
}
