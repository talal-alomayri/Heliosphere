import { useNavigate } from 'react-router-dom';


export default function InnerPlanetsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Inner Planets</h1>
      <img src="/src/assets/images/inner-planets-background-pixel.png" alt=" inner-planets" />

      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/mercury')
        }>
        <h2>Mercury</h2>
        <img src="/src/assets/images/planet-mercury-alone-pixel.png" alt=" mercury-alone-pixel" />
      </button>
      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/venus')
        }>
        <h2>Venus</h2>
        <img src="/src/assets/images/planet-venus-alone-pixel.png" alt=" venus-alone-pixel" />
      </button>
      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/earthMoon')
        }>
        <h2>Earth</h2>
        <img src="/src/assets/images/planet-earth-alone-pixel.png" alt=" earth-alone-pixel" />
      </button>
      <button
        onClick={() => navigate('/solarSystem/innerPlanetsPage/mars')
        }>
        <h2>Mars</h2>
        <img src="/src/assets/images/planet-mars-alone-pixel.png" alt=" mars-alone-pixel" />
      </button>
    </div>
  )
}