import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useMessage = () => {
    const showMessage = ({ message, type = "info" }) => {
        toast[type](message, {
            position: "top-right",
            autoClose: 3000, // Durée d'affichage en millisecondes
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    return { showMessage }
};

export default useMessage;
