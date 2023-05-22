import {React} from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';

export default function NavigationBar() {
  
  const { user, setUser, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }

  const getUserDisplayName = () => {
    if (user.providerData && user.providerData[0].providerId === 'google.com') {
      const firstName = user.displayName.split(' ')[0] + ' ' + user.displayName.split(' ')[1];
      return firstName;
    
    } else if (user.providerData && user.providerData[0].providerId === 'facebook.com') {
      return user.displayName;
      
    } else {
      return user.displayName;
    }
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Container>
        <Navbar.Brand href="/"><img src="Logo.png" alt="Logo" className='navbar--logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid">
          <div className='pilihan'>
            {user ? 
              <div className="navbar--pilihan">
                <Nav.Link href="/explore"><span className='choice1'>Explore</span></Nav.Link>
                <Nav.Link href="/yoursession"><span className='choice2'>Your Session</span></Nav.Link>
              </div> :
              <div className="navbar--pilihan">
                <Nav.Link href="/login"><span className='choice1'>Become a Mentor</span></Nav.Link>
                <Nav.Link href="/login"><span className='choice2'>Find a Mentor</span></Nav.Link>
              </div>
              }
          </div>

          <div className='navbar--akun'>
          {user ? 
            <>
            <NavDropdown title = {getUserDisplayName()} id="basic-nav-dropdown" style={{fontSize:'20px', marginRight:'px'}} className="dropdown-menu-end/">
                <div className='navbar--drop'>
                  <NavDropdown.Item href="/" className='navbar--drop--item'>
                    <p >My Profile</p>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" className='navbar--drop--item'>
                    <p >Settings</p>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" className='navbar--drop--item'>
                    {user.role === 'mentee' ? <p>My Mentor</p> : <p>My Mentee</p>}
                  </NavDropdown.Item>
                  <NavDropdown.Item className='navbar--drop--item'>
                    <button onClick = {handleSignOut} className='navbar--signup--akun'>Sign Out</button>
                  </NavDropdown.Item>
                </div>
            </NavDropdown>
            </> : 
            
            <div className='navbar--button'>
                <a href="/login">
                  <button className='navbar--login'>Log In</button> 
                </a>

                <a href="/signup">
                <button className='navbar--signup'>Sign Up</button>
                </a>
            </div>
            }
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}