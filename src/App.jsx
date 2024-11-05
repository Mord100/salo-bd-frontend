import Home from "./pages/Home";
import ProviderController from "./providers/ProviderController";

export default function App() {
  return (
    <ProviderController>
      <div>
        <Home/>
      </div>
    </ProviderController>
  )
}