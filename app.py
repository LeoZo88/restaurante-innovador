from flask import Flask, jsonify, request

app = Flask(__name__)

# Simulación de datos
menu = {
    "Bebidas": {"Agua": True, "Refresco": True, "Cerveza": True},
    "Pastas": {"Espagueti": True, "Lasaña": False}
}

@app.route('/obtener_menu', methods=['GET'])
def obtener_menu():
    return jsonify(menu)

@app.route('/actualizar_stock', methods=['POST'])
def actualizar_stock():
    data = request.json
    categoria = data['categoria']
    plato = data['plato']
    estado = data['estado']
    
    if categoria in menu and plato in menu[categoria]:
        menu[categoria][plato] = estado
        return jsonify({"mensaje": "Estado actualizado"}), 200
    else:
        return jsonify({"error": "Plato o categoría no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
