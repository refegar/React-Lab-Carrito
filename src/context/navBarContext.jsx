import { createContext, useEffect, useState } from "react";

const NavBarContext = createContext();

const NavBarProvider = ({children}) => {
  const [productoComprado, setProductoComprado] = useState(null);
  const [cantidadComprados, setCantidadComprados] = useState(0);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('carritoCompras')) || [];
    setProductoComprado(productosGuardados);
    setCantidadComprados(Array.isArray(productosGuardados) ? productosGuardados.length : 0);
  }, []);

  const data = {
    productoComprado,
    setProductoComprado,
    cantidadComprados,
    setCantidadComprados
  };

  return <NavBarContext.Provider value={data}>{children}</NavBarContext.Provider>
};

export { NavBarProvider };

export default NavBarContext;
