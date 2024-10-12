const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.id) {
        filter = { _id: dato.id }
     }
     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function obtener_usuario_v2(dato) {
    let filter = {}

    if (dato.id) {
       filter = { _id: dato.id }
    }
    if (dato.apellido) {
       filter = { apellido: dato }
    }
    
    const resultado = await model.find( filter )
    return resultado
}

async function actualizar_usuario(id, datos) {
    return model.updateOne({_id: id}, datos)
}

async function borrar_usuario(id) {
    return model.deleteOne({_id: id})
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    actualizar:actualizar_usuario,
    borrar:borrar_usuario
}