from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3
import json
from datetime import datetime, date

app = FastAPI(title="Wanderlux API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "leads.db"

# ─── DB Setup ────────────────────────────────────────────────────────────────

def init_db():
    conn = sqlite3.connect(DB_PATH)
    # Leads table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            destination TEXT NOT NULL,
            timeframe TEXT NOT NULL,
            budget TEXT NOT NULL,
            travel_type TEXT NOT NULL,
            meal_plan TEXT,
            travelers INTEGER NOT NULL,
            recommended_destination TEXT
        )
    """)
    # Events table for customer journey
    conn.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            event_name TEXT NOT NULL,
            session_id TEXT,
            step_id TEXT,
            data TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ─── Recommendation Engine ────────────────────────────────────────────────────

RECOMMENDATIONS = {
    "México": {
        "slug": "ciudad-de-mexico",
        "name": "Ciudad de México",
        "country": "México",
        "priceRange": "Q. 4,800 – Q. 9,600",
        "image": "/images/cdmx.jpg",
        "video_url": "https://www.youtube.com/embed/fD_Mshx753U",
        "tours": [
            "Castillo de Chapultepec y Museo de Antropología",
            "Xochimilco, Coyoacán y Museo Frida Kahlo",
            "Basílica de Guadalupe y Pirámides de Teotihuacán",
            "Lucha Libre y Tacos Night"
        ],
        "itinerary": [
            {"day": 1, "title": "Llegada y Centro Histórico", "description": "Traslado privado incluido. Zócalo, Catedral y Palacio de Bellas Artes."},
            {"day": 2, "title": "Teotihuacán", "description": "Pirámides del Sol y la Luna con guía certificado."},
            {"day": 3, "title": "Coyoacán y Chapultepec", "description": "Casa Azul y lo mejor de la zona sur."},
            {"day": 4, "title": "Xochimilco", "description": "Trajineras y despedida gastronómica."},
        ]
    },
    "Río de Janeiro": {
        "slug": "rio-de-janeiro",
        "name": "Río de Janeiro",
        "country": "Brasil",
        "priceRange": "Q. 8,800 – Q. 16,000",
        "image": "/images/rio.jpg",
        "video_url": "https://www.youtube.com/embed/S2pEa4WdmsY",
        "tours": [
            "Cristo Redentor y Pan de Azúcar (Full Day)",
            "Angra dos Reis e Ilha Grande con almuerzo",
            "Fabela Tour y Arte Urbano",
            "Plataforma Samba Show"
        ],
        "itinerary": [
            {"day": 1, "title": "Llegada a la Ciudad Maravillosa", "description": "Traslado privado VIP al hotel. Tarde en Copacabana."},
            {"day": 2, "title": "Maravillas del Mundo", "description": "Cristo Redentor y Pan de Azúcar en tour privado."},
            {"day": 3, "title": "Playas e Historia", "description": "Ipanema y Escalera Selarón."},
            {"day": 4, "title": "Aventura Tropical", "description": "Tour en jeep por la Floresta de Tijuca."},
        ]
    },
    "Cartagena": {
        "slug": "cartagena",
        "name": "Cartagena",
        "country": "Colombia",
        "priceRange": "Q. 6,500 – Q. 9,800",
        "image": "/images/cartagena.jpg",
        "video_url": "https://www.youtube.com/embed/j_n4fI-mFj4",
        "tours": [
            "City Tour Histórico y Castillo San Felipe",
            "Día de Playa en Islas del Rosario (Bora Bora)",
            "Sunset Cruise por la Bahía",
            "Tour de Palenque (Cultura y Música)"
        ],
        "itinerary": [
            {"day": 1, "title": "Bienvenida al Caribe", "description": "Traslado privado al centro histórico."},
            {"day": 2, "title": "Paraíso Insular", "description": "Día completo en Islas del Rosario."},
            {"day": 3, "title": "Getsemaní", "description": "Tour de street art y cata de café."},
            {"day": 4, "title": "Historia y Muralla", "description": "Visita guiada al Castillo San Felipe."},
        ]
    },
    "Punta Cana": {
        "slug": "punta-cana",
        "name": "Punta Cana",
        "country": "República Dominicana",
        "priceRange": "Q. 7,200 – Q. 14,400",
        "image": "/images/punta-cana.jpg",
        "video_url": "https://www.youtube.com/embed/bL7m1T204dI",
        "tours": [
            "Isla Saona en Catamarán VIP",
            "Buggy Adventure y Cenote",
            "Scape Park (Blue Lagoon)",
            "Coco Bongo Show & Disco"
        ],
        "itinerary": [
            {"day": 1, "title": "Relax Total", "description": "Traslado privado directo al resort All-Inclusive."},
            {"day": 2, "title": "Bajo el Mar", "description": "Snorkel y fiesta en catamarán."},
            {"day": 3, "title": "Exploración Saona", "description": "La playa más hermosa del país."},
            {"day": 4, "title": "Día de Playa", "description": "Disfrute de las instalaciones del hotel."},
        ]
    },
    "Medellín": {
        "slug": "medellin",
        "name": "Medellín",
        "country": "Colombia",
        "priceRange": "Q. 5,200 – Q. 8,500",
        "image": "/images/medellin.jpg",
        "video_url": "https://www.youtube.com/embed/n4fCst5h080",
        "tours": [
            "Guatapé y Peñol (Full Day)",
            "Tour de la Memoria (Comuna 13)",
            "Cata de Café en El Poblado",
            "Parque Arví y Metrocable"
        ],
        "itinerary": [
            {"day": 1, "title": "Ciudad de la Eterna Primavera", "description": "Traslado privado al hotel en El Poblado."},
            {"day": 2, "title": "Historia y Transformación", "description": "Visita a la Comuna 13 y centro histórico."},
            {"day": 3, "title": "Naturaleza y Colores", "description": "Excursión a Guatapé y Piedra del Peñol."},
            {"day": 4, "title": "Vistas Panorámicas", "description": "Metrocable y tarde de compras."},
        ]
    },
}

def get_recommendation(destination: str, budget: str) -> dict:
    # Normalize input for matching (very basic normalization)
    dest_norm = destination.lower().replace("í", "i").strip()
    
    # Try exact match first
    for key, data in RECOMMENDATIONS.items():
        key_norm = key.lower().replace("í", "i").strip()
        if dest_norm == key_norm:
            return data
            
    # "Recomiéndame" logic based on budget
    budget_map = {
        "Q5,000 – Q7,000": "Cartagena",
        "Q7,000 – Q10,000": "Punta Cana",
        "+Q10,000": "Río de Janeiro",
    }
    rec_name = budget_map.get(budget, "Cartagena")
    return RECOMMENDATIONS.get(rec_name, RECOMMENDATIONS["Cartagena"])

# ─── Models ───────────────────────────────────────────────────────────────────

class EventData(BaseModel):
    event_name: str
    session_id: Optional[str] = None
    step_id: Optional[str] = None
    data: Optional[dict] = None

class LeadCreate(BaseModel):
    destination: str
    timeframe: str
    budget: str
    travel_type: str
    meal_plan: str
    travelers: int

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.post("/api/leads")
def create_lead(lead: LeadCreate):
    recommendation = get_recommendation(lead.destination, lead.budget)
    created_at = datetime.utcnow().isoformat()

    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO leads (created_at, destination, timeframe, budget, travel_type, meal_plan, travelers, recommended_destination) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (created_at, lead.destination, lead.timeframe, lead.budget, lead.travel_type, lead.meal_plan, lead.travelers, recommendation["name"])
    )
    conn.commit()
    conn.close()

    return {
        "success": True,
        "recommendation": recommendation,
    }


@app.get("/api/admin/leads")
def get_leads(
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    destination: Optional[str] = Query(None),
):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    query = "SELECT * FROM leads WHERE 1=1"
    params = []

    if date_from:
        query += " AND created_at >= ?"
        params.append(date_from)
    if date_to:
        query += " AND created_at <= ?"
        params.append(date_to + "T23:59:59")
    if destination and destination != "all":
        query += " AND destination = ?"
        params.append(destination)

    query += " ORDER BY created_at DESC"
    rows = conn.execute(query, params).fetchall()
    conn.close()

    leads = [dict(row) for row in rows]

    # Summary metrics
    today = date.today().isoformat()
    total = len(leads)
    today_count = sum(1 for l in leads if l["created_at"].startswith(today))

    # Chart data: leads per day (last 7)
    from collections import Counter
    day_counts = Counter(l["created_at"][:10] for l in leads)
    leads_per_day = [{"date": d, "count": c} for d, c in sorted(day_counts.items())][-14:]

    # Top destinations
    dest_counts = Counter(l["destination"] for l in leads)
    top_destinations = [{"name": d, "count": c} for d, c in dest_counts.most_common(6)]

    # Budget distribution
    budget_counts = Counter(l["budget"] for l in leads)
    budget_distribution = [{"name": b, "value": c} for b, c in budget_counts.most_common()]

    return {
        "total": total,
        "today": today_count,
        "leads": leads,
        "leads_per_day": leads_per_day,
        "top_destinations": top_destinations,
        "budget_distribution": budget_distribution,
    }


@app.post("/api/events")
def log_event(data: EventData):
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO events (created_at, event_name, session_id, step_id, data) VALUES (?, ?, ?, ?, ?)",
        (datetime.utcnow().isoformat(), data.event_name, data.session_id, data.step_id, json.dumps(data.data) if data.data else None)
    )
    conn.commit()
    conn.close()
    return {"status": "ok"}


@app.get("/api/admin/journey")
def get_journey_metrics():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    
    # Funeral metrics
    cursor = conn.cursor()
    cursor.execute("SELECT event_name, COUNT(*) as count FROM events GROUP BY event_name")
    event_counts = {row['event_name']: row['count'] for row in cursor.fetchall()}

    # Step engagement
    cursor.execute("SELECT step_id, COUNT(DISTINCT session_id) as users FROM events WHERE event_name = 'quiz_step_completed' AND step_id IS NOT NULL GROUP BY step_id")
    step_reach = {row['step_id']: row['users'] for row in cursor.fetchall()}

    conn.close()
    
    # Calculate funnel stages
    started = event_counts.get("quiz_started", 0)
    completed = event_counts.get("quiz_completed", 0)
    results = event_counts.get("results_viewed", 0)
    whatsapp = event_counts.get("whatsapp_clicked", 0)
    
    funnel = [
        {"name": "Inicio Quiz", "value": started},
        {"name": "Quiz Completado", "value": completed},
        {"name": "Resultados Vistos", "value": results},
        {"name": "WhatsApp Click", "value": whatsapp},
    ]

    return {
        "funnel": funnel,
        "step_engagement": step_reach,
        "conversion_rate": round(whatsapp / started * 100, 1) if started > 0 else 0
    }


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Wanderlux API"}
