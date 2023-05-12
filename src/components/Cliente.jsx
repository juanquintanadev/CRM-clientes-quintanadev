/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useNavigate, Form, redirect } from "react-router-dom";

import { eliminarCliente } from "../data/clientes";

export async function action({params}) {

    await eliminarCliente(params.clienteId)

    return redirect('/')
}

function Cliente({cliente}) {

    const navigate = useNavigate();

    const {nombre, empresa, email, id, telefono} = cliente;

    return (
        <tr className="border-b">
            <td className="p-2 text-center space-y-1">
                <p className="text-2xl font-bold">{nombre}</p>
                <p><span className="font-bold">Empresa: </span>{empresa}</p>
            </td>
            <td className="py-2">
                <p className="text-gray-600"><span className="text-black font-bold text-xl">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-black font-bold text-xl">Telefono: </span>{telefono}</p>
            </td>
            <td className="p-2 flex gap-2">
                <button 
                    type="button" 
                    className="uppercase text-blue-700 hover:text-blue-800 font-bold"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >Editar</button>
                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={e => {
                        if(!confirm('¿Desea eliminar este usuario?')) {
                            e.preventDefault()
                        }
                    }}
                >
                    <button 
                        type="submit" 
                        className="uppercase text-red-700 hover:text-red-800 font-bold"
                    >Eliminar</button>
                </Form>
            </td>
        </tr>
    )
}

export default Cliente