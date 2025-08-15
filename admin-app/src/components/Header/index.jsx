import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { signout } from "../../actions/auth.actions"

function Header() {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav className="ms-auto">
                <Nav.Link as={Link} to={"/signin"}>Signin</Nav.Link>
                <Nav.Link as={Link} to={"/signup"}>Signup</Nav.Link>
            </Nav>
        )
    }
    const renderLoggedInLinks = () => {
        return (
            <Nav className="ms-auto">
                <Button onClick={logout}>SignOut</Button>
            </Nav>
        )
    }


    return (
        <>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary fs-4" style={{ zIndex: 1 }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to={"/"} className="fs-3">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header