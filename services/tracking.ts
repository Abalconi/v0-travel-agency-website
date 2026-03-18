// ─── Event Tracking (Modular) ─────────────────────────────────────────────────
// Swap the body of `pushEvent` for Meta Pixel, GA4, or any analytics provider

export type TrackingEvent =
  | "quiz_started"
  | "quiz_step_completed"
  | "quiz_completed"
  | "whatsapp_clicked"
  | "results_viewed"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getSessionId() {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem('wanderlux_sid');
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('wanderlux_sid', sid);
  }
  return sid;
}

export async function trackEvent(event: TrackingEvent, data?: Record<string, unknown>, stepId?: string) {
  const sessionId = getSessionId();
  
  // Log to console
  console.log(`[Wanderlux Analytics] ${event}`, { sessionId, stepId, ...data });

  // Push to backend
  try {
    await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: event,
        session_id: sessionId,
        step_id: stepId,
        data: data
      })
    });
  } catch (err) {
    console.error('Failed to log event', err);
  }
}
