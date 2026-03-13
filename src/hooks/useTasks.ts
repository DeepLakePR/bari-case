"use client";

import type { Task, TaskPriority } from "@/types/task";
import mock from '@/data/tasks.json';
import { useEffect, useState } from "react";
import { PRIORITY_META } from "@/lib/task";

export type TaskInput = {
    id?: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string;
    done?: boolean;
}

export type UseTasksResult = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    isLoading: boolean;
    createTask: (data: TaskInput) => Promise<boolean>;
    updateTask: (data: TaskInput) => Promise<boolean>;
    updateManyTask: (id: string[]) => Promise<boolean>;
    deleteTask: (id: string) => Promise<boolean>;
};

export function useTasks(): UseTasksResult {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        if (typeof window === "undefined") return;

        const storagedTasks = window.localStorage.getItem("tasks");

        if (storagedTasks && storagedTasks !== "[]") {
            setTasks(JSON.parse(storagedTasks) as Task[]);
        } else {
            setTasks(mock as Task[]);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (isLoading) return;

        const stringifyTasks = JSON.stringify(tasks);
        window.localStorage.setItem("tasks", stringifyTasks);
    }, [isLoading, tasks]);

    async function createTask(data: TaskInput) {

        if (!data.title || !data.priority) return false;

        if (data.title.length < 3) return false;

        if (!PRIORITY_META[data.priority]) return false;

        const newTask = {
            id: window.crypto.randomUUID(),
            title: data.title,
            description: data.description ?? "",
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate).toDateString() : "",
            done: false,
        }

        setTasks((prev) => [...prev, newTask]);

        return true;
    }

    async function updateTask(data: TaskInput) {

        if (!data.id) return false;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === data.id
                    ? {
                          ...task,
                          title: data.title,
                          description: data.description ?? "",
                          priority: data.priority,
                          dueDate: data.dueDate ?? task.dueDate ?? "",
                          done: data.done ?? task.done,
                      }
                    : task
            )
        );

        return true;
    }

    async function updateManyTask(ids: string[]) {
        const idsSet = new Set(ids ?? []);

        setTasks((prev) =>
            prev.map((task) => ({
                ...task,
                done: idsSet.has(task.id),
            }))
        );

        return true;
    }

    async function deleteTask(id: string) {

        if (!id) return false;

        setTasks((prev) => prev.filter((t) => t.id !== id));

        return true;
    }

    return { tasks, setTasks, isLoading, createTask, updateTask, updateManyTask, deleteTask };
}
