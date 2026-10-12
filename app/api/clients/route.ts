import { NextResponse } from 'next/server'
import { getClients } from '@/lib/db'

export async function GET() {
  try {
    const clients = getClients()
    return NextResponse.json({ success: true, count: clients.length, clients })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch clients', error: String(error) },
      { status: 500 }
    )
  }
}
