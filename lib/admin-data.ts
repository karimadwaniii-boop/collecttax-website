export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  type: string
  annualSales: string
  tradeInInterest: boolean
  message: string
  status: 'New' | 'In Review' | 'Contacted' | 'Closed'
  createdAt: string
  notes?: string
}

export interface ClientAccount {
  id: string
  traderName: string
  businessType: 'Sole Trader' | 'Limited Company'
  primaryPlatforms: string[]
  currentYearTurnover: number
  vatStatus: 'Exempt' | 'Margin Scheme' | 'Standard Rate'
  nextHmrDeadline: string
  packageEnrolled: string
  paymentMethod: 'Cash / Transfer' | 'TCG Slabs / Trade-In'
  status: 'Active' | 'Pending Review' | 'Overdue'
}

export const initialLeads: Lead[] = [
  {
    id: 'LEAD-101',
    name: 'Marcus Vance',
    email: 'marcus.tcg@gmail.com',
    phone: '07892 441029',
    type: 'Full-time trader / sole trader',
    annualSales: '£50,000 - £90,000 (Approaching VAT threshold)',
    tradeInInterest: true,
    message: 'Selling high-end vintage Pokémon slabs on eBay UK & Whatnot. Exceeded £60k this year, need VAT Margin Scheme setup.',
    status: 'New',
    createdAt: '2026-10-12 18:45',
    notes: 'Interested in settling via 3x PSA 10 slabs trade-in.',
  },
  {
    id: 'LEAD-102',
    name: 'Sarah Jenkins',
    email: 's.jenkins@onepiecetrade.co.uk',
    phone: '07700 900124',
    type: 'Received an HMRC nudge letter',
    annualSales: '£10,000 - £50,000 (Active trader)',
    tradeInInterest: false,
    message: 'Received an HMRC One-to-Many letter for eBay card sales over 2024-2025. Very stressed, need urgent compliance response.',
    status: 'In Review',
    createdAt: '2026-10-11 14:20',
    notes: 'Requested urgent callback for 30-day HMRC deadline.',
  },
  {
    id: 'LEAD-103',
    name: 'Liam Gallagher',
    email: 'cardsandbreaks@outlook.com',
    phone: '07981 123456',
    type: 'Limited company / Card shop',
    annualSales: '£90,000+ (High volume / VAT registered)',
    tradeInInterest: true,
    message: 'Running a booster box break channel on Whatnot. Need full year-end statutory accounts and CT600 return.',
    status: 'Contacted',
    createdAt: '2026-10-10 09:15',
  },
  {
    id: 'LEAD-104',
    name: 'Oliver Wright',
    email: 'oliver.pokemon@hotmail.co.uk',
    phone: '07412 889900',
    type: 'Side hustle seller (eBay/Vinted/Whatnot)',
    annualSales: '£1,000 - £10,000 (Self Assessment range)',
    tradeInInterest: false,
    message: 'Downsizing personal childhood collection on Vinted. Sold about £4,000. Not sure if I need to pay income tax.',
    status: 'Closed',
    createdAt: '2026-10-08 11:30',
  },
]

export const initialClients: ClientAccount[] = [
  {
    id: 'CLT-001',
    traderName: 'Apex Slabs UK Ltd',
    businessType: 'Limited Company',
    primaryPlatforms: ['eBay', 'London Card Show', 'Whatnot'],
    currentYearTurnover: 142000,
    vatStatus: 'Margin Scheme',
    nextHmrDeadline: '31 Jan 2027 (CT600 & Accounts)',
    packageEnrolled: 'Limited Company (£1,800/yr)',
    paymentMethod: 'Cash / Transfer',
    status: 'Active',
  },
  {
    id: 'CLT-002',
    traderName: 'Kanto Vault Collectibles',
    businessType: 'Sole Trader',
    primaryPlatforms: ['Vinted', 'eBay', 'Card Shows'],
    currentYearTurnover: 48500,
    vatStatus: 'Exempt',
    nextHmrDeadline: '31 Jan 2027 (Self Assessment)',
    packageEnrolled: 'Pro Trader (£950/yr)',
    paymentMethod: 'TCG Slabs / Trade-In',
    status: 'Active',
  },
  {
    id: 'CLT-003',
    traderName: 'Rare Candy Breakers',
    businessType: 'Limited Company',
    primaryPlatforms: ['Whatnot', 'Instagram Live'],
    currentYearTurnover: 215000,
    vatStatus: 'Standard Rate',
    nextHmrDeadline: '07 Nov 2026 (Quarterly VAT)',
    packageEnrolled: 'Limited Company (£1,800/yr)',
    paymentMethod: 'Cash / Transfer',
    status: 'Active',
  },
  {
    id: 'CLT-004',
    traderName: 'Northwest TCG Trader',
    businessType: 'Sole Trader',
    primaryPlatforms: ['eBay UK', 'Birmingham Expo'],
    currentYearTurnover: 28000,
    vatStatus: 'Exempt',
    nextHmrDeadline: '31 Jan 2027 (Self Assessment)',
    packageEnrolled: 'Starter Collector (£500/yr)',
    paymentMethod: 'Cash / Transfer',
    status: 'Pending Review',
  },
]
