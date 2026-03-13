"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import TaskFilters from "@/components/task/TaskFilters";
import TaskTable from "@/components/task/TaskTable";
import TaskModalForm from "./task/TaskModalForm";
import useModalForm from "@/hooks/useModalForm";
import { useTasks } from "@/hooks/useTasks";
import type { Task, TaskFilterStatus, TaskPriority } from "@/types/task";
import { useMemo, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function AppLayout() {
    const { open, setOpen } = useModalForm();
    const { tasks, createTask, deleteTask, updateManyTask, updateTask, isLoading } = useTasks();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<TaskFilterStatus>("all");
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority[]>([]);

    const filteredTasks = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();

        return tasks.filter((task) => {
            if (normalizedSearch && !task.title.toLowerCase().includes(normalizedSearch)) {
                return false;
            }

            if (statusFilter === "pending" && task.done) return false;
            if (statusFilter === "concluded" && !task.done) return false;

            if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
                return false;
            }

            return true;
        });
    }, [priorityFilter, searchText, statusFilter, tasks]);

    const handleModalOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) setEditingTask(null);
        setOpen(nextOpen);
    };

    const handleCreateClick = () => {
        setEditingTask(null);
        setOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setOpen(true);
    };

    if (isLoading) {
        return <LoadingScreen label="Carregando tarefas" />;
    }

    return (
        <main className="mx-auto flex max-w-[100rem] flex-col p-8 bg-white rounded-lg">
            <TaskModalForm
                open={open}
                onOpenChange={handleModalOpenChange}
                onCreate={createTask}
                onUpdate={updateTask}
                task={editingTask}
            />

            <div className="rounded-t-xl py-4 pt-0 text-center md:text-left">
                <Typography.Title level={3}>Controle de Tarefas</Typography.Title>

                <Divider size="medium" />

                <Flex className="flex-col md:flex-row md:justify-between items-center gap-2">
                    <TaskFilters
                        search={searchText}
                        status={statusFilter}
                        priorities={priorityFilter}
                        onSearchChange={setSearchText}
                        onStatusChange={setStatusFilter}
                        onPrioritiesChange={setPriorityFilter}
                    />

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreateClick}
                        className="w-full md:w-auto"
                    >
                        Nova tarefa
                    </Button>
                </Flex>
            </div>

            <div className="rounded-b-xl py-4 pt-0">
                <TaskTable
                    tasks={filteredTasks}
                    onDeleteTask={deleteTask}
                    onUpdateMany={updateManyTask}
                    loading={isLoading}
                    onEditTask={handleEditTask}
                />
            </div>
        </main>
    );
}
