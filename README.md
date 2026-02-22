# Historia Romántica Cinematográfica con Flask

Proyecto web romántico estilo cuento animado cinematográfico, desarrollado con Python + Flask.

## Estructura

- `app.py`
- `templates/index.html`
- `static/style.css`
- `static/script.js`
- `static/music.mp3` (placeholder)
- `requirements.txt`
- `Procfile`

## Ejecutar localmente

```bash
pip install flask
python app.py
```

Luego abre en tu navegador:

- http://127.0.0.1:5000

## Despliegue en Render o Railway

- Incluye `requirements.txt` para instalar dependencias.
- Incluye `Procfile` para iniciar con Gunicorn.
- `app.py` usa el puerto dinámico vía variable de entorno `PORT`.

## Nota

Reemplaza `static/music.mp3` por una canción romántica en formato MP3 libre de derechos para producción.
