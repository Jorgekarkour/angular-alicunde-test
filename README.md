# Angular Alicunde Test

Este es un proyecto Angular que implementa un sistema de autenticación con validación del formulario, navegación segura y pruebas unitarias usando Jest.

## Tecnologías

- Angular 18
- Jest para pruebas unitarias

---

## Requisitos Previos

- Node.js >= 16.x
- Angular CLI >= 15.x
- Jest >= 29.x

---

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

---

## Ejecución

1. Para ejecutar el proyecto en modo de desarrollo:

   ```bash
   ng serve
   ```

2. Accede a la aplicación en:
   [http://localhost:4200](http://localhost:4200)

---

## Testeo

1. Ejecutar las pruebas unitarias:

   ```bash
   npm run test
   ```

2. Generar un informe de cobertura:

   ```bash
   npm run test -- --coverage
   ```

   El informe estará disponible en la carpeta `coverage/`. Abre el archivo `index.html` para verlo en el navegador:

   ```bash
   npx serve coverage
   ```

---

## Arquitectura

- **app/components/**: Contiene los componentes reutilizables como el formulario de login y el carrusel.
- **app/services/**: Contiene servicios como `UserService` para gestionar el estado del usuario.
- **app/guards/**: Contiene los guards como `LoginGuard` y `AuthGuard` para proteger las rutas.

---

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza los cambios y asegúrate de que los tests pasen:
   ```bash
   npm run test
   ```
4. Envía un pull request.

---

## Problemas Conocidos

1. **Error al usar objetos como `window` o `document`:**
   Solución: Usa `isPlatformBrowser` para verificar si el código se ejecuta en el cliente.

---

## Licencia

Este proyecto está bajo la licencia MIT.
