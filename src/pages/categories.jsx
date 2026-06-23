import { useNavigate } from "react-router-dom";
import SolarSystemCard from "../component/solarSystemCard"
import BlackHoleCard from "../blackHole/blackHoleCard"
import SupernovaCard from "../supernove/supernoveCard"



export default function Categories() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Categories</h1>

      <div>
      <button onClick={() => navigate("/SolarSystemCategories")}>
      <SolarSystemCard />
      </button>
      </div>

      <div>
        <button onClick={() => navigate("/blackHoleInfoPage")}>
        <BlackHoleCard />
        </button>
      </div>

      <div>
        <button onClick={() => navigate("/supernovaInfoPage")}>
        <SupernovaCard />
        </button>
      </div>
    </div>
  )
}

