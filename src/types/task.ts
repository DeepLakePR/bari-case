export type Task = {
    id: string
    title: string
    description?: string
    priority: "high" | "medium" | "low"
    dueDate: string
    done: boolean
}
