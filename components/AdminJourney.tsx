"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Loader2, TrendingUp, Users, ArrowRight } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface FunnelStage {
  name: string
  value: number
}

interface JourneyData {
  funnel: FunnelStage[]
  step_engagement: Record<string, number>
  conversion_rate: number
}

export function AdminJourney() {
  const [data, setData] = useState<JourneyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJourney() {
      try {
        const res = await fetch(`${API_URL}/api/admin/journey`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to fetch journey metrics", err)
      } finally {
        setLoading(false)
      }
    }
    fetchJourney()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) return null

  // Process step engagement for a chart
  const steps = [
    { id: 'intro', label: 'Bienvenida' },
    { id: 'timeframe', label: 'Fechas' },
    { id: 'budget', label: 'Presupuesto' },
    { id: 'destination', label: 'Destino' },
    { id: 'travel_type', label: 'Estilo' },
    { id: 'meal_plan', label: 'Comidas' },
    { id: 'travelers', label: 'Viajeros' }
  ]

  const stepData = steps.map(s => ({
    name: s.label,
    users: data.step_engagement[s.id] || 0
  }))

  return (
    <div className="space-y-8">
      {/* Funnel Section */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold">Embudo de Conversión</h3>
            <p className="text-sm text-muted-foreground">Flujo principal de usuarios</p>
          </div>
          <div className="ml-auto text-right">
            <span className="text-2xl font-bold text-primary">{data.conversion_rate}%</span>
            <p className="text-xs text-muted-foreground">Tasa de WhatsApp</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {data.funnel.map((stage, i) => (
            <div key={stage.name} className="relative p-4 rounded-xl bg-muted/50 border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                {stage.name}
              </p>
              <p className="text-2xl font-bold text-foreground">{stage.value}</p>
              {i < data.funnel.length - 1 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.funnel} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                {data.funnel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - index*0.2})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quiz Drop-off Section */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold">Interacción por Pregunta</h3>
            <p className="text-sm text-muted-foreground">Hasta dónde llegan en el quiz</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stepData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
