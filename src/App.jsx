import NavBar from "./componets/NavBar"
import { Routes,Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Carrito from "./pages/proyectos/Carrito"
import { NavBarProvider } from "./context/navBarContext"

const App = () => {
  return (

    <NavBarProvider>
    <NavBar />
    <div className="container mt-3 bg-light ">
     <Routes>
     <Route path="/" element={<Inicio/>}/>
     <Route path="/Carrito" element={<Carrito/>}/>
    </Routes>
    </div>
    </NavBarProvider>
  
  )
}

export default App