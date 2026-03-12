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
        <Flex>
            <Search placeholder="Buscar" allowClear onSearch={onSearch} />

            <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'all', label: 'Todas' },
                    { value: 'pending', label: 'Pendentes' },
                    { value: 'concluded', label: 'Concluídas' },
                ]}
            />
        </Flex>
    </Space>
}
