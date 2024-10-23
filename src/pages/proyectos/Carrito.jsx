import { useEffect, useState } from "react"
import Formulario from "../../componets/Formulario"
import Tabla from "../../componets/Tabla"


const Carrito = () => {

  const [productos,setProductos]= useState(null)/// 1. primer estado en crear  
  const [productoEditar,setProductoEditar] = useState(null) //20.... y despues lo exortamos a formulario los dos 

 const url = 'https://s0e9kpe3e9.execute-api.sa-east-1.amazonaws.com/data-carrito/'

  useEffect(() => {
    getProductos()
    //
  }, [])  // recorda para llamar funcion
  
  
  const getProductos = async () => {
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

        setProductos(convertirAObjeto(prods));
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
  
  
    const eliminarProducto = async (id) =>{  // 5. pasamos a tabla
      
       console.log('Eliminando el producto', id)
    
       try{
         const urlEliminar = url+'eliminar-producto'
        const options = {
          method:'DELETE',
          body:JSON.stringify({id:id})
        }

        /** 1. peticines asincronica para eliminar */
    
        const respuesta = await fetch(urlEliminar,options)
    
        if(!respuesta.ok)  throw new Error('No se pudo eliminar', respuesta.status)
        
        /* 2. La eliminacion dentro del estado de react!*/ 
        //const nuevoEstadoProducto = productos.filter(prod => prod.id !== id)
        //setProductos(nuevoEstadoProducto)
        getProductos()
       }
       catch(error){
         console.error('Error al eliminar',error)
       }
    
    
      }
    
      const agregarProducto = async (nuevoProducto) => {  // 6. 
        console.log('Agregando el producto...')
  
        try{
    
          const options = {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({
            id: Math.floor(Date.now() / 1000),
            nombre: nuevoProducto.nombre,
            categoria: nuevoProducto.categoria,
            precio: nuevoProducto.precio,
          })// convienrte en un obj de js en string
          }
          // hacer peticion crear un  producto
         const respuesta = await fetch (url+'agregar-producto',options)
         if(!respuesta.ok){
          throw new Error('Ocurrio un error al crear el producto',respuesta.status)
         }
         const productoCreado = await respuesta.json()
         console.log(productoCreado)
         // modificar el estado productos agregado un nuevo elelmento dentro
          const nuevoEstadoProducto = [...productos,productoCreado]
          setProductos(nuevoEstadoProducto)
          getProductos()
        }catch(error){
    console.error('Error agregar producto',error)
        }
       
      }
  
      const editarProducto = async (productoEditado) => {  // 7.
        console.log('Editando el producto ', productoEditado);
    
        try {
          // Configuración para hacer la petición PUT
          const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              nombre: productoEditado.nombre,
              categoria: productoEditado.categoria,
              precio: productoEditado.precio,
              id: productoEditado.id
            })
          };
      
          // Verifica que la URL esté bien formada
          const urlEditado = url + 'editar-producto';
          //console.log("URL Editada:", urlEditado);
         /*
         Evita colisiones de nombres de variables
         Cuando usas una variable en el try y luego tratas de reasignarla dentro del mismo bloque (como productoEditado y 
         productoActualizado), puede causar confusión o errores. Siempre usa nombres claros y evita reutilizar el mismo nombre
         para diferentes cosas dentro del mismo contexto.
         
         */
          // Hacer la petición
          const respuesta = await fetch(urlEditado, options);
          
          if (!respuesta.ok) {
            throw new Error('Algo sucedió al querer editar el producto: ' + respuesta.status);
          }
      
          // Cambié el nombre para evitar la colisión de variables
          const productoActualizado = await respuesta.json();
          console.log("Producto editado correctamente:", productoActualizado);
      
          // Actualizamos el estado con el producto editado
          const nuevoEstadoProductos = productos.map(producto =>
            producto.id === productoActualizado.id ? productoActualizado : producto
          );
          setProductos(nuevoEstadoProductos);
          getProductos()
        } catch (error) {
          console.error('Error en la edición de productos:', error);
        }
      }
  return (
   <>
     <Formulario agregarProducto={agregarProducto} editarProducto={editarProducto}
     productoEditar={productoEditar}
     setProductoEditar={setProductoEditar} /> {/** 4. productos --> formulario  12. el setproductoeditar y productoeditar*/}
    <Tabla productos={productos} eliminarProducto={eliminarProducto} setProductoEditar={setProductoEditar}/>
   </>

  )
}
export default Carrito