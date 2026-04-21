import os
import mysql.connector
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Arahkan ke folder hasil build React
app = Flask(__name__, static_folder='frontend/dist', static_url_path='')
CORS(app)

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data')
def get_data():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="museum_digital"
        )
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM models")
        records = cursor.fetchall()
        
        result = []
        for row in records:
            result.append({
                "id": row['id'],
                "name": row['name'],
                "category": row['main_category'], 
                "desc": row['description_short'],
                "model": row['model_path']
            })
            
        cursor.close()
        db.close()
        return jsonify(result)
    except Exception as e:
        print("Database error:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/encyclopedia')
def get_encyclopedia():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="museum_digital"
        )
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM models")
        records = cursor.fetchall()
        
        encyclo = {}
        for row in records:
            main_title = row['main_category']
            # Kembalikan key asli untuk kecocokan navigasi
            main_key = "BIO" if main_title == "MAKHLUK HIDUP" else "FOSSIL" if main_title == "JENIS FOSIL" else "ERA" if main_title == "ERA ZAMAN" else main_title
            
            if main_key not in encyclo:
                encyclo[main_key] = {
                    "id": main_key,
                    "title": main_title,
                    "desc": row['main_category_desc'],
                    "color": row['main_category_color'],
                    "image": row['main_category_image'],
                    "subCategories": []
                }
            
            sub_title = row['sub_category']
            sub_cats = encyclo[main_key]['subCategories']
            sub_cat = next((s for s in sub_cats if s['title'] == sub_title), None)
            if not sub_cat:
                sub_cat = {
                    "title": sub_title,
                    "desc": row['sub_category_desc'],
                    "image": row['sub_category_image'],
                    "items": []
                }
                sub_cats.append(sub_cat)
                
            item = {
                "name": row['name'],
                "modelPath": row['model_path'],
                "image": row['image'],
                "period": row['period'],
                "status": row['status'],
                "description": {
                    "short": row['description_short'],
                    "full": row['description_full'],
                    "key": row['description_key']
                },
                "details": {
                    "diet": row['detail_diet'],
                    "lifespan": row['detail_lifespan'],
                    "weight": row['detail_weight'],
                    "size": row['detail_size'],
                    "discoveryYear": row['detail_discovery_year'],
                    "taxonomy": row['detail_taxonomy'],
                    "stats": {
                        "completeness": row['stat_completeness'],
                        "rarity": row['stat_rarity'],
                        "value": row['stat_value']
                    }
                }
            }
            sub_cat['items'].append(item)
            
        cursor.close()
        db.close()
        return jsonify(encyclo)
    except Exception as e:
        print("Database encyclopedia error:", e)
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(e):
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return jsonify({"error": "Resource not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)