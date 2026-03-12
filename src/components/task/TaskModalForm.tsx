"use client"

import { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';

type FieldType = {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
};

export default function TaskModalForm(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Cancelar' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="task"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={() => console.log('')}
                onFinishFailed={() => console.log('')}
                autoComplete="on"
                variant="underlined"
            >

                <Form.Item<FieldType>
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Insira um título.', min: 3 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Descrição"
                    name="description"
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Prioridade"
                    name="priority"
                    rules={[{ required: true, message: 'Defina uma prioridade.' }]}>
                    <Select options={[
                        { label: 'Baixa', value: 'low' },
                        { label: 'Média', value: 'medium' },
                        { label: 'Alta', value: 'high' }
                    ]} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Data de Entrega"
                    name="dueDate">
                    <DatePicker />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Criar {/* or edit */}
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    );
};
