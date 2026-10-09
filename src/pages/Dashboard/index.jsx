import { Col, Row, Typography } from 'antd'
import React from 'react'

const Dashboard = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Row>
                <Col span={24}>
                    <Typography.Title>Todo-Dashboard</Typography.Title>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard