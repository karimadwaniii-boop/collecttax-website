import { NextResponse } from 'next/server'
import { updateLead, deleteLead, getLeads } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await req.json()

    const updated = updateLead(id, updates)
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update lead', error: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const removed = deleteLead(id)
    if (!removed) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete lead', error: String(error) },
      { status: 500 }
    )
  }
}
