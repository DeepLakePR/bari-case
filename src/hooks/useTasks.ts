"use client";

import type { Task } from "@/types/task";
import mock from '@/data/tasks.json';
import { useEffect, useState } from "react";
import { PRIORITY_META } from "@/lib/task";
import { randomUUID } from "crypto";

export type UseTasksResult = {
    tasks: Task[];
    createTask: (data: Task) => Promise<boolean>;
    updateTask: (id: string) => Promise<boolean>;
    deleteTask: (id: string) => Promise<boolean>;
};

export function useTasks(): UseTasksResult {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {

        async function retrieveTasks() {
            if (typeof window === undefined || typeof window === null) return;

            const storagedTasks: string | null = window.localStorage.getItem("tasks");


            if (storagedTasks && storagedTasks !== "[]") {
                const parsedTasks = JSON.parse(storagedTasks);
                await setTasks(parsedTasks);

            } else {
                await setTasks(mock as Task[]);

            }

        }

        retrieveTasks();

    }, []);

    useEffect(() => {

        if (typeof window === undefined || typeof window === null) return;

        const stringifyTasks = JSON.stringify(tasks);
        window.localStorage.setItem("tasks", stringifyTasks);

    }, [tasks]);

    async function createTask(data: Task) {
        
        if(!data.title || !data.priority) return false;

        if(data.title.length < 3) return false;

        if(!PRIORITY_META[data.priority]) return false;

        const newTask = {
            id: randomUUID(),
            title: data.title,
            description: data.description ?? "",
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate).toDateString() : "",
            done: false,
        }

        await setTasks([...tasks, newTask])
        
        return true;
    }

    async function updateTask(id: string) {
        
        if(!id) return false;

        return true;
    }

    async function deleteTask(id: string) {
        
        if(!id) return false;

        await setTasks(tasks.filter((t) => t.id !== id));

        return true;
    }

    return { tasks, createTask, updateTask, deleteTask };
}
