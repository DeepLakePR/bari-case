"use client";

import { Input, Select, Space, Tag } from "antd";
import { FILTER_OPTIONS, PRIORITY_META } from "@/lib/task";
import type { TaskFilterStatus, TaskPriority } from "@/types/task";

type TaskFiltersProps = {
    search: string;
    status: TaskFilterStatus;
    priorities: TaskPriority[];
    onSearchChange: (value: string) => void;
    onStatusChange: (value: TaskFilterStatus) => void;
    onPrioritiesChange: (value: TaskPriority[]) => void;
};

const { Search } = Input;

const priorityOptions = [
    {
        label: <Tag color={PRIORITY_META.low.color}>{PRIORITY_META.low.label.toUpperCase()}</Tag>,
        value: "low",
    },
    {
        label: <Tag color={PRIORITY_META.medium.color}>{PRIORITY_META.medium.label.toUpperCase()}</Tag>,
        value: "medium",
    },
    {
        label: <Tag color={PRIORITY_META.high.color}>{PRIORITY_META.high.label.toUpperCase()}</Tag>,
        value: "high",
    },
] as const;

export default function TaskFilters({
    search,
    status,
    priorities,
    onSearchChange,
    onStatusChange,
    onPrioritiesChange,
}: TaskFiltersProps) {
    return (
        <Space className="flex-col md:flex-row items-center w-full" classNames={{ item: "w-full md:w-auto" }}>
            <Search
                placeholder="Buscar"
                allowClear
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full md:w-auto"
            />

            <Select
                value={status}
                className="w-full md:w-40"
                onChange={onStatusChange}
                options={[...FILTER_OPTIONS]}
            />

            <Select
                mode="multiple"
                allowClear
                className="w-full max-[768px]:w-full! max-[915px]:w-40! md:w-70"
                placeholder="Prioridade"
                value={priorities}
                onChange={onPrioritiesChange}
                options={[...priorityOptions]}
            />
        </Space>
    );
}
