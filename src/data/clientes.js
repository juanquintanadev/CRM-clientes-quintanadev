/* eslint-disable no-unused-vars */
export async function obtenerClientes() {

    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();

    return resultado;
}

export async function obtenerClienteId(id) {

    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();

    return resultado;
}

export async function agregarCliente(datos) {
    
    try {
        // utilziamos fecth con la configuracion para POST
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            // le pasamos el objeto convertido a JSON
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }

}

export async function editarCliente(id, datos) {
    try {
        // utilziamos fecth con la configuracion para POST
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            // le pasamos el objeto convertido a JSON
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente(id) {
    try {
        // utilziamos fecth con la configuracion para POST
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}