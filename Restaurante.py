from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulando base de datos de platos
menu = {
    "Bebidas": {"Agua": True, "Refresco": True, "Cerveza": True, "Vino": False},
    "Pastas": {"Espagueti": True, "Lasaña": False, "Ravioles": True},
    "Carnes": {"Bife": True, "Pollo asado": True, "Cerdo al horno": True},
}

@app.route('/obtener_menu', methods=['GET'])
def obtener_menu():
    return jsonify(menu)

@app.route('/actualizar_stock', methods=['POST'])
def actualizar_stock():
    data = request.json
    categoria = data.get('categoria')
    plato = data.get('plato')
    estado = data.get('estado', True)

    if categoria in menu and plato in menu[categoria]:
        menu[categoria][plato] = estado
        return jsonify({"message": f"Estado de {plato} actualizado a {'disponible' if estado else 'no disponible'}."}), 200
    else:
        return jsonify({"error": "Plato o categoría no encontrado."}), 404

if __name__ == '__main__':
    app.run(debug=True)
