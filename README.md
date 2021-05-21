## Rule of Thumb - React + Next.js

### Resumen

Esta es una aplicación que le permite al usuario compartir sus opiniones o puntos de vista usando un sistema votación, a su vez el recibirá feedback de los resultados mientras las encuestas sigan vigentes. Landing page Full Responsive + Design specifications.

### Dependencias

- **React Js** Uso de la API de la versión v17 con Hooks como: useState,useReducer,useEffect, useContext.
- **Next Js** Proporciona muchos beneficios para trabajar desde el lado del servidor ejecutando tareas de _renderizado_ desde el _runtime_ del navegador con Javascript.
- **Tailwind** Framework de CSS que permite trabajar lading pages muy rápido gracias a su tipografía intuitiva y sencilla.
- **Swiper.js** Utilidad para que permite crear swippers tipo galería de forma sencilla y con alto performance para React Js.
- **react-sizeme** Utilidad para facilitar validaciones de media queries por medio de los _props_ de forma practica con JSX. **Nota**: El uso cuenta cuando los componentes requieren de dinamismo con sus estilos y validaciones que se alcanzan a realizar con css-in-js o tailwind.

### Implementación

- **WorkSpace** El proyecto se separa en varias carpetas, de forma que los componentes quedan en un lugar, la configuración de context, configuración reflux, etc, estilos etc.

![Workspace del proyecto](./public/workspace.png)

- **Home de Página** Aprovechando el sistema de rutas que trae `Next.js`, se codificó el path `/` como componente de React. Se normalizaron todos los warnings, se cambiaron etiquetas para optimizar el `Build`, se hicieron los cambios necesarios para compilar bien el proyecto.

  ![Iniciativa de dejar volver componente index.html](./public/photo1.png)

  - **Componente Mágico** Se crea un nuevo componente llamado `MagicComponent` el cuál contiene la lógica del reto del proyecto.

  ![Componente MagicComponent](./public/photo2.png)
