import { NextResponse } from 'next/server'
import { getLeads, addLead } from '@/lib/db'
import { sendConfirmationEmail } from '@/lib/mail'

export async function GET() {
  try {
    const leads = getLeads()
    return NextResponse.json({ success: true, count: leads.length, leads })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads', error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields.' },
        { status: 400 }
      )
    }

    const createdLead = addLead({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      type: body.type || 'General enquiry',
      annualSales: body.annualSales || body.salesVolume || 'Not Specified',
      tradeInInterest: Boolean(body.tradeInInterest),
      message: body.message || '',
      status: 'New',
    })

    let emailSent = false
    try {
      // Automatically send confirmation email to the user (and alert admin)
      const emailResult = await sendConfirmationEmail({
        to: body.email,
        name: body.name,
        type: body.type || 'General enquiry',
        annualSales: body.annualSales || body.salesVolume || 'Not Specified',
        message: body.message || '',
        tradeInInterest: Boolean(body.tradeInInterest),
      })
      emailSent = Boolean(emailResult?.success)
    } catch (mailErr) {
      console.error('Email sending failed, but lead was recorded:', mailErr)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully! Our team will get back to you within 24 hours.',
        lead: createdLead,
        emailSent,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error processing enquiry', error: String(error) },
      { status: 500 }
    )
  }
}
