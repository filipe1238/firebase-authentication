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

              <NavDropdown disabled={!logged} title="Create data" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/newstudent">Create Student</NavDropdown.Item>
                {/*   <NavDropdown.Divider /> */}
                <NavDropdown.Item href="/createproduct">
                  Create Product
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link  disabled={!logged} href="/readdata">SearchData</Nav.Link>


            </Nav>
          </Navbar.Collapse>
          <Nav className="me-auto">
            {logged ? <>
              <NavDropdown title={`${JSON.parse(localStorage.getItem('user')).email}`} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/home"
                  onClick={() => {
                    localStorage.removeItem('user');
                  }}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </> : <>
              <Navbar.Text>
                <a href="/login" className=''>Login </a>
              </Navbar.Text>
              <Navbar.Text>
                <p className='ml-2 mr-2'>or</p>
              </Navbar.Text>
              <Navbar.Text>
                <a href="/createdata" className='text-nowrap'>Create Account</a>
              </Navbar.Text>
            </>}
          </Nav>
        </Container>
      </Navbar >
    </div>
  );
}

export default NavBar;