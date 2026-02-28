import { Navbar, Container, Nav } from 'react-bootstrap';
import { FiPackage } from 'react-icons/fi';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow" >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <FiPackage size={28} />
          <span className="fw-bold fs-4">StockCRUD</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Início</Nav.Link>
            <Nav.Link href="#">Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}