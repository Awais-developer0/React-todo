import { Col, Row, Typography } from 'antd'
import { useAuth } from '../../../context/Auth'

const { Title } = Typography

const Hero = () => {
    const { user } = useAuth()
    return (

        <main>
            <div className="container flex-center">
                <Row>
                    <Col>
                        <Title level={1}>Todo-Home</Title>
                        <Title level={2}>Full Name:{user.fullName}</Title>
                        <Title level={2}>UID:{user.uid}</Title>
                        <Title level={2}>Email:{user.email}</Title>

                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default Hero