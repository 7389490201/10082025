import React from 'react'
import Header from "../Header/index"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./style.css"

function Layout(props) {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid className='fs-5'>
                        <Row>
                            <Col md={2} className='sidebar'>
                                <ul>
                                    <li> <Link to={"/"}>Home</Link></li>
                                    <li> <Link to={"/category"}>Category</Link></li>
                                    <li> <Link to={"/products"}>products</Link></li>
                                    <li> <Link to={"/orders"}>orders</Link></li>

                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: "auto" }}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children

            }

        </>
    )
}

export default Layout