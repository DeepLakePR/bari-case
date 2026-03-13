"use client";

import { Input, Select, Space } from "antd";
import type { GetProps } from "antd";
import { FILTER_OPTIONS } from "@/lib/task";
import type { TaskFilterStatus } from "@/types/task";

const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

export default function TaskFilters() {
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);

    const handleChange = (value: TaskFilterStatus) => {
        console.log(`selected ${value}`);
    };

    return (
        <Space>
            <Search placeholder="Buscar" allowClear onSearch={onSearch} />

            <Select
                defaultValue="all"
                className="w-40"
                onChange={handleChange}
                options={FILTER_OPTIONS}
            />
        </Space>
    );
}
