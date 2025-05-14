import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Layout = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && new Date(auth.expiresAt) > new Date();
  };
  useEffect(() => {
    setIsLoggedIn(checkAuth());

    const updateAuth = () => setIsLoggedIn(checkAuth());

    window.addEventListener("authChanged", updateAuth);
    
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Container className="my-3">
          <Outlet />
        </Container>
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
