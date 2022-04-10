import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import {Link} from 'react-router-dom'
import { LogOutAction } from '../redux/actionMethodes/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default () => {
  let navigate = useNavigate();

  const dispatch=useDispatch();
  
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/The_Project_logo.svg/1200px-The_Project_logo.svg.png"} className="logo-m"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Logo</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/dashboard/projects/all" className="nav-link">Projects</Link>
              <Link to="/dashboard/projects/archived" className="nav-link">Archived Projects</Link>
              <Link to="/dashboard/projects/completed" className="nav-link">Completed Projects</Link>
              <Link to="/dashboard/new" className="nav-link">Add Project</Link>
              
              
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(LogOutAction());
                  navigate(`/`);
                }}
              >
                Log Out
              </button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
