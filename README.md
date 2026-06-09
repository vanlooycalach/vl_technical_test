# ITX Mobile Shop

SPA en Angular para la prueba técnica de frontend. Listado de móviles, detalle de producto y carrito.

## Requisitos

- Node.js 20 o superior
- npm

El código está en la carpeta `prueba_tecnica_vanlooy`.

## Instalación

```bash
cd prueba_tecnica_vanlooy
npm install
copy .env.example .env
```

En PowerShell:

```powershell
Copy-Item .env.example .env
```

## Variables de entorno

Crea un fichero `.env` en la raíz del proyecto:

```env
NG_APP_API_URL= API_URL_TEST
```

La app lee esa variable en build time con `@ngx-env/builder` y la usa en los servicios HTTP.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en http://localhost:4200 |
| `npm run build` | Build de producción |
| `npm test` | Tests unitarios |
| `npm run lint` | Revisión ESLint |

## Notas

Proyecto generado con Angular CLI. Routing en cliente (SPA, sin SSR).

Las respuestas del API se guardan en cache local con caducidad de 1 hora. El contador del carrito se persiste en el navegador.
