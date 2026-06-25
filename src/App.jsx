import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categories from "./pages/categories";
import SolarSystemCategories from "./solarSystem/pages/solarSystemCategories";
import SunPage from "./solarSystem/pages/sunPage";
import InnerPlanetsPage from "./solarSystem/innerPlanets/innerPlanetsPage";
import OuterPlanetsPage from "./solarSystem/outerPlanets/outerPlanetsPage";
import MercuryPage from "./solarSystem/innerPlanets/mercuryPage";
import VenusPage from "./solarSystem/innerPlanets/venusPage";
import EarthPage from "./solarSystem/innerPlanets/earthPage";
import MoonPage from "./solarSystem/innerPlanets/moonPage";
import MarsPage from "./solarSystem/innerPlanets/marsPage";
import EarthMoonPage from "./solarSystem/innerPlanets/earthMoonPage";
import JupiterPage from "./solarSystem/outerPlanets/jupiterPage";
import SaturnPage from "./solarSystem/outerPlanets/saturnPage";
import UranusPage from "./solarSystem/outerPlanets/uranusPage";
import NeptunePage from "./solarSystem/outerPlanets/neptunePage";
import BlackHoleInfoPage from "./blackHole/blackHoleInfoPage";
import SupernovaInfoPage from "./supernove/supernovaInfoPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/SolarSystemCategories"
          element={<SolarSystemCategories />}
        />
        <Route path="/solarSystem/sunPage" element={<SunPage />} />
        <Route path="/solarSystem/innerPlanetsPage" element={<InnerPlanetsPage />} />
        <Route path="/solarSystem/innerPlanetsPage/mercury" element={<MercuryPage />} />
        <Route path="/solarSystem/innerPlanetsPage/venus" element={<VenusPage />} />
        <Route path="/solarSystem/innerPlanetsPage/earth" element={<EarthPage />} />
        <Route path="/solarSystem/innerPlanetsPage/mars" element={<MarsPage />} />
        <Route path="/solarSystem/innerPlanetsPage/moon" element={<MoonPage />} />
        <Route path="/solarSystem/innerPlanetsPage/earthMoon" element={<EarthMoonPage />} />
        <Route path="/solarSystem/outerPlanetsPage/jupiter" element={<JupiterPage />} />
        <Route path="/solarSystem/outerPlanetsPage/saturn" element={<SaturnPage />} />
        <Route path="/solarSystem/outerPlanetsPage/uranus" element={<UranusPage />} />
        <Route path="/solarSystem/outerPlanetsPage/neptune" element={<NeptunePage />} />
        <Route path="/solarSystem/outerPlanetsPage" element={<OuterPlanetsPage />} />
        <Route path="/blackHoleInfoPage" element={<BlackHoleInfoPage />} />
        <Route path="/supernovaInfoPage" element={<SupernovaInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
