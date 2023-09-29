# ENTESCULTOR
Repositorio dedicado al desarrollo de la segunda versión de página web donde se alojan las obras del autor Indalecio Pérez Entrena.

***

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)

## Tabla de contenidos
* [Finalidad](#Finalidad)
* [Contenido](#Contenido)
* [Estructura](#Estructura)
  * [FrontEnd](#FrontEnd)
  * [BackEnd](#BackEnd)
* [Desarrollador](#Desarrollador)

***

## Finalidad
La finalidad de este proyecto es sustituir la primera y [original](https://www.entescultor.com/) página web de Indalecio. Con ello no se pretende mejorar la anterior,
sino desarrollar una nueva con un nuevo software y un estilo diferente. Además, como objetivos secundarios se presenta el aprendizaje
del desarrollador y autor del proyecto, Carlos Pérez Cruz, en nuevos lenguajes y metodologías de desarrollo web, de forma totalmente
autodidacta.

***

## Desarrollador
Carlos Pérez Cruz, estudiante de la Universidad de Granada, finalizando el grado de Ingeniería Informática, especializado en la rama de Ingeniería del Software, es el autor en su totalidad de la página web.
El estudio previo y formación en las tecnologías principales utilizadas ha sido autodidáctico (React, Nextjs, Nodejs, Express etc), aunque ciertos conocimientos de la informática han sido desarrollados en sus estudios (Diseño de Requisitos y funcionalidades, prototipado, API Rest etc).

***

## Contenido
En este repositorio podremos encontrar todo el código fuente de la aplicación web, desarrollando cada una de sus partes con esta [estructura](#Estructura), asi como los [bocetos](/documentos/bocetos.pdf) de la aplicación desarrollados en [Figma](https://www.figma.com/).

***

## Estructura
El lenguaje de programación principal del desarrollo de la aplicación es JavaScript.
El contenido del código fuente está dividido en dos partes fundamentales: El FrontEnd o "lado del cliente" y el BackEnd o "lado del servidor".

Para gestionar la aplicación, se ha usado el gestor de paquetes npm.
En este apartado se explican las tecnologías utilizadas para realizar tanto el lado del cliente como el lado del servidor: frameworks utilizados, paquetes instalados etc.

### FrontEnd
#### React
[React](https://es.react.dev/) es una librería de JS para crear interfaces de usuario. 

Versión: 18.2.0

#### Nextjs
[Nextjs](https://nextjs.org/) es el framework en el que se ha desarrollado el front de la página, el cual utiliza [React](https://es.react.dev/) como librería de javascript.

Versión: 13.4.12

#### Paquetes instalados y utilidades - Dependencias
Estos paquetes se pueden consultar en el package.json del Front

* [Axios](https://axios-http.com/). Cliente HTTP basado en promesas para conectar el navegador y nodejs.
  
  Versión: 1.5.0
* [fortawesome](https://fortawesome.com/) Conjunto de herramientas de fuentes e íconos basado en CSS.
  
  Versión: 6.4.2
* [React player](https://www.npmjs.com/package/react-player) Componente de react para reporducir vídeos a través de una URL.
  
  Versión: 2.12.0
* [React slick](https://www.npmjs.com/package/react-slick) Componente de react para generar carruseles.
  
  Versión: 0.29.0
* [React viewerjs](https://www.npmjs.com/package/react-viewerjs) Componente de react para mostrar un carrusel de imágenes.
  
  Versión: 0.1.9
* [Reactstrap](https://www.npmjs.com/package/reactstrap) Componente de react para bootstrap.
  
  Versión: 9.2.0
* [Slick carousel](https://www.npmjs.com/package/slick-carousel) Componente de react para monstrar un carrusel de componentes.
  
  Versión: 1.8.1
* [Viewerjs](https://www.npmjs.com/package/viewerjs) Componente de React para mostrar una herramienta de imagenes.
  
  Versión: 1.11.5

### BackEnd
#### Nodejs
[Nodejs](https://nodejs.org/es) es un entorno en tiempo de ejecución multiplataforma utilizado para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos

#### Express
[Express](https://expressjs.com/) es el framework de nodejs que hemos utilizado para desarrollar la API. 

#### Paquetes instalados y utilidades - Dependencias
Estos paquetes se pueden consultar en el package.json del Back

* [Cors](https://www.npmjs.com/package/cors) Middleware para utilizar [CORS](https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado).
* [Dotenv](https://www.npmjs.com/package/dotenv) Módulo para poder cargar variables de entorno del fichero .env  
* [Mongoose](https://mongoosejs.com/) Biblioteca de JS para conectar MongoDB con Nodejs
* [Mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) Plugin de mongoose para realizar una validación previa al guardado de los datos en la base de datos a través de un Schema. 
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) Estandar para la creación de tokens de acceso. Lo utilizamos para identificarse en la parte de gestión del [Front](#FrontEnd).
* [Multer](https://www.npmjs.com/package/multer) Middleware para cargar imagenes en la API. Lo usamos para guardar las imagenes en la carpeta images de la API. 
* [Bcrypt](https://www.npmjs.com/package/bcrypt) Función de hashing de contraseñas utilizada para encriptar las contraseñas de los usuarios creados.
