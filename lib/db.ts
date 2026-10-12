import fs from 'fs'
import path from 'path'
import { initialLeads, initialClients, type Lead, type ClientAccount } from '@/lib/admin-data'

const dataDir = path.join(process.cwd(), 'data')
const leadsFilePath = path.join(dataDir, 'leads.json')
const clientsFilePath = path.join(dataDir, 'clients.json')

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// ---------------- LEADS STORE ----------------
export function getLeads(): Lead[] {
  ensureDataDirectory()
  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, JSON.stringify(initialLeads, null, 2), 'utf-8')
    return initialLeads
  }
  try {
    const raw = fs.readFileSync(leadsFilePath, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error reading leads.json:', error)
    return initialLeads
  }
}

export function saveLeads(leads: Lead[]) {
  ensureDataDirectory()
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8')
}

export function addLead(newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: Lead['status'] }): Lead {
  const currentLeads = getLeads()
  const newLead: Lead = {
    id: `LEAD-${Date.now().toString().slice(-4)}`,
    name: newLeadData.name,
    email: newLeadData.email,
    phone: newLeadData.phone || '',
    type: newLeadData.type || 'General Collector / Trader',
    annualSales: newLeadData.annualSales || 'Not Specified',
    tradeInInterest: Boolean(newLeadData.tradeInInterest),
    message: newLeadData.message || '',
    status: newLeadData.status || 'New',
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    notes: newLeadData.tradeInInterest ? 'Customer opted into TCG Slabs Trade-in.' : '',
  }

  const updated = [newLead, ...currentLeads]
  saveLeads(updated)
  return newLead
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const currentLeads = getLeads()
  const index = currentLeads.findIndex((l) => l.id === id)
  if (index === -1) return null

  currentLeads[index] = { ...currentLeads[index], ...updates }
  saveLeads(currentLeads)
  return currentLeads[index]
}

export function deleteLead(id: string): boolean {
  const currentLeads = getLeads()
  const filtered = currentLeads.filter((l) => l.id !== id)
  if (filtered.length === currentLeads.length) return false
  saveLeads(filtered)
  return true
}

// ---------------- CLIENTS STORE ----------------
export function getClients(): ClientAccount[] {
  ensureDataDirectory()
  if (!fs.existsSync(clientsFilePath)) {
    fs.writeFileSync(clientsFilePath, JSON.stringify(initialClients, null, 2), 'utf-8')
    return initialClients
  }
  try {
    const raw = fs.readFileSync(clientsFilePath, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error reading clients.json:', error)
    return initialClients
  }
}

export function saveClients(clients: ClientAccount[]) {
  ensureDataDirectory()
  fs.writeFileSync(clientsFilePath, JSON.stringify(clients, null, 2), 'utf-8')
}
