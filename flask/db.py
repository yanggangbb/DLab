import sqlite3
import json

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # DB 초기화
    cursor.execute('DROP TABLE IF EXISTS labs')
    cursor.execute('DROP TABLE IF EXISTS lab_applications')
    cursor.execute('DROP TABLE IF EXISTS device_rentals')

    # 실습실 정보 테이블
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS labs (
            id TEXT PRIMARY KEY,
            cpu TEXT,
            gpu TEXT,
            memory TEXT,
            disk TEXT,
            program TEXT,
            language TEXT,
            notes TEXT,
            count INTEGER,
            image_url TEXT
        )
    ''')

    # 실습실 신청 테이블
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lab_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            student_name TEXT NOT NULL,
            purpose TEXT NOT NULL,
            lab_id TEXT NOT NULL,
            date TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL
        )
    ''')

    # 노트북/태블릿 대여 테이블
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS device_rentals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            student_name TEXT NOT NULL,
            device_type TEXT NOT NULL,
            device_number INTEGER DEFAULT NULL,
            rental_date TEXT NOT NULL,
            return_date TEXT DEFAULT NULL
        )
    ''')

    conn.commit()
    conn.close()

# 실습실 데이터 초기화
def init_lab_data():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # JSON 파일에서 lab_data 읽기
    with open('D:\\SDHS\\24WebApp\\ai\\app\\data\\lab_data.json', 'r', encoding='utf-8') as file:
        lab_data = json.load(file)

    # 각 실습실 데이터 DB에 삽입
    for lab_id, lab_info in lab_data.items():
        cursor.execute('''
            INSERT OR IGNORE INTO labs (id, cpu, gpu, memory, disk, program, language, notes, count, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            lab_id,
            lab_info["cpu"],
            lab_info["gpu"],
            lab_info["memory"],
            lab_info["disk"],
            lab_info["program"],
            lab_info["language"],
            lab_info["Notes"],
            int(lab_info["count"]),
            lab_info["image_url"]
        ))

    conn.commit()
    conn.close()

# 노트북/태블릿 대여 데이터 초기화
def init_device_rental_data():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 더미데이터
    rental_data = [
        {
            "student_id": "20304",
            "student_name": "김지윤",
            "device_type": "노트북",
            "device_number": 1,
            "rental_date": "2024-12-01",
            "return_date": None
        },
        {
            "student_id": "20305",
            "student_name": "박지후",
            "device_type": "태블릿",
            "device_number": 25,
            "rental_date": "2024-12-02",
            "return_date": None 
        },
        {
            "student_id": "20309",
            "student_name": "신재승",
            "device_type": "노트북",
            "device_number": 5,
            "rental_date": "2024-12-03",
            "return_date": "2024-12-07"
        }
    ]

    for rental in rental_data:
        cursor.execute('''
            INSERT INTO device_rentals (student_id, student_name, device_type, device_number, rental_date, return_date)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            rental["student_id"],
            rental["student_name"],
            rental["device_type"],
            rental["device_number"],
            rental["rental_date"],
            rental["return_date"]
        ))

    conn.commit()
    conn.close()

# 실습실 신청 데이터 초기화
def init_lab_application_data():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 더미데이터
    application_data = [
        {
            "student_id": "20304",
            "student_name": "김지윤",
            "purpose": "웹앱경진대회 개발",
            "lab_id": "302",
            "date": "2024-12-05",
            "start_time": "17:00",
            "end_time": "21:00"
        },
        {
            "student_id": "20305",
            "student_name": "박지후",
            "purpose": "해커톤 개발",
            "lab_id": "308",
            "date": "2024-12-05",
            "start_time": "17:00",
            "end_time": "21:00"
        },
        {
            "student_id": "20309",
            "student_name": "신재승",
            "purpose": "웹앱",
            "lab_id": "307",
            "date": "2024-12-05",
            "start_time": "17:00",
            "end_time": "21:00"
        }
    ]

    for application in application_data:
        cursor.execute('''
            INSERT INTO lab_applications (student_id, student_name, purpose, lab_id, date, start_time, end_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            application["student_id"],
            application["student_name"],
            application["purpose"],
            application["lab_id"],
            application["date"],
            application["start_time"],
            application["end_time"]
        ))

    conn.commit()
    conn.close()

# 실행
if __name__ == '__main__':
    init_db()  # 데이터베이스 및 테이블 생성
    init_lab_data()  # 실습실 데이터 초기화
    init_device_rental_data()  # 노트북/태블릿 대여 데이터 초기화
    init_lab_application_data()  # 실습실 신청 데이터 초기화
