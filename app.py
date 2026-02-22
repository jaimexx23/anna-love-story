from flask import Flask, render_template
import os

# Aplicación Flask principal
app = Flask(__name__)


@app.route('/')
def index():
    """Renderiza la historia romántica en formato cinematográfico."""
    return render_template('index.html')


if __name__ == '__main__':
    # Puerto dinámico para despliegue en Render/Railway
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
