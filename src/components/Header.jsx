import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

function Header() {
  const location = useLocation();
  
  const getValidToken = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && new Date(auth.expiresAt) > new Date() ? auth.token : null;
  };

  const [token, setToken] = useState(getValidToken());

  useEffect(() => {
    setToken(getValidToken());
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setToken(null);
  };

  return (
    <Navbar bg="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          {token && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">
              Offres Professionnelles
            </Nav.Link>
          )}
          {!token ? (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/deconnexion" onClick={handleLogout}>
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
