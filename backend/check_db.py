import sqlite3
import os

DB_PATH = "leads.db"

def check_leads():
    if not os.path.exists(DB_PATH):
        print("Database not found")
        return
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT destination, recommended_destination FROM leads ORDER BY id DESC LIMIT 5")
    rows = cursor.fetchall()
    for row in rows:
        print(f"Destination: {row[0]} | Recommended: {row[1]}")
    conn.close()

if __name__ == "__main__":
    check_leads()
