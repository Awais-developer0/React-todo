import { message } from "antd";

window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
window.toastify = (msg, type) => message[type](msg)
window.isValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(email || '').trim())