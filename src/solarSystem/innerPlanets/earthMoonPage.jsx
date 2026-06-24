import { useNavigate } from "react-router-dom"



export default function EarthMoonPage() {
  const navigate = useNavigate()
  return (
    <div>
      <img src="/src/assets/images/inner-planets-background-pixel.png" alt=" planet-earth-pixel" />

      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/earth')}
      >
        <h1>Earth</h1>
        <img src="/src/assets/images/planet-earth-alone-pixel.png" alt=" planet-earth-pixel" />
      </button>

      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/moon')}
      >
        <h1>Moon</h1>
        <img src="/src/assets/images/moon-pixel.png" alt=" planet-earth-pixel" />
      </button>
    </div>
  )
}