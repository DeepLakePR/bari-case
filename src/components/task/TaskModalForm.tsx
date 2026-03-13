"use client";

import { DatePicker, Flex, Form, Input, Modal, Select } from "antd";
import { useEffect, useMemo } from "react";

import type { Dayjs } from "dayjs";
import type { TaskInput } from "@/hooks/useTasks";
import type { Task } from "@/types/task";
import dayjs from "dayjs";

type FieldType = {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    dueDate?: Dayjs | null;
};

export type TaskModalFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (data: TaskInput) => Promise<boolean>;
    onUpdate: (data: TaskInput) => Promise<boolean>;
    task: Task | null;
};

export default function TaskModalForm({
    open,
    onOpenChange,
    onCreate,
    onUpdate,
    task,
}: TaskModalFormProps) {
    const [form] = Form.useForm<FieldType>();
    const isEditing = Boolean(task);

    const initialValues = useMemo<Partial<FieldType>>(
        () => ({
            title: task?.title ?? "",
            description: task?.description ?? "",
            priority: task?.priority ?? "low",
            dueDate: task?.dueDate ? dayjs(task.dueDate) : null,
        }),
        [task]
    );

    useEffect(() => {
        if (!open) {
            form.resetFields();
            return;
        }

        form.setFieldsValue(initialValues);
    }, [form, initialValues, open]);

    const handleSubmit = () => {
        form.submit();
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Modal
            title={(!isEditing ? "Criar" : "Editar") + " Tarefa"}
            closable={{ "aria-label": "Cancelar" }}
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={!isEditing ? "Criar" : "Salvar"}
            cancelText="Cancelar"
        >
            <Form<FieldType>
                form={form}
                name="task"
                initialValues={initialValues}
                layout="vertical"
                onFinish={(data) => {
                    const payload: TaskInput = {
                        id: task?.id,
                        title: data.title,
                        description: data.description,
                        priority: data.priority,
                        dueDate: data.dueDate ? data.dueDate.format("YYYY-MM-DD") : "",
                    };

                    if (isEditing) {
                        onUpdate(payload);
                    } else {
                        onCreate(payload);
                    }
                    onOpenChange(false);
                }}
                autoComplete="on"
            >
                <Form.Item<FieldType>
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: "Insira um título.", min: 3 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Descrição" name="description">
                    <Input />
                </Form.Item>

                <Flex justify="space-between">
                    <Form.Item<FieldType>
                        label="Prioridade"
                        name="priority"
                        rules={[{ required: true, message: "Defina uma prioridade." }]}
                        className="w-50"
                    >
                        <Select
                            options={[
                                { label: "Baixa", value: "low" },
                                { label: "Média", value: "medium" },
                                { label: "Alta", value: "high" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType> 
                        label="Data de entrega" 
                        name="dueDate"
                        className="w-50">
                        <DatePicker className="w-full" placeholder="Selecione uma data" />
                    </Form.Item>
                </Flex>

            </Form>
        </Modal>
    );
}
