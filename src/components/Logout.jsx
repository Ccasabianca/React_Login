import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleLogout = async () => {
      try {
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
  });

  return null;
};

export default Logout;
