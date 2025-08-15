import React, { useState } from 'react'
import Layout from "../../components/Layout"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../components/UI'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signup } from '../../actions/user.action'


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const auth = useSelector(state => state.auth)
    const userMessage = useSelector(state => state.user)
    const dispatch = useDispatch();

    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        dispatch(signup(user))
        console.log(user)

    }


    if (auth.authenticate) {
        return <Navigate to={"/"} />

    }
    return (
        <>
            <Layout>
                <Container className='mt-5 fs-3'>
                    <Form onSubmit={registerUser}>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Row>
                                    <Col>
                                        <Input
                                            label="FirstName"
                                            placeholder="FirstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            label="LastName"
                                            placeholder="LastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
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
                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>
                            </Col>
                        </Row>




                    </Form>
                </Container>
                {userMessage.message && (
                    <div className="alert alert-success">{userMessage.message}</div>
                )}
                {userMessage.error && (
                    <div className="alert alert-danger">{userMessage.error}</div>
                )}
            </Layout>
        </>
    )
}

export default Signup