import { Link, useNavigate } from 'react-router-dom'
import { Typography, Form, Input, Button, DatePicker, Select } from "antd"
import { useState } from 'react'
import { useAuth } from '../../../context/Auth'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

// 1. Sahi spellings ke sath initial state
const initialState = { title: "", dueDate: "", description: "", priority: "" }

const Add = () => {
    const navigate = useNavigate()
    // 2. 'user' yahan lana zaroori tha
    const { isAuth, user } = useAuth()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleAddTodo = () => {

        const { title, dueDate, description, priority } = state

        // Title validation
        if (!title.trim()) {
            return window.toastify("Please enter a title", "error")
        }

        setIsProcessing(true)
        const todos = JSON.parse(localStorage.getItem("todos")) || []

        const todo = {
            id: window.getRandomId ? window.getRandomId() : Date.now().toString(),
            title: title.trim(),
            dueDate,
            description: description.trim(),
            priority: priority || "low",
            status: "active",
            uid: user?.uid || "", // Safe navigation
            createdAt: new Date().getTime()
        }

        todos.push(todo)

        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(todos))
            setIsProcessing(false)
            setState(initialState) // Form reset ho gaya
            window.toastify("A new todo created successfully", "success")
            navigate("/todos") // List wale page par redirect
        }, 500)
    }

    return (
        <main className="auth flex-center">
            <div className="container">
                <div className="card mx-auto p-3">
                    <div className="d-flex align-items-cneter justify-content-between mb-4">
                        <Title level={2} className="text-center">Add Todo</Title>
                        <Button type='primary' onClick={() => { navigate("/todos") }}>All todos</Button>
                    </div>

                    <Form layout="vertical" onFinish={handleAddTodo}>

                        <Item label="Title">
                            <Input
                                type="text"

                                placeholder="Enter title"
                                name='title'
                                value={state.title}
                                onChange={handleChange}
                                required
                            />
                        </Item>

                        <Item label="Due Date">
                            <DatePicker
                                placeholder='Select due date'
                                className='w-100'

                                onChange={(date, dateString) => setState(s => ({ ...s, dueDate: dateString }))}
                            />
                        </Item>

                        <Item label="Description">
                            <Input.TextArea
                                placeholder='Enter description'
                                name='description'
                                style={{ resize: "none" }}
                                rows={4}
                                value={state.description}
                                onChange={handleChange}
                            />
                        </Item>

                        <Item label="Priority">
                            <Select
                                placeholder="Select your priority"

                                value={state.priority || undefined}
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
                            Add Todo
                        </Button>

                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Add