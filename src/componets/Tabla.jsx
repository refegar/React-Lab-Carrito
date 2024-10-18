import {  useContext, useEffect, useState } from "react";
import TablaFila from "./TablaFila";
import WaitSpinner from "./WaitSpinner";
import Swal from 'sweetalert2';
import NavBarContext from "../context/navBarContext";


const Tabla = ({ productos, eliminarProducto, setProductoEditar }) => {

  const [modalProducto, setModalProducto] = useState(null);
  const {setCantidadComprados,setProductoComprado} = useContext(NavBarContext)
  

  const agregarProductoAlCarrito = (producto) => {
    // 1. Recuperar el array de productos del localStorage o crear uno vacío si no existe.
    let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
  
    // 2. Agregar el nuevo producto al array de carrito.
    carrito.push(producto);
    setProductoComprado(carrito)
    setCantidadComprados(Array.isArray(carrito) ? carrito.length : 0);
    // 3. Guardar el array actualizado en el localStorage.
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
  
    // 4. Mostrar un mensaje de éxito (opcional).
    Swal.fire({
      title: "Producto añadido al carrito",
      text: `${producto.nombre} ha sido añadido correctamente.`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  };
  

  const handleBtnComprar = (producto) => {
    setModalProducto(producto);
    // Espera a que el modal se haya actualizado en el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('comprarModal');
      const modalBootstrap = new window.bootstrap.Modal(modalElement);
      modalBootstrap.show();
    }, 0);}
  return (
    <>
   

      <div className="text-center mb-3">Productos ala venta</div>
      {productos ? (
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              // Short-circuit operator && se ejecuta si productos es true
              productos.map((producto, idx) => (
                <TablaFila
                  key={idx} // 1
                  productos={producto} // 2. Pasamos producto a TablaFila
                  eliminarProducto={eliminarProducto}
                  setProductoEditar={setProductoEditar}
                  setModalProducto={setModalProducto}
                  handleBtnComprar={handleBtnComprar}
                />
              ))
            }
          </tbody>
        </table>
      ) : (
        <WaitSpinner />
      )}

        {/* Modal needs to be rendered outside of the table */}
        {modalProducto && (
        <div className="modal fade" id="comprarModal" tabIndex="-1" aria-labelledby="comprarModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="comprarModalLabel">Detalles de la factura</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p><strong>Producto:</strong> {modalProducto.nombre}</p>
                <p><strong>Categoría:</strong> {modalProducto.categoria}</p>
                <p><strong>Precio:</strong> {modalProducto.precio}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                  localStorage.setItem('productoComprado', JSON.stringify(modalProducto));
                  agregarProductoAlCarrito(modalProducto)
                  //Localizacion de localstore
                  Swal.fire("Gracias por su compra", "El producto ha sido guardado", "success");
                  const modalElement = document.getElementById('comprarModal');
                  const modalBootstrap = window.bootstrap.Modal.getInstance(modalElement);
                  modalBootstrap.hide();  // Cierra el modal
                }}>Confirmar compra</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
};

export default Tabla;
