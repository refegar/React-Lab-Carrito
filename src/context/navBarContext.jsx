import { createContext, useEffect, useState } from "react";

const NavBarContext = createContext();
 const url = 'https://s0e9kpe3e9.execute-api.sa-east-1.amazonaws.com/data-carrito/productos-comprados'
const NavBarProvider = ({children}) => {
  const [productoComprado, setProductoComprado] = useState(null);
  const [cantidadComprados, setCantidadComprados] = useState(null);

  useEffect(() => {
    getCompras()
   // const productosGuardados = JSON.parse(localStorage.getItem('carritoCompras')) || [];
   // setProductoComprado(productosGuardados);
  
  }, []);

  const getCompras = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }}
    try {
        const respuesta = await fetch(url,options);
        
        if (!respuesta.ok) {
            throw new Error(`Ocurrió un error: ${respuesta.status}`);
        }
        
        const data = await respuesta.json(); // Esto ya es un objeto
        const prods = JSON.parse(data.body); // Asegúrate de que esto sea necesario
        setProductoComprado(convertirAObjeto(prods))
        setCantidadComprados(Array.isArray(convertirAObjeto(prods)) ? convertirAObjeto(prods).length : 0);
    } catch (error) {
        console.error('[getProductos]', error); // Cambié Error a error
    }
};
const convertirAObjeto = (productosArray) => {
  return productosArray.map((producto) => {
      return {
          id: producto[0],
          nombre: producto[1],
          categoria: producto[2],
          precio: producto[3]
      }
  });
  
}

  const data = {
    productoComprado,
    setProductoComprado,
    cantidadComprados,
    setCantidadComprados,
    getCompras
  };

  return <NavBarContext.Provider value={data}>{children}</NavBarContext.Provider>
};

export { NavBarProvider };

export default NavBarContext;
