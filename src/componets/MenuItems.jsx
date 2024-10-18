import { NavLink } from "react-router-dom"
import itemsProyects from "../constants/itemsProyects"
import MenuItemsNav from "../constants/MenuItemsNav"

const MenuItems = () => {

    const cambioColor = {
       isActive: ({isActive})=>(isActive ? {color:'#ffac78'}:{color:'#fff'})
    }
     
    

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 roboto-light">

   {
    MenuItemsNav.map((menu,idx)=>(
 
        <li className="nav-item" key={idx}>
        <NavLink className="nav-link" aria-current="page" to={menu.Ruta}
        // Recordemos siempre Combinar el estilo de ambas funciones con el operador spread
        style={cambioColor.isActive}
        >{menu.nombre}</NavLink>
        </li>
    
    ))
   }
    <li className="nav-item dropdown">
      <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"
       style={cambioColor.isActive}
      >
        Laboratorios
      </NavLink>
      <ul className="dropdown-menu">

        {
            itemsProyects.map((proyecto)=>(
                <li key={proyecto.id}><NavLink  className="dropdown-item" to={proyecto.ruta}>{proyecto.nombre}</NavLink></li>
            ))
        }
       
      </ul>
    </li>

  </ul>
  )
}

export default MenuItems