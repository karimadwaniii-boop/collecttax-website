import nodemailer from 'nodemailer'

interface EmailParams {
  to: string
  name: string
  type: string
  annualSales: string
  message: string
  tradeInInterest: boolean
}

// Nodemailer transport configuration
function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // Fallback to local Ethereal or test console logger if credentials aren't provided yet
  return null
}

export async function sendConfirmationEmail(params: EmailParams) {
  const { to, name, type, annualSales, message, tradeInInterest } = params

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080808; color: #ffffff; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #19e619; border-radius: 16px; padding: 32px; }
        .logo { font-size: 26px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: -0.5px; }
        .logo span { color: #19e619; }
        .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #19e619; margin-top: 4px; font-weight: 700; }
        h1 { font-size: 22px; color: #ffffff; margin-top: 24px; font-weight: 800; }
        p { font-size: 14px; line-height: 1.6; color: #a1a1aa; }
        .summary-box { background-color: #1a1a1a; border-radius: 12px; padding: 18px; margin: 20px 0; border-left: 4px solid #19e619; }
        .summary-box p { margin: 6px 0; color: #e4e4e7; font-size: 13px; }
        .summary-box strong { color: #ffffff; }
        .badge { display: inline-block; background-color: rgba(25,230,25,0.15); color: #19e619; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .footer { margin-top: 30px; border-top: 1px solid #27272a; padding-top: 18px; font-size: 12px; color: #71717a; text-align: center; }
        .footer a { color: #19e619; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">Collect<span>Tax</span></div>
        <div class="tagline">UK Specialist TCG & Collectibles Accounting</div>
        
        <h1>Thank you for contacting CollectTax, ${name}!</h1>
        
        <p>We have successfully received your consultation inquiry. As specialist accountants for Pokémon, One Piece, sports cards, and live stream sellers (Whatnot/eBay), we understand your specific market without any accountant jargon.</p>
        
        <div class="summary-box">
          <p><strong>Enquiry Category:</strong> ${type}</p>
          <p><strong>Approx Turnover:</strong> ${annualSales}</p>
          ${tradeInInterest ? '<p><strong>Fee Payment:</strong> <span class="badge">TCG Slabs / Trade-In Opted</span></p>' : ''}
          <p><strong>Your Notes:</strong> "${message}"</p>
        </div>
        
        <p><strong>What happens next?</strong><br/>
        A dedicated CollectTax specialist will review your situation and get in touch with you within <strong>24 business hours</strong>.</p>
        
        <p>Need urgent support regarding an HMRC Nudge Letter or 30-day deadline? Reply directly to this email or contact us at <a href="mailto:info@collecttax.co.uk" style="color: #19e619;">info@collecttax.co.uk</a>.</p>
        
        <div class="footer">
          CollectTax UK • Pokémon, Sports Cards & Collectibles Tax Advisors<br />
          <a href="https://collecttax.co.uk">www.collecttax.co.uk</a> • London, United Kingdom
        </div>
      </div>
    </body>
    </html>
  `

  const transporter = getTransporter()

  if (transporter) {
    try {
      // 1. Send confirmation to user from info@collecttax.com
      await transporter.sendMail({
        from: `"CollectTax UK" <${process.env.SMTP_FROM || 'info@collecttax.com'}>`,
        to,
        subject: `CollectTax: We received your enquiry, ${name}`,
        html: htmlContent,
      })

      // 2. Also notify the CollectTax admin inbox (info@collecttax.com)
      await transporter.sendMail({
        from: `"CollectTax Leads" <${process.env.SMTP_FROM || 'info@collecttax.com'}>`,
        to: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@collecttax.com',
        subject: `⚡ New Lead: ${name} (${type})`,
        html: `
          <h3>New Lead Received on CollectTax:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${to}</p>
          <p><strong>Category:</strong> ${type}</p>
          <p><strong>Sales Volume:</strong> ${annualSales}</p>
          <p><strong>Trade-In:</strong> ${tradeInInterest ? 'YES' : 'NO'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      })
      console.log(`[Email Dispatched] Confirmation sent to ${to}`)
      return { success: true, method: 'smtp' }
    } catch (error) {
      console.error('[Email Error] Failed to send email via SMTP:', error)
      return { success: false, error: String(error) }
    }
  } else {
    // Development fallback: Log simulated email delivery so testing works out of the box without crashing
    console.log('--------------------------------------------------')
    console.log(`[SIMULATED EMAIL DISPATCH] Sent confirmation email to: ${to}`)
    console.log(`Subject: CollectTax: We received your enquiry, ${name}`)
    console.log(`Recipient Name: ${name}`)
    console.log('--------------------------------------------------')
    return { success: true, method: 'simulated' }
  }
}
