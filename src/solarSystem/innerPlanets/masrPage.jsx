
import { useNavigate } from 'react-router-dom';




export default function MarsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Mars</h1>
      <img src="/src/assets/images/planet-mars-info-pixel.webp" alt=" planet-mars-info-pixel" />
    </div>
  )
}