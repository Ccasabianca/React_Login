import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("auth");

      navigate("/connexion");
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
