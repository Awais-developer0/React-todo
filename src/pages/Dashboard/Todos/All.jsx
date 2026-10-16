import { Button, Space, Table, Typography } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons"
import { Dropdown } from "antd/es"
import { useAuth } from "../../../context/Auth"
const { Title, Text } = Typography
const All = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [todos, setTodos] = useState([])
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        if (todos) (setTodos(todos.filter(todo => todo.uid === user?.uid).map(todo => ({ ...todo, key: todo.id }))))
    }, [user?.uid])

    const handleDelete = todo => {
        const filteredTodos = todos.filter(item => item.id !== todo.id)
        setTodos(filteredTodos)
        const allTodos = JSON.parse(localStorage.getItem("todos")) || []
        localStorage.setItem("todos", JSON.stringify(allTodos.filter(item => item.id !== todo.id)))
        window.toastify("Todo deleted successfully", "success")
    }
    const columns = [
        { title: "Title", dataIndex: "title" },
        { title: "Due Date", dataIndex: "dueDate" },
        { title: "Description", dataIndex: "description" },
        { title: "priority", dataIndex: "priority", render: text => <Text className="text-capitalize">{text}</Text> },
        { title: "Created At", dataIndex: "createdAt", render: text => <Text className="text-capitalize">{dayjs(text).format("ddd DD-MMM-YY,hh:mm:ss A")}</Text> },
        {
            title: "Action",
            render: (_, record) => (
                <Dropdown menu={{
                    items: [
                        { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { navigate(`/todos/edit/${record.id}`) } },
                        { label: "Delete", key: "delete", icon: <DeleteOutlined />, onClick: () => handleDelete(record) }
                    ]
                }} trigger={["click"]} >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];
    return (
        <main className="py-5">
            <div className="container d-flex align-items-center justify-content-between mb-4">
                <Title level={2} className="text-center">Todos</Title>
                <Space>
                    <Button type='primary' onClick={() => { navigate("/todos/add") }}>Add todos</Button>
                    <Button type='primary' onClick={() => { navigate("/") }}>Home</Button>
                </Space>
            </div>
            <div className="container">
                <Table columns={columns} dataSource={todos} />
            </div>

        </main>
    )
}

export default All