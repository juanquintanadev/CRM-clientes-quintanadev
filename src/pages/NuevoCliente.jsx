/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
/* eslint-disable react-refresh/only-export-components */

import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export const action = async ({request}) => {
  // console.log('submit al formulario')
  // console.log(request)

  const formData = await request.formData()

  const datos = Object.fromEntries(formData);

  const email = formData.get('email');

  // console.log(email);

  // validacion
  const errores = [];
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  // console.log(errores);

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)) {
    errores.push('El email no es válido')
  }

  // retornar datos si hay errores
  if(Object.keys(errores).length) {
    // console.log('Si hay errores')
    // console.log(Object.keys(errores))
    return errores
  }

  // ponemos el await para que no se ejecute lo siguiente hasta que se guarden los datos
  // con esto cerramos el action guardando los datos y retornamos un redirect a la pagina principal
  await agregarCliente(datos);

  return redirect('/');
}

const NuevoCliente = () => {

  const navigate = useNavigate();
  const errores = useActionData();

  // console.log(errores)

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para cargarlos en la base de datos</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-3 rounded-md hover:bg-blue-900 uppercase"
          type="button"
          onClick={() => navigate('/')}
        >Volver</button>
      </div>

      <div className="mt-10 bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">

        {errores?.length && errores.map((error, i) => 
          <Error key={i}>{error}</Error>
        )}

        <Form 
          method="post"
          noValidate
        >
          <Formulario />
          <input 
            type="submit" 
            value="Agregar Cliente" 
            className="mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg hover:bg-blue-900 rounded-md p-2 cursor-pointer"
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente