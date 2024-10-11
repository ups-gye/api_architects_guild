// =================================================================
// Página para creación, actualización y eliminación de un usuario
// =================================================================

async function cargar_datos_usuario_existente() {
    const params = new URL(document.location.toString()).searchParams;
    const userId = params.get("id");
    if(!userId) return;
    setTimeout(() => {
        const userActions = document.getElementById('usuario-acciones');
        userActions?.insertAdjacentHTML('beforeend', `
        <button type="button" class="btn btn-danger"
            onclick="borrar_usuario('${userId}')">Borrar</button>
        `);
    }, 10);
    const request_options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };
    const resp = await fetch(`/usuario?id=${userId}`, request_options);
    const data = await resp.json();
    document.getElementById('nombre').value = data.body[0].nombre;
    document.getElementById('apellido').value = data.body[0].apellido;
}

function guardar() {

    const params = new URL(document.location.toString()).searchParams;
    const userIdExistente = params.get("id");

    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value

    const data = { nombre , apellido }

    return new Promise((resolve, reject) => {
        let request_options = {};
        if (!userIdExistente) {
            request_options = {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json' // Indicar que se envían datos JSON
               },
               body: JSON.stringify(data) // Convertir los datos a JSON
           };
        } else {
            request_options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Indicar que se envían datos JSON
                },
                body: JSON.stringify({id: userIdExistente, ...data})
            }
        }
        fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar_usuario() {
    guardar()
        .then( (response) => {
            if (response.body == '') {
                alert(`Error: ${JSON.stringify(response.error)}`);
                return;
            }
            alert('Registro exitoso.')
            document.location = "/";
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}

function borrar_usuario(userId) {
    request_options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: userId}) // Convertir los datos a JSON
    };
    fetch('/usuario', request_options)
        .then((_) => {
            alert('Borrado exitoso.')
            document.location = "/";
        })
        .catch((error) => {
            alert(`Error al borrar ${error}`)
        });
}

function cancelar() {
    document.location = "/";
}

// =========================================
// Página de listado de usuarios
// =========================================

async function obtener_usuarios_todos() {
    try {
        const request_options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        const resp = await fetch("/usuario", request_options);
        const data = await resp.json();
        fill_user_list(data.body);
    }catch(e) {
        console.log(e);
        alert("Error obteniendo todos los usuarios");
    }
  }
  
  function fill_user_list(users) {
    const usersList = document.getElementById("lista-usuarios");
    usersList.innerHTML = "";
    for (const u of users) {
        usersList?.insertAdjacentHTML('afterbegin', `
            <li id="${u._id}" style="cursor:pointer" class="list-group-item" onclick="on_usuario_click(this)">${u.nombre} ${u.apellido}</li>
        `);
    }
  }
  
  function on_usuario_click(element) {
    document.location = `/usuario.html?id=${element.id}`;
  }