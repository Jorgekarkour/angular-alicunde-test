# Angular Alicunde Test

Este es un proyecto Angular que implementa un sistema de autenticación con validación del formulario, navegación segura y pruebas unitarias usando Jest.

## Tecnologías

- **Angular 18**
- **Jest** para pruebas unitarias

## Requisitos Previos

- **Node.js** >= 16.x
- **Angular CLI** >= 15.x
- **Jest** >= 29.x

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Jorgekarkour/angular-alicunde-test.git
   ```

2. Ir al directorio del proyecto:

   ```bash
   cd angular-alicunde-test
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para ejecutar el proyecto en modo de desarrollo:

```bash
ng serve
```

Accede a la aplicación en: [http://localhost:4200]

### Requisitos para probar el proyecto

- **Inicio de sesión:**
  - Ingresa un correo electrónico válido (por ejemplo, `usuario@correo.com`).
  - Ingresa una contraseña con al menos 6 caracteres. (Puedes inventar una contraseña).
- **Navegación:**
  - Tras iniciar sesión, se mostrará un carrusel con 3 animaciones en el que puedes navegar.
  - Para volver al formulario de inicio de sesión, haz clic en el botón "Cerrar sesión".

## Testeo

### Ejecutar las pruebas unitarias:

```bash
npm run test
```

### Generar un informe de cobertura:

```bash
npm run test --coverage
```

El informe estará disponible en la carpeta `coverage/`. Abre el archivo `index.html` para verlo en el navegador:

```bash
npx serve coverage
```

## Arquitectura

- **`app/components/`:** Contiene los componentes reutilizables como el formulario de login y el carrusel.
- **`app/services/`:** Contiene servicios como `UserService` para gestionar el estado del usuario.
- **`app/guards/`:** Contiene guards como `AuthGuard` para proteger las rutas.

## Licencia

Este proyecto está bajo la licencia MIT.
