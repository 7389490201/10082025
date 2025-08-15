import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Input = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <Form.Text className="text-muted">
                {props.error}
            </Form.Text>
        </Form.Group>
    );
};


export default Input