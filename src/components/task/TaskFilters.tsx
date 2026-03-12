"use client";

import { Flex, Space, Input, Select } from "antd";
const { Search } = Input;
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

export default function TaskFilters() {

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return <Space>
        <Search placeholder="Buscar" allowClear onSearch={onSearch} />

        <Select
            defaultValue="all"
            className="w-40"
            onChange={handleChange}
            options={[
                { value: 'all', label: 'Todas' },
                { value: 'pending', label: 'Pendentes' },
                { value: 'concluded', label: 'Concluídas' },
            ]}
        />
    </Space>
}
