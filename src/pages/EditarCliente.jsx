/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import { useNavigate, useActionData, useLoaderData, Form, redirect } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { obtenerClienteId, editarCliente } from "../data/clientes";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({params}) => {

    const cliente = await obtenerClienteId(params.clienteId)
    
    if(Object.values(cliente).length === 0 ) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados en tu búsqueda',
        });
    }

    return cliente;
}

export const action = async ({request, params}) => {
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
    await editarCliente(params.clienteId ,datos);

    return redirect('/');
}

const EditarCliente = () => {

    const navigate = useNavigate();
    const errores = useActionData();
    const cliente = useLoaderData();


    return (
        <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p className="mt-3">Aquí podemos editar los datos del cliente</p>

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
            <Formulario 
                cliente={cliente}
            />
            <input 
                type="submit" 
                value="Editar Cliente" 
                className="mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg hover:bg-blue-900 rounded-md p-2 cursor-pointer"
            />
            </Form>
        </div>
        </>
    )
}

export default EditarCliente