from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os
from dotenv import load_dotenv
from message import send_kakao_message
import json
from pytz import timezone
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

app.secret_key = os.getenv('SECRET_KEY')  # SECRET_KEY 설정
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')  # ADMIN_PASSWORD 설정

# 실습실 신청 추가
def add_lab_application(data):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO lab_applications (student_id, student_name, purpose, lab_id, date, start_time, end_time)
        VALUES (?, ?, ?, ?, ?, ?, ?)    
    ''', (
        data['student_id'], data['student_name'], data['purpose'],
        data['lab_id'], data['date'], data['start_time'], data['end_time']
    ))
    conn.commit()
    conn.close()

# 노트북/태블릿 대여 추가
def add_device_rental(data):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO device_rentals (student_id, student_name, device_type, rental_date)
        VALUES (?, ?, ?, ?)
    ''', (
        data['student_id'], data['student_name'], data['device_type'], data['rental_date']
    ))
    conn.commit()
    conn.close()

# 실습실 신청 조회
def get_lab_applications(lab_id):
    lab_id = ''.join(re.findall(r'\d', str(lab_id)))
    lab_id = int(lab_id)
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM lab_applications WHERE lab_id = ?', (lab_id,))
    rows = cursor.fetchall()
    conn.close()
    # 리스트로 변환하여 반환
    return [
        {
            "id": row["id"],
            "student_id": row["student_id"],
            "student_name": row["student_name"],
            "purpose": row["purpose"],
            "lab_id": row["lab_id"],
            "date": row["date"],
            "start_time": row["start_time"],
            "end_time": row["end_time"]
        }
        for row in rows
    ]

# 노트북/태블릿 대여 조회
def get_device_rentals(student_id=None, student_name=None):
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # 결과를 딕셔너리 형태로 반환
    cursor = conn.cursor()
    
    if student_id:
        cursor.execute('SELECT * FROM device_rentals WHERE student_id = ?', (student_id,))
    elif student_name:
        cursor.execute('SELECT * FROM device_rentals WHERE student_name LIKE ?', (f"%{student_name}%",))
    else:
        return []
    
    rows = cursor.fetchall()
    conn.close()
    
    # 리스트로 변환하여 반환
    return [
        {
            "id": row["id"],
            "student_id": row["student_id"],
            "student_name": row["student_name"],
            "device_type": row["device_type"],
            "device_number": row["device_number"],
            "rental_date": row["rental_date"],
            "return_date": row["return_date"] if row["return_date"] else "미반납"  # return_date가 None일 경우 '미반납' 처리
        }
        for row in rows
    ]


# Flask 라우트 설정
# 실습실 정보
@app.route("/computer/<id>")
def get_computer(id):
    with open('D:\\SDHS\\24WebApp\\ai\\app\\data\\lab_data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    computer_info = data.get(id)
    if computer_info:
        return jsonify(computer_info)
    else:
        return jsonify({"error": "Data not found"}), 404

@app.route('/submit_lab_application', methods=['POST'])
def submit_lab_application():
    try:
        data = request.get_json()  # Get JSON payload
        add_lab_application(data)  # Save to database
        
        # 카카오 메시지 전송
        message = f"""
        {data['lab_id']}호 실습실 신청이 추가되었습니다.
학번 이름 : {data['student_id']} {data['student_name']}
용무: {data['purpose']}
사용일자: {data['date']}
사용시간: {data['start_time']} ~ {data['end_time']}
        """
        send_kakao_message(message)
        
        return jsonify({"message": "실습실 신청이 완료되었습니다."}), 201
    
    except Exception as e:
        return jsonify({"message": f"신청 중 오류 발생: {str(e)}"}), 500
    

@app.route('/submit_device_rental', methods=['POST'])
def submit_device_rental():
    try:
        data = request.get_json() 
        add_device_rental(data)
        
        # 카카오 메시지 전송
        message = f"""
        {data['device_type']} 대여 신청이 추가되었습니다.
학번 이름 : {data['student_id']} {data['student_name']}
신청일: {data['rental_date']}
        """
        send_kakao_message(message)
        
        return jsonify({"message": "대여 신청이 완료되었습니다."}), 201
    
    except Exception as e:
        return jsonify({"message": f"신청 중 오류 발생: {str(e)}"}), 500

@app.route('/api/lab_applications', methods=['GET'])
def view_lab_applications():
    lab_id = request.args.get('lab_id')
    results = get_lab_applications(lab_id)
    return jsonify({"applications": results}), 200

# Flask 라우트 설정
@app.route('/api/device_rentals', methods=['GET'])
def view_device_rentals():
    query = request.args.get('student_id', '')
    print("aa", query)
    
    # 숫자와 문자 분리
    student_id = ''.join(filter(str.isdigit, query)) if query else None
    student_name = ''.join(filter(lambda x: not x.isdigit(), query)).strip() if query else None
    
    results = []
    if student_id:  
        # 학번으로 검색
        results = get_device_rentals(student_id=student_id)
    if not results and student_name:
        # 학번 결과가 없고 이름이 있을 경우 이름으로 검색
        results = get_device_rentals(student_name=student_name)
    
    return jsonify({"rentals": results}), 200



## admin page ##

# 관리자 로그인 페이지
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        password = request.form.get('password')
        if password == ADMIN_PASSWORD:
            session['is_admin'] = True
            return redirect(url_for('admin_device'))
        else:
            return render_template('admin_login.html', error="비밀번호가 틀렸습니다.")
    return render_template('admin_login.html')

# 관리자 페이지 렌더링
@app.route('/admin_device', methods=['GET'])
def admin_device():
    # 세션 확인
    if not session.get('is_admin'):
        return redirect(url_for('admin_login'))
    
    rentals = get_all_device_rentals()
    return render_template('admin_device.html', rentals=rentals)

# 로그아웃
@app.route('/admin_logout', methods=['GET'])
def admin_logout():
    session.pop('is_admin', None)
    return redirect(url_for('admin_login'))

# 모든 대여 내역 조회
def get_all_device_rentals():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM device_rentals') 
    rows = cursor.fetchall()

    return [
        {
            "id": row["id"],
            "student_id": row["student_id"],
            "student_name": row["student_name"],
            "device_type": row["device_type"],
            "rental_date": row["rental_date"],
            "device_number": row["device_number"],
            "return_date": row["return_date"] if row["return_date"] else "미반납"  # return_date가 None일 경우 미반납
        }
        for row in rows
    ]
    
# 기기번호 수정
@app.route('/api/update_device_number', methods=['POST'])
def update_device_number():
    rental_id = request.form.get('id')
    new_device_number = request.form.get('device_number')

    if not rental_id or not rental_id.isdigit():
        return jsonify({"message": "유효하지 않은 ID입니다."}), 400

    if not new_device_number:
        return jsonify({"message": "기기번호를 입력해주세요."}), 400

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE device_rentals SET device_number = ? WHERE id = ?',
            (new_device_number, rental_id)
        )
        conn.commit()
        return jsonify({"message": "기기번호가 성공적으로 수정되었습니다."}), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"데이터베이스 오류: {e}"}), 500
    finally:
        conn.close()

# 반납일자 수정
@app.route('/api/update_return_date', methods=['POST'])
def update_return_date():
    if not request.is_json:
        return jsonify({"message": "유효하지 않은 요청 형식입니다."}), 400

    data = request.get_json()
    rental_id = data.get('id')

    if not rental_id or not isinstance(rental_id, int):
        return jsonify({"message": "유효하지 않은 ID입니다."}), 400

    today_date = datetime.now(timezone('Asia/Seoul')).strftime('%Y-%m-%d')

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE device_rentals SET return_date = ? WHERE id = ?',
            (today_date, rental_id)
        )
        conn.commit()
        return jsonify({"message": "반납일자가 성공적으로 수정되었습니다."}), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"데이터베이스 오류: {e}"}), 500
    finally:
        conn.close()



if __name__ == '__main__':
    app.run(debug=True)
