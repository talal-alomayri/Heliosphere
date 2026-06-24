import { useNavigate } from "react-router-dom"


export default function OuterPlanetsPage() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Outer Planets</h1>
      <img
        src="/src/assets/images/inner-planets-background-pixel.png"
        alt=" outer-planets"
      />

      <button
        onClick={() => navigate('/solarSystem/outerPlanetsPage/jupiter')}
      >
        <h2>Jupiter</h2>
        <img
          src="/src/assets/images/planet-jupiter-alone-pixel.png"
          alt=" planet-jupiter-alone-pixel"
        />
      </button>
      <button
        onClick={() => navigate('/solarSystem/outerPlanetsPage/saturn')}
      >
        <h2>Saturn</h2>
        <img
          src="/src/assets/images/planet-saturn-alone-pixel.png"
          alt=" planet-saturn-alone-pixel"
        />
      </button>
      <button
        onClick={() => navigate('/solarSystem/outerPlanetsPage/uranus')}
      >
        <h2>Uranus</h2>
        <img
          src="/src/assets/images/planet-uranus-alone-pixel.png"
          alt=" planet-uranus-alone-pixel"
        />
      </button>
      <button
        onClick={() => navigate('/solarSystem/outerPlanetsPage/neptune')}
      >
        <h2>Neptune</h2>
        <img
          src="/src/assets/images/planet-neptune-alone-pixel.png"
          alt=" planet-neptune-alone-pixel"
        />
      </button>
    </div>
  );
}
