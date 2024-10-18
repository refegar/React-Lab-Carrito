import { useState } from "react"
import { useEffect } from "react"

const Formulario = ({agregarProducto,editarProducto,productoEditar,setProductoEditar}) => {

  const formInicial = {
    id:null,
    nombre:'',
    categoria:'',
    precio:''

  }

  const [form, setForm] = useState(formInicial)  /// revisar por component Reat

  useEffect(()=>{
    console.log('Cambio el producto a editar')
    productoEditar ? setForm(productoEditar) : setForm(formInicial) 
   console.log(form)
  },[productoEditar])
  

const handleChange = e =>{
//console.log(e.target.value) // verificar en consola si funciona
// haremos un metodo mira
const obj = {

  ...form, [e.target.name] : e.target.value  // la propiedad [e.target.name] pasa los datos a e.target.value
// ...form desglosando el objeto el state form
}
//console.log(obj) probamos
setForm(obj)
}

const handleSubmit = e => {
  e.preventDefault()
  console.log('Enviando el formulario....')
  //console.log(form)
  if(form.id===null){
    agregarProducto(form)
  }else{
    editarProducto(form)
  }
  handleReset() // Resetea el formulario después de enviar los datos
}

//////
//17...........

const handleReset = () =>{

  console.log('Resetear...')
  setForm(formInicial) // Resetea el formulario al valor inicial()
  setProductoEditar(null)
}
const cambiarTexto = (datoA,datoB)=>{
  return productoEditar ? datoA:datoB
}
  return (
    <>
<div className="pt-3 text-center">
<h2>Carrito de compra {cambiarTexto('Actualizar','Carga')} </h2>
  </div>
<form  className='border border-success rounded-3 w-50 px-5 py-5 m-auto mb-5 mt-4' onSubmit={handleSubmit}>
{/*Nombre*/}

<div className="mb-3">
  <label htmlFor="lbnombre" className="form-label">Producto</label>
  <input type="text" className="form-control" id="lbnombre" name ="nombre"
   placeholder="Ingrese el nombre" onChange={handleChange} value={form.nombre}/>
</div>

{/** Categoria */}
<div className="mb-3">
  <label htmlFor="lbcategoria" className="form-label">Categorias</label>
  <input type="text" className="form-control" id="lbcategoria" name ="categoria"
   placeholder="Ingrese la categoria" onChange={handleChange} value={form.categoria}/>
</div>
{/** Precio */}
<div className="mb-3">
  <label htmlFor="lbprecio" className="form-label">Precio</label>
  <input type="text" className="form-control" id="lbprecio" name ="precio" 
  placeholder="Ingrese el precio" onChange={handleChange} value={form.precio}/>
</div>

<div className="btn btn-danger m-2" onClick={handleReset}>Reset</div>
<input type="submit" className="btn btn-info" value={cambiarTexto('Actualizar','Agregar')} 

/>
</form>

</>
  )
}

export default Formulario