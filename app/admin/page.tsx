"use client"

import { useEffect, useState, useCallback } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Users, TrendingUp, Calendar, Filter, RefreshCw, Loader2, MapPin, Wallet, Clock, LayoutDashboard, Footprints } from "lucide-react"
import { getLeads, type AdminData, type LeadFilters } from "@/services/api"
import { AdminJourney } from "@/components/AdminJourney"

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

function MetricCard({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string | number, sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-3xl font-serif font-bold text-foreground tabular-nums">{value}</p>
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}

// Demo data for when backend is offline
const DEMO_DATA: AdminData = {
  total: 47,
  today: 5,
  leads: [
    { id: 1, created_at: new Date().toISOString(), destination: "México", timeframe: "1–3 meses", budget: "Q7,000 – Q10,000", travel_type: "Mixto", travelers: 2, recommended_destination: "Ciudad de México" },
    { id: 2, created_at: new Date().toISOString(), destination: "Río de Janeiro", timeframe: "3–6 meses", budget: "+Q10,000", travel_type: "Aventura", travelers: 3, recommended_destination: "Río de Janeiro" },
    { id: 3, created_at: new Date(Date.now() - 86400000).toISOString(), destination: "Recomiéndame", timeframe: "Explorando", budget: "Q5,000 – Q7,000", travel_type: "Relajación", travelers: 1, recommended_destination: "Cartagena" },
  ],
  leads_per_day: [
    { date: "2026-03-12", count: 3 }, { date: "2026-03-13", count: 5 }, { date: "2026-03-14", count: 2 },
    { date: "2026-03-15", count: 8 }, { date: "2026-03-16", count: 4 }, { date: "2026-03-17", count: 7 }, { date: "2026-03-18", count: 5 },
  ],
  top_destinations: [
    { name: "México", count: 18 }, { name: "Río de Janeiro", count: 12 }, { name: "Recomiéndame", count: 9 }, { name: "Cartagena", count: 8 },
  ],
  budget_distribution: [
    { name: "Q5,000–Q7,000", value: 14 }, { name: "Q7,000–Q10,000", value: 22 }, { name: "+Q10,000", value: 11 },
  ],
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)
  const [filters, setFilters] = useState<LeadFilters>({ destination: "all" })
  const [activeTab, setActiveTab] = useState<"leads" | "journey">("leads")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getLeads(filters)
      setData(result)
      setUsingDemo(false)
    } catch {
      // Backend offline — show demo mode
      setData(DEMO_DATA)
      setUsingDemo(true)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [load])

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    } catch { return iso }
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Panel de Administración</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Wanderlux Travel Agency</p>
            </div>
            
            {/* Tab Switcher */}
            <nav className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
              <button
                onClick={() => setActiveTab("leads")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "leads" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Resumen de Leads
              </button>
              <button
                onClick={() => setActiveTab("journey")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "journey" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <Footprints className="w-4 h-4" />
                Customer Journey
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {usingDemo && (
              <span className="text-xs bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-semibold">
                🟡 Modo Demo
              </span>
            )}
            <button
              onClick={load}
              disabled={loading}
              id="admin-refresh-btn"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {loading && !data ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activeTab === "journey" ? (
          <AdminJourney />
        ) : data ? (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard icon={Users} label="Total leads" value={data.total} sub="Desde el inicio" />
              <MetricCard icon={TrendingUp} label="Leads hoy" value={data.today} sub={new Date().toLocaleDateString("es-GT", { day: "numeric", month: "long" })} />
              <MetricCard icon={MapPin} label="Destino top" value={data.top_destinations[0]?.name ?? "—"} sub={`${data.top_destinations[0]?.count ?? 0} leads`} />
              <MetricCard icon={Wallet} label="Presupuesto top" value={data.budget_distribution[0]?.name ?? "—"} sub={`${data.budget_distribution[0]?.value ?? 0} personas`} />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Leads per day */}
              <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
                <h2 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Leads por día
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data.leads_per_day}>
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip formatter={(v) => [`${v} leads`, "Leads"]} labelFormatter={(l) => `Fecha: ${l}`} />
                    <Line type="monotone" dataKey="count" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Budget distribution */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <h2 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" /> Presupuesto
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={data.budget_distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {data.budget_distribution.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" iconSize={10} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top destinations chart */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h2 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Destinos más solicitados
              </h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.top_destinations} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
                  <Tooltip formatter={(v) => [`${v} leads`, ""]} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {data.top_destinations.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Filters + Table */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <h2 className="font-serif font-semibold text-foreground flex items-center gap-2 flex-1">
                  <Filter className="w-4 h-4 text-primary" /> Todos los leads
                </h2>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="date"
                    id="admin-filter-date-from"
                    value={filters.date_from ?? ""}
                    onChange={(e) => setFilters((f) => ({ ...f, date_from: e.target.value || undefined }))}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="date"
                    id="admin-filter-date-to"
                    value={filters.date_to ?? ""}
                    onChange={(e) => setFilters((f) => ({ ...f, date_to: e.target.value || undefined }))}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <select
                    id="admin-filter-destination"
                    value={filters.destination ?? "all"}
                    onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="all">Todos los destinos</option>
                    <option value="México">México</option>
                    <option value="Río de Janeiro">Río de Janeiro</option>
                    <option value="Recomiéndame">Recomiéndame</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Fecha", "Destino", "Presupuesto", "Plazo", "Viajeros", "Tipo", "Recomendado"].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 px-4 first:pl-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center text-muted-foreground py-10 text-sm">
                          No hay leads con los filtros seleccionados
                        </td>
                      </tr>
                    ) : (
                      data.leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-3 px-4 first:pl-0 text-muted-foreground text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                          <td className="py-3 px-4 font-medium text-foreground">{lead.destination}</td>
                          <td className="py-3 px-4 text-foreground">{lead.budget}</td>
                          <td className="py-3 px-4 text-muted-foreground">{lead.timeframe}</td>
                          <td className="py-3 px-4 text-center text-foreground">{lead.travelers}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{lead.travel_type}</span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{lead.recommended_destination ?? "—"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
