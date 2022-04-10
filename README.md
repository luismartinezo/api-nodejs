# NodejsApi

Creación de una API de mantenimiento de comentarios para los fines de iniciar sesión y crear comentarios

## Instalacion

- Clonar o descargar el proyecto
- Dentro de la carpeta raiz del proyecto correr el comando `npm install` para instalar las dependencias
- Correr el comando `npm run dev` para correr el servicio en la ruta [http://localhost:4000]

## Pruebas del servicio

Con un aplicativo de testeo de servicios como `Postman` o cualquier otro que permita probar endpoint tipo rest, las rutas existentes son:

- Post `http://localhost:4000/login`:Obtiene el token de authentication, recibe json con username y password
  {
    "username":"user",
    "password":"xxxxxxxx"
  }

- Get `http://localhost:4000/comments/list`: Obtiene la lista de los comentarios
  
- Post `http://localhost:4000/comments/create`: Crea un comentario
  {
    "subject":"coment",
    "website":"google.com",
    "text":"coment one",
    "email":"correo@correo.com",
    "user_id":1
  }
- Delete `http://localhost:4000/comments/delete/id_commet`: Elimina un comentario por ID, id_comment

- Get `http://localhost:4000/session`: Obtiene la session y numero de visitas

## Test

Correr `npm run test`