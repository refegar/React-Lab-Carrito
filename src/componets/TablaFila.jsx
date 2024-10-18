import Swal from 'sweetalert2';


const TablaFila = ({ productos, eliminarProducto, setProductoEditar,handleBtnComprar }) => {
  


  const handleEliminarproducto = (id) => {
    Swal.fire({
      title: "¿Está seguro de querer eliminar? " + id,
      text: "¡Cuidado, no se puede revertir la acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id);
        Swal.fire("Borrado!", "Su registro fue borrado.", "success");
      } else {
        Swal.fire("No borrado!", "Su registro no fue borrado.", "info");
      }
    });
  };

  const handleBtnEditar = (producto) => {
    setProductoEditar(producto);
  };

  return (
    <>
      <tr>
        <th scope="row">{productos.nombre}</th>
        <td>{productos.categoria}</td>
        <td>{productos.precio}</td>
        <td>
          <button className="btn btn-info m-1" onClick={() => handleBtnComprar(productos)}>Comprar</button>
          <button className="btn btn-warning m-1" onClick={() => handleBtnEditar(productos)}>Editar</button>
          <button className="btn btn-danger m-1" onClick={() => handleEliminarproducto(productos.id)}>Borrar</button>
        </td>
      </tr>
    </>
  );
};

export default TablaFila;
