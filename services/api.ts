// ─── API Base Config ──────────────────────────────────────────────────────────
// Change this to your production FastAPI URL when deploying
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizData {
  destination: string
  timeframe: string
  budget: string
  travel_type: string
  meal_plan: string
  travelers: number
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Recommendation {
  slug: string
  name: string
  country: string
  priceRange: string
  image: string
  video_url?: string
  tours?: string[]
  itinerary: ItineraryDay[]
}

export interface LeadResponse {
  success: boolean
  recommendation: Recommendation
}

export interface Lead {
  id: number
  created_at: string
  destination: string
  timeframe: string
  budget: string
  travel_type: string
  travelers: number
  recommended_destination: string | null
}

export interface AdminData {
  total: number
  today: number
  leads: Lead[]
  leads_per_day: { date: string; count: number }[]
  top_destinations: { name: string; count: number }[]
  budget_distribution: { name: string; value: number }[]
}

export interface LeadFilters {
  date_from?: string
  date_to?: string
  destination?: string
}

// ─── API Functions ────────────────────────────────────────────────────────────

export async function submitQuiz(data: QuizData): Promise<LeadResponse> {
  const res = await fetch(`${API_BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al enviar quiz")
  return res.json()
}

export async function getLeads(filters: LeadFilters = {}): Promise<AdminData> {
  const params = new URLSearchParams()
  if (filters.date_from) params.set("date_from", filters.date_from)
  if (filters.date_to) params.set("date_to", filters.date_to)
  if (filters.destination) params.set("destination", filters.destination)

  const res = await fetch(`${API_BASE_URL}/api/admin/leads?${params.toString()}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Error al obtener datos")
  return res.json()
}
