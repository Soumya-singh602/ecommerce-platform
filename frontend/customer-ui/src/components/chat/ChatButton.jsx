import { useNavigate } from "react-router-dom";


export default function ChatButton(){

    const navigate = useNavigate();


    return (

        <button
            onClick={() => navigate("/chat")}
        >
            💬
        </button>

    );
}