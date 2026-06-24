
import { useNavigate } from 'react-router-dom';



export default function SolarSystemCategories() {
  const navigate = useNavigate();

  return (
    <div>
      <button
      onClick={() => navigate('/solarSystem/sunPage')}>
      <h1>Sun</h1>
      <img src="/src/assets/images/sun-pixel.png" alt=" sun-pixel" />
      </button>
      <button
      onClick={() => navigate('/solarSystem/innerPlanetsPage')}>
      <h1>Inner Planets</h1>
      <img src="/src/assets/images/inner-planets-pixel.png" alt=" inner-planets-pixel" />
      </button>
      <button
      onClick={() => navigate('/solarSystem/outerPlanetsPage')}>
        <h1>Outer Planets</h1>
        <img src="/src/assets/images/outer-planets-pixel.png" alt=" outer-planets-pixel"/>
      </button>
    </div>
  )
}