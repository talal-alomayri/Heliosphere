import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categories from "./pages/categories";
import SolarSystemCategories from "./solarSystem/pages/solarSystemCategories";
import BlackHoleInfoPage from "./blackHole/balckHoleInfoPage";
import SupernovaInfoPage from "./supernove/supernoveInofPage";

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
        <Route path="/blackHoleInfoPage" element={<BlackHoleInfoPage />} />
        <Route path="/supernovaInfoPage" element={<SupernovaInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
