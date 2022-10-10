import React, { useEffect, useState } from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';


const NavBar = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <div >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>

              {/*   <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}

            </Nav>
          </Navbar.Collapse>
          <Nav className="me-auto">
            {logged ? <>
              <NavDropdown title={`${JSON.parse(localStorage.getItem('user')).email}`} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/home"
                  onClick={() => {
                    localStorage.removeItem('user');
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </> :
              <Navbar.Text>
                <a href="/login">Login</a>
              </Navbar.Text>}
          </Nav>
        </Container>
      </Navbar >
    </div>
  );
}

export default NavBar;