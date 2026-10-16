import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Form, Input, Button, DatePicker, Select } from "antd"
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { useAuth } from '../../../context/Auth'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "" }

const Edit = () => {
    const navigate = useNavigate()
    const { isAuth, user } = useAuth()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const { id } = useParams()

    const handleChange = e => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos")) || []
        const todo = todos.find(item => String(item.id) === String(id))
        if (todo) {
            setState({
                title: todo.title || "",
                dueDate: todo.dueDate || "",
                description: todo.description || "",
                priority: todo.priority || "low"
            })
        } else {
            if (window.toastify) {
                window.toastify("Todo not found", "error")
            }
            navigate("/todos")
        }
    }, [id, navigate])

    const handleUpdateTodo = () => {
        const { title, dueDate, description, priority } = state || {}

        // Title validation
        if (!title || !title.trim()) {
            return window.toastify ? window.toastify("Please enter a title", "error") : alert("Please enter a title")
        }

        setIsProcessing(true)
        const todos = JSON.parse(localStorage.getItem("todos")) || []

        const updatedTodos = todos.map(item => {
            if (String(item.id) === String(id)) {
                return {
                    ...item,
                    title: title.trim(),
                    dueDate: dueDate || "",
                    description: (description || "").trim(),
                    priority: priority || "low"
                }
            }
            return item
        })

        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            setIsProcessing(false)
            if (window.toastify) {
                window.toastify("Todo updated successfully", "success")
            }
            navigate("/todos")
        }, 500)
    }

    return (
        <main className="auth flex-center">
            <div className="container">
                <div className="card mx-auto p-3">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <Title level={2} className="text-center">Edit Todo</Title>
                        <Button type='primary' onClick={() => { navigate("/todos") }}>All todos</Button>
                    </div>

                    <Form layout="vertical" onFinish={handleUpdateTodo}>

                        <Item label="Title">
                            <Input
                                type="text"
                                placeholder="Enter title"
                                name='title'
                                value={state?.title || ""}
                                onChange={handleChange}
                                required
                            />
                        </Item>

                        <Item label="Due Date">
                            <DatePicker
                                placeholder='Select due date'
                                className='w-100'
                                value={state?.dueDate ? dayjs(state.dueDate) : null}
                                onChange={(date, dateString) => setState(s => ({ ...s, dueDate: dateString }))}
                            />
                        </Item>

                        <Item label="Description">
                            <Input.TextArea
                                placeholder='Enter description'
                                name='description'
                                style={{ resize: "none" }}
                                rows={4}
                                value={state?.description || ""}
                                onChange={handleChange}
                            />
                        </Item>

                        <Item label="Priority">
                            <Select
                                placeholder="Select your priority"
                                value={state?.priority || undefined}
                                onChange={value => setState(s => ({ ...s, priority: value }))}
                            >
                                <Option value="low">Low</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="high">High</Option>
                            </Select>
                        </Item>

                        <Button
                            type='primary'
                            block
                            htmlType='submit'
                            loading={isProcessing}
                        >
                            Update Todo
                        </Button>

                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Edit