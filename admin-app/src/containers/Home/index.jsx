import Layout from "../../components/Layout"
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import "./style.css"



function Home() {


    return (
        <>
            <Layout sidebar>
                <Container fluid className='fs-5'>
                    <Row>
                        <Col md={2} className='sidebar'>
                            <ul>
                                <li> <Link to={"/"}>Home</Link></li>
                                <li> <Link to={"/products"}>products</Link></li>
                                <li> <Link to={"/orders"}>orders</Link></li>

                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft: "auto" }}>Container</Col>
                    </Row>
                </Container>
            </Layout >
        </>
    )
}

export default Home