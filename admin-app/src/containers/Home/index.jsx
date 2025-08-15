import { useEffect } from 'react'
import Layout from "../../components/Layout"
import { Container, Row, Col } from 'react-bootstrap'
import "./style.css"



function Home() {


    return (
        <>
            <Layout>
                <Container fluid className='fs-5'>
                    <Row>
                        <Col md={2} className='sidebar'>Sidebar</Col>
                        <Col md={10} style={{ marginLeft: "auto" }}>Container</Col>
                    </Row>
                </Container>
            </Layout >
        </>
    )
}

export default Home