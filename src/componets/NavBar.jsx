import { useContext, useEffect, useState } from "react";
import MenuItems from "./MenuItems"
import navBarContext from "../context/navBarContext";

const NavBar = () => {
const {productoComprado,setProductoComprado,cantidadComprados,setCantidadComprados,productosGuardados} = useContext(navBarContext)
console.log(productosGuardados)
  return (
   <>

<nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand roboto-black fs-3 pe-2 ps-4" href="#">React!</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <MenuItems />

            {/* Carrito de compras */}
            <div className="ms-auto pe-4">

            <button
                type="button"
                className="btn btn-light position-relative"
                data-bs-toggle="modal"
                data-bs-target="#carritoModal"
              >
                <svg viewBox="0 0 576 512" width="20" height="20">
                  <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadComprados }
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
   
   {/* Modal que muestra el producto comprado */}
   <div className="modal fade mt-5" id="carritoModal" tabIndex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="carritoModalLabel">Productos Comprados</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {productoComprado ? productoComprado.map((producto,idx)=>(
               
                 <div key={idx}>
                  <h3>Producto comprado ID: {idx}</h3>
                  <p><strong>Nombre:</strong> {producto.nombre}</p>
                  <p><strong>Categoría:</strong> {producto.categoria}</p>
                  <p><strong>Precio:</strong> {producto.precio}</p>
                  <hr />
                </div>
           
             ) ) : (
                <p>No hay productos comprados.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
   </>   
  )
}

export default NavBar