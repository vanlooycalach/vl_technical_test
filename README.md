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
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en http://localhost:4200 |
| `npm run build` | Build de producción |
| `npm test` | Tests unitarios |
| `npm run lint` | Revisión ESLint |

## API

La app consume la API de la prueba:

```
https://itx-frontend-test.onrender.com
```

La URL está en `src/environments/`.

## Notas

Proyecto generado con Angular CLI. Routing en cliente (SPA, sin SSR).
