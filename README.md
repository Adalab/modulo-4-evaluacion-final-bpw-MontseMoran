Evaluación Final - Módulo 4:API REST Simpson
Este proyecto es una aplicación web desarrollada con React. Muestra frases de los personajes de la serie "Los Simpson" y permite filtrarlas por personaje. Es parte de la evaluación final del Módulo 4 del curso de Adalab.

Tecnologías utilizadas  en Frontend:
React con Vite
HTML y SCSS
Publicado en GitHub Pages

Tecnologías utilizadas  en Backend:
Node.js con Express
MySQL (base de datos alojada en Aiven)
Backend desplegado en Render

Funcionamiento:
Al cargar la página, se muestran frases relacionadas con personajes de la serie.
Se puede filtrar por personaje usando un desplegable.
El frontend hace peticiones al backend para obtener los datos.

Estructura:
Carpeta frontend: contiene la app React.

Carpeta backend: contiene el servidor Express y la conexión a la base de datos.

Cómo usar este proyecto:
Opción 1: Verlo online
No necesitas instalar nada. Solo visita:

Frontend:
https://beta.adalab.es/modulo-4-evaluacion-final-bpw-MontseMoran

Backend (API de frases):
https://modulo-4-evaluacion-final-bpw-montsemoran.onrender.com/frases

Opción 2: Ejecutar en local
Clona este repositorio: git clone https://github.com/MontseMoran/modulo-4-evaluacion-final-bpw-MontseMoran.git
Entra a la carpeta del frontend: cd frontend
Instala las dependencias: npm install
Lanza el servidor: npm run dev

Nota: El frontend está preparado para consumir el backend desplegado en Render.
Si quieres usar también el backend en local, tendrás que clonar la carpeta backend,
configurar .env con tus datos de conexión a MySQL, y lanzarlo con:  node src/index.js

