import React, { useState } from 'react'
import Layout from "../../components/Layout"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../components/UI'
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../actions'
import { Navigate } from 'react-router-dom'



function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    // const [error, setError] = useState("");
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const handleSubmitButton = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user))
    }
    if (auth.authenticate) {
        return <Navigate to={"/"} />

    }
    return (
        <>
            <Layout>
                <Container className='mt-5 fs-3'>
                    <Form onSubmit={handleSubmitButton}>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>




                    </Form>
                </Container>

            </Layout>
        </>
    )
}

export default Signin