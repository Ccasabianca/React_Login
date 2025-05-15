import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        dispatch(logout());

        navigate("/connexion");
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
