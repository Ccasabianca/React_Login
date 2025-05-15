import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router";
import { logout } from "../store/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const isValidToken = auth && new Date(auth.expiresAt) > new Date();

    if (!isValidToken) {
      dispatch(logout());
      navigate("/connexion");
    }
  }, [auth, dispatch, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
