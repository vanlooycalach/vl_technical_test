# ITX Mobile Shop

Miniapp en Angular para la prueba técnica: listado de móviles, ficha de producto y carrito.

Necesitas Node 20+ y npm.

## Cómo arrancar

```bash
npm install
copy .env.example .env
npm start
```

En PowerShell, en lugar de `copy`:

```powershell
Copy-Item .env.example .env
```

Abre `.env` y pon la URL del API que viene en el enunciado (en `.env.example` hay un ejemplo genérico).

La app arranca en http://localhost:4200

## Comandos

- `npm start` — desarrollo
- `npm run build` — producción
- `npm test` — tests
- `npm run lint` — eslint

## Qué hace la app

Lo básico que pedía la prueba:

- Listado de productos con búsqueda al escribir (marca y modelo)
- Detalle con imagen, datos técnicos y botón para añadir al carrito
- Selectores de almacenamiento y color (aunque solo haya una opción)
- Header con breadcrumbs y contador del carrito
- Los productos se cachean en el navegador 1 hora para no llamar al API a cada rato

## Cosas que añadí yo (no venían en el PDF)

- Fichero `.env` para la URL del API, sin dejarla escrita en el código
- Traducciones ES/EN con ngx-translate (el idioma lo coge del navegador)
- Algunos tests de filtro, caché y carrito
- Un servicio pequeño para mostrar el nombre del producto en el breadcrumb

## Lo del carrito (y por qué tuve que hacer un apaño)

El enunciado dice que al añadir un producto el API te devuelve cuántos hay en la cesta y eso hay que enseñarlo arriba en el header.

El problema es que la app va en localhost y el API en otro sitio. El carrito del backend funciona con cookies de sesión. Desde el navegador, si intentas mandar esas cookies, salta un error de CORS porque el API no está preparado para eso con credenciales.

Lo que hice al final:

- La petición al carrito se sigue haciendo (POST con id, color y almacenamiento)
- Si el API devuelve un número mayor que el que tengo, uso ese
- Si no sube — que es lo normal en local — incremento yo el contador y lo guardo en localStorage para que se vea bien en pantalla

No es la solución perfecta, pero en local funciona y el flujo de añadir al carrito se comporta como esperaría un usuario. Si el API estuviera en el mismo dominio y las cookies funcionaran, bastaría con usar el `count` que devuelve el POST.

## Notas rápidas

- SPA hecha con Angular CLI, sin SSR
- El `.env` no se sube al repo, solo `.env.example`
