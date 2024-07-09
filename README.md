# PlanParty

PlanParty es una aplicación web diseñada para facilitar la planificación y gestión de eventos. Este repositorio contiene el código fuente y la documentación del proyecto.

![planparty-logo](https://github.com/webreactiva-devs/planparty/assets/1122071/345a3cfc-6429-4f39-807b-6d9e663a177e)


## Características

- Crear y gestionar eventos
- Enviar invitaciones y realizar un seguimiento de las confirmaciones (RSVP)
- Programar y organizar actividades del evento
- Compartir detalles del evento con los participantes

## Tecnologías Utilizadas

### Frontend

- **TypeScript:** Utilizado para proporcionar tipado estático y mejorar la mantenibilidad del código.
- **React:** Biblioteca para construir interfaces de usuario.
- **Tailwind CSS:** Framework de CSS para un diseño rápido y eficiente.

### Backend as a Service

- **Supabase:** Donde tendremos nuestra persistencia de datos

### Herramientas de Construcción

- **Bun:** Runner como alternativa a node
- **Vite:** Herramienta de desarrollo rápida y ligera.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
planparty/
├── public/                 # Archivos estáticos
├── src/                    # Código fuente
│   ├── assets/             # Recursos como imágenes y fuentes
│   ├── components/         # Componentes de React
│   ├── pages/              # Páginas de la aplicación
│   ├── services/           # Servicios para manejar lógica de negocio y llamadas API
│   ├── styles/             # Estilos globales y específicos
│   └── App.tsx             # Componente principal de la aplicación
├── .gitignore              # Archivos y directorios ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/webreactiva-devs/planparty.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd planparty
   ```
3. Instala las dependencias:
   ```bash
   bun install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   bun dev
   ```

## Uso

Después de iniciar el servidor de desarrollo, puedes acceder a la aplicación en tu navegador web en `http://localhost:5173`.

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, haz un fork de este repositorio y envía tus pull requests.

## Contacto

Para preguntas o soporte, por favor abre un issue en este repositorio.

![golden-shiny-glitter-sparkles-light-bokeh-on-dar-2023-11-27-04-54-56-utc](https://github.com/webreactiva-devs/planparty/assets/1122071/3af19cdc-b138-46bc-bdc1-6b4d0bda7faf)

