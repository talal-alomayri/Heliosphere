import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import Categories from "./pages/categories";
import SolarSystemCategories from "./solarSystem/pages/solarSystemCategories";
import SunPage from "./solarSystem/pages/sunPage";
import AsteroidBeltPage from "./solarSystem/pages/asteroidBeltPage";
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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SpaceDashboard from './components/SpaceDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route
                path="/SolarSystemCategories"
                element={<SolarSystemCategories />}
              />
              <Route path="/solarSystem/sunPage" element={<SunPage />} />
              <Route path="/solarSystem/asteroidBeltPage" element={<AsteroidBeltPage />} />
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
              <Route path="/dashboard" element={<SpaceDashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
    </QueryClientProvider>
  );
}

export default App;
