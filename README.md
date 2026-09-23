# 🌼 Para Karyme — Flores Amarillas

Página estática pensada para GitHub Pages.

## Estructura

- `index.html` — contenido de la página.
- `styles.css` — diseño, responsive y animaciones.
- `script.js` — flores interactivas, pétalos, modales y efectos.
- `assets/fotos/` — las 18 imágenes.

## Cambiar las 16 fotos restantes

Ya están colocadas las fotos 01 y 02 que fueron proporcionadas.

Para las fotos 03 a 18:
1. Reemplaza `foto03.svg` por una imagen tuya.
2. Puedes conservar el mismo nombre pero cambiar la extensión.
3. En `index.html`, cambia por ejemplo:
   `assets/fotos/foto03.svg`
   por
   `assets/fotos/foto03.jpg`

Lo más sencillo es usar JPG/PNG y mantener nombres `foto01` ... `foto18`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todo el contenido de esta carpeta.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige `main` y `/ (root)`.
6. Guarda y espera a que GitHub Pages publique la página.

No necesita Node, React ni servidor: funciona como una página estática.
