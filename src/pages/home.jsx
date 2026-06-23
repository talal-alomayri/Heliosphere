import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();


return(
    <div className="">
         <h1>Heliosphere</h1>

         <button onClick={() => navigate("/categories")}>Explore</button>

         <img src="/src/assets/images/sky-night-pixel.png" alt=" sky-night-pixel" />
    </div>
)

}