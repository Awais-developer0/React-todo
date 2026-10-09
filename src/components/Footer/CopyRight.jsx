import { Row,Col, Typography } from 'antd'
import React from 'react'
const { Paragraph } = Typography
const CopyRight = () => {
    const year = new Date().getFullYear()

    return (
       <div className="bg-primary">
         <div className="container">
            <Row>
                <Col span={24} className=''> 
                    <Paragraph className='text-center py-2 mb-0 text-white'>&copy;{year} All Right Reserved.</Paragraph>
                </Col>
            </Row>
        </div>
       </div>
    )
}

export default CopyRight