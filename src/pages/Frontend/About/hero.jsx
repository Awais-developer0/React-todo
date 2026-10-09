import { Col, Row, Typography } from 'antd'
const { Title } = Typography
const Hero = () => {
    return (
       <main>
         <div className="container d-flex justify-content-center align-items-center">
            <Row>
                <Col>
                    <Title level={1}>Todo-About</Title>
                </Col>
            </Row>
        </div>
       </main>
    )
}

export default Hero