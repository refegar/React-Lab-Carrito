import { useEffect, useState } from "react"
import Formulario from "../../componets/Formulario"
import Tabla from "../../componets/Tabla"
import Arrayproductos from "../../constants/productos"  // 2. la llevamos al estado 1


const Carrito = () => {

  const [productos,setProductos]= useState(Arrayproductos)  /// 1. primer estado en crear
  const [productoEditar,setProductoEditar] = useState(null) //20.... y despues lo exortamos a formulario los dos 

 
//7 Cramos la fuction eliminar
const eliminarProducto = (id) =>{

console.log('Eliminando el producto', id)

////////////////////////////////// 8. filtrando logico eliminar
      console.log(`Se borro el producto ${id}`)
      const nuesEstadoProducto = productos.filter(producto=>producto.id !== id)
      setProductos(nuesEstadoProducto) // actualizamos el estado 
    
//////////////////////////////////
}

    const agregarProducto = (nuevoProducto) => {  // 10. 
      
       console.log('Agregando producto...',nuevoProducto)    // 12. -->> nos vamos a formulario
     nuevoProducto.id = Math.random() + Date.now()  //13. despues de venir de hacer paso 18 de formulario
     const nuevoEstadoProductos = [...productos,nuevoProducto]
      setProductos(nuevoEstadoProductos)

    }

    const editarProducto = (productoEditado) => {  // 11.

    // 19................
   const nuevoEstadoProducto = productos.map(producto => producto.id === productoEditado.id ? productoEditado: producto )
    setProductos(nuevoEstadoProducto)
    }
  return (
   <>
    <Formulario agregarProducto={agregarProducto} editarProducto={editarProducto}
    productoEditar={productoEditar}
     setProductoEditar={setProductoEditar} />
    <Tabla productos={productos} eliminarProducto={eliminarProducto} setProductoEditar={setProductoEditar}/> {/* 1. productos -> a Tabla */}
   </>

  )
}
export default Carrito