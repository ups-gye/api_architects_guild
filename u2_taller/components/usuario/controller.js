const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function actualizar_usuario(id, datos) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("Debe especificar el id del usuario a actualizar")
            return;
        }
        if(!datos) {
            reject("No hay datos que actualizar")
            return;
        }
        resolve(storage.actualizar(id, datos))
    })
}

function borrar_usuario(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("Debe especificar el id del usuario a actualizar")
            return;
        }
        resolve(storage.borrar(id))
    })
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    actualizar_usuario,
    borrar_usuario,
}
