from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# 데이터베이스 초기화
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            grade TEXT,
            class TEXT,
            number TEXT,
            name TEXT,
            purpose TEXT,
            date TEXT,
            start_time TEXT,
            end_time TEXT
        )
    ''')
    conn.commit()
    conn.close()

data = {
    "302": {
        "cpu": "Intel(R) Core(TM) i7-9700",
        "gpu": "NVIDIA GeForce RTX 2060",
        "memory": "16GB",
        "disk": "SSD 970 PRO 512GB",
        "program": "Adobe Creative Cloud, AutoCAD, Eclipse, IntelliJ, Node.js, Oracle Database, PyCharm, QGIS, Visual Studio, Visual Studio Code",
        "language": "Java, Python, R",
        "Notes": "멀티탭 2자리 1개",
        "count": "27",
        "image_url": "/static/images/302.jpg"
    },
    "306": {
        "cpu": "Intel(R) Core(TM) i9-13700",
        "gpu": "NVIDIA GeForce RTX 4060",
        "memory": "32GB",
        "disk": "SAMSUNG MZVL2512HCJQ-00B00",
        "program": "Adobe Creative Cloud, Visual Studio, Unity, Unreal Engine",
        "language": "-",
        "Notes": "성능은 좋지만 깔린게 없음",
        "count": "24",
        "image_url": "/static/images/306.jpg"
    },
    "307": {
        "cpu": "Intel(R) Core(TM) i7-9700",
        "gpu": "NVIDIA GeForce RTX 2060",
        "memory": "16GB",
        "disk": "SSD 970 PRO 512GB",
        "program": "Adobe Creative Cloud, Visual Studio Code",
        "language": "Java",
        "Notes": "인터넷 느림, 멀티탭 2자리 1개",
        "count": "25",
        "image_url": "/static/images/307.jpg"
    },
    "308": {
        "cpu": "Intel(R) Core(TM) i7-9700",
        "gpu": "NVIDIA GeForce RTX 3060",
        "memory": "32GB",
        "disk": "SSD 970 PRO 512GB",
        "program": "Adobe Creative Cloud, AutoCAD, CUDA, Eclipse, IntelliJ, Node.js, Oracle Database, PyCharm, QGIS, Visual Studio, Visual Studio Code",
        "language": "Java, Python, R",
        "Notes": "없음",
        "count": "26",
        "image_url": "/static/images/308.jpg"
    }
}

@app.route("/computer/<id>")
def get_computer(id):
    computer_info = data.get(id)
    if computer_info:
        return jsonify(computer_info)
    else:
        return jsonify({"error": "Data not found"}), 404
      

@app.route('/reservations', methods=['GET'])
def get_reservations():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM reservations')
    rows = cursor.fetchall()
    conn.close()

    # 데이터를 JSON 형식으로 변환
    reservations = [
        {
            "id": row[0],
            "grade": row[1],
            "class": row[2],
            "number": row[3],
            "name": row[4],
            "purpose": row[5],
            "date": row[6],
            "start_time": row[7],
            "end_time": row[8],
        }
        for row in rows
    ]

    return jsonify(reservations)


if __name__ == "__main__":
    app.run(debug=True)
