# Página de Perdón con Flask

Proyecto web romántico de disculpa, desarrollado con Python + Flask.

## Estructura

- `app.py`
- `templates/index.html`
- `docs/index.html` (versión estática para GitHub Pages)
- `render.yaml` (despliegue en Render)
- `requirements.txt`
- `Procfile`

## Ejecutar localmente

```bash
pip install flask
python app.py
```

Luego abre en tu navegador:

- http://127.0.0.1:5000

## Despliegue en Render

1. Entra a [Render Dashboard](https://dashboard.render.com/)
2. Clic en **New +** → **Blueprint**
3. Conecta el repo `jaimexx23/anna-love-story`
4. Render detectará `render.yaml` y creará el servicio web
5. Espera el primer deploy y abre el URL público generado

La app usa `requirements.txt`, `Procfile` y puerto dinámico por variable `PORT`.

## Link público rápido con GitHub Pages

- Ruta servida: `docs/index.html`
- URL final: `https://jaimexx23.github.io/anna-love-story/`

## Nota

Reemplaza `static/music.mp3` por una canción romántica en formato MP3 libre de derechos para producción.
