# IMGsharing: comparte tus fotos

Este proyecto es una API REST FILES donde los usuarios registrados pueden compartir fotos. Este proyecto ha sido diseñado para practicar conocimientos básicos de backend. Utiliza **Node.js**, **Express**, **JWT**, **Bcrypt**, y **MongoDB Atlas** como base de datos. Para la subida y gestión de las imágenes usa: **Cloudinary** y **Multer**.

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Rutas Disponibles](#rutas-disponibles)
5. [Tecnologías Usadas](#tecnologías-usadas)
6. [Contribución](#contribución)
7. [Licencia](#licencia)
8. [Créditos](#créditos)

## Descripción

Esta API permite gestionar dos colecciones relacionadas:

- **Usuarios**: Registro de usuarios en la API.
- **Imágenes**: Imágenes subidas por los usuarios.

### Funcionalidades

- CRUD para Usuarios e Imágenes.
- Relación entre Usuarios e Imágenes.
- Registro de usuarios y login para poder compartir sus imágenes.
- Filtrado por Usuarios e Imágenes (imágenes por categoría e imágenes por usuario).

## Instalación

1. Clona este repositorio:
   git clone https://github.com/Aurafer22/P8_backend_imgSharing.git

2.Ve al directorio del proyecto:
cd P8_BACKEND_IMGSHARING

3.Instala las dependencias:
npm install

4.Configura las variables de entorno:
• Crea un archivo .env con las siguientes claves:
DB_URL=mongodb+srv://aurafercomunicacion:laknco7IK870n0ndjdnoa@cluster0.jlkzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
• Inicia el servidor:
npm start
• Reestablece la semilla users:
npm seed

## Uso

Usa herramientas como Postman o Insomnia para realizar peticiones a la API. A través de las diferentes peticiones puedes: registrarte como usuario, compartir tus fotos, actualizar y borrar tanto tu perfil de usuario como las imágenes que hayas subido. También puedes ver las imágenes de otros usuarios, o ver imágenes filtradas por usuario o categoría.
Ejemplo de peticion POST para registro de usuario:
POST http://localhost:3000/api/v1/users/register
Ejemplo de peticion POST para login en la API:
POST http://localhost:3000/api/v1/users/login
Ejemplo de petición GET para ver todas las imágenes existentes en una categoría:
GET http://localhost:3000/api/v1/images/category/:category

## Rutas Disponibles

**USUARIOS**

| PETICION              | ENDPOINT |          RUTA          | DESCRIPCIÓN                                                   |
| :-------------------- | :------: | :--------------------: | :------------------------------------------------------------ |
| Registro Usuario      |   POST   | /api/v1/users/register | Permite crear un nuevo usuario                                |
| Login Usuario         |   POST   |  /api/v1/users/login   | Permite obtener un token para acceder a determinadas rutas    |
| Info Usuarios         |   GET    |     /api/v1/users      | Permite ver el listado completo de usuarios registrados       |
| Info Usuario          |   GET    |   /api/v1/users/:id    | Permite a cada usuario ver la información de su perfil        |
| Actualización Usuario |   PUT    |   /api/v1/users/:id    | Permite a cada usuario actualizar la información de su perfil |
| Eliminar Usuario      |  DELETE  |   /api/v1/users/:id    | Permite a cada usuario eliminar su perfil                     |

**IMÁGENES**

| PETICION               | ENDPOINT |            RUTA            | DESCRIPCIÓN                                                 |
| :--------------------- | :------: | :------------------------: | :---------------------------------------------------------- |
| Ver Imágenes           |   GET    |       /api/v1/images       | Permite ver todas las imágenes subidas                      |
| Imágenes por Usuario   |   GET    |   /api/v1/imgByUser/:id    | Permite ver las imágenes subidas por un usuario             |
| Imágenes por Categoría |   GET    | /api/v1/category/:category | Permite ver las imágenes por categoría                      |
| Crear Imagen           |   POST   |       /api/v1/images       | Permite crear una imagen a nombre del usuario logueado      |
| Actualizar Imagen      |   PUT    |     /api/v1/images/:id     | Permite, al propietario de la imagen, actualizar sus campos |
| Eliminar Imagen        |  DELETE  |     /api/v1/images/:id     | Permite, al propietario de la imagen, eliminarla            |

## Relación

• GET /api/v1/users - Muestra el listado de imágenes subidas por el usuario.
• GET /api/v1/images - Muestra el usuario que ha subido esa imagen.

## Tecnologías Usadas

• Node.js
• Express
• MongoDB Atlas
• Mongoose
• JWT (jsonwebtoken)
• Bcrypt
• Cloudinary
• Multer
• Multer-storage-cloudinary

## Contribución

¿Quieres contribuir? ¡Bienvenid@!

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   git checkout -b feature/nueva-funcion
3. Sube tus cambios:
   git commit -m "Añadida nueva funcionalidad"
   git push origin feature/nueva-funcion
4. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

## Créditos

Creado por Aurora Ramírez Fernández.

---
