import sqlite3

DB_PATH = "leads.db"

def migrate():
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute("ALTER TABLE leads ADD COLUMN meal_plan TEXT")
        conn.commit()
        print("Migrated: added meal_plan column")
    except Exception as e:
        print(f"Error during migration: {e}")
    conn.close()

if __name__ == "__main__":
    migrate()
