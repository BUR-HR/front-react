import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    
    useEffect(() => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/login");
    }, [])

    return;
};

export default Logout;
