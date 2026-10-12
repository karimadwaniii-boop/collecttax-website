'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Users, 
  FileText, 
  ShieldAlert, 
  TrendingUp, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  Building2, 
  Lock, 
  Layers, 
  DollarSign, 
  Download,
  Plus,
  RefreshCw,
  LogOut,
  ChevronRight,
  AlertCircle,
  Trash2
} from 'lucide-react'
import { Wordmark } from '@/components/wordmark'
import { initialLeads, initialClients, type Lead, type ClientAccount } from '@/lib/admin-data'

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState(false)

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'leads' | 'clients' | 'hmrc' | 'settings'>('leads')
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [clients, setClients] = useState<ClientAccount[]>(initialClients)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Selected Lead Drawer
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Fetch live data from backend API
  async function fetchBackendData() {
    setIsRefreshing(true)
    try {
      const [leadsRes, clientsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/clients')
      ])
      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json()
        if (leadsJson.leads) setLeads(leadsJson.leads)
      }
      if (clientsRes.ok) {
        const clientsJson = await clientsRes.json()
        if (clientsJson.clients) setClients(clientsJson.clients)
      }
    } catch (err) {
      console.error('Error fetching backend data:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBackendData()
    }
  }, [isAuthenticated])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // Admin password (demo accessible)
    if (passwordInput === 'admin' || passwordInput === 'collecttax' || passwordInput === 'Collecta_123') {
      setIsAuthenticated(true)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  async function updateLeadStatus(id: string, newStatus: Lead['status']) {
    // Optimistic UI update
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l))
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus })
    }

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
    } catch (err) {
      console.error('Failed to sync status with server:', err)
    }
  }

  async function deleteLeadEntry(id: string) {
    if (!confirm('Are you sure you want to remove this lead record?')) return
    
    setLeads(leads.filter(l => l.id !== id))
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null)
    }

    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.error('Failed to delete on server:', err)
    }
  }

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Quick Stats
  const newLeadsCount = leads.filter(l => l.status === 'New').length
  const urgentHmrcCount = leads.filter(l => l.type.includes('HMRC')).length
  const tradeInCount = leads.filter(l => l.tradeInInterest).length
  const totalClientTurnover = clients.reduce((acc, c) => acc + c.currentYearTurnover, 0)

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-5 relative overflow-hidden">
        <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-brand/10 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md rounded-[2.5rem] border border-brand/40 bg-card/60 p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(25,230,25,0.3)] relative z-10 text-center">
          <Wordmark className="text-3xl mx-auto" />
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            <Lock className="size-3" /> Secure Admin Portal
          </div>

          <h2 className="mt-4 font-display text-2xl font-extrabold uppercase [font-stretch:85%]">
            Advisor Management
          </h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Manage incoming collector leads, HMRC urgent disclosures &amp; client accounts.
          </p>

          <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                Admin Access Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (e.g. admin or collecttax)"
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3.5 text-sm text-white placeholder:text-muted-foreground/50 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-all"
              />
              {authError && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="size-3.5" /> Incorrect password. (Use: <strong>admin</strong> or <strong>collecttax</strong>)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-black shadow-[0_0_25px_-5px_rgba(25,230,25,0.6)] hover:scale-[1.02] transition-transform"
            >
              <Lock className="size-4" />
              <span>Enter Admin Dashboard</span>
            </button>

            <Link
              href="/"
              className="mt-2 text-center text-xs text-muted-foreground hover:text-white transition-colors"
            >
              &larr; Back to Public Website
            </Link>
          </form>
        </div>
      </div>
    )
  }

  // 2. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col">
      {/* Top Admin Bar */}
      <header className="border-b border-white/10 bg-[#090909]/80 backdrop-blur-xl sticky top-0 z-40 px-5 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" title="Go to website">
            <Wordmark className="text-xl" />
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-0.5 text-[11px] font-bold text-brand uppercase tracking-wider">
            Admin Console v1.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">Lead Manager</p>
            <p className="text-[10px] text-brand">info@collecttax.co.uk</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-5 md:p-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-brand/30 bg-card/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">New Enquiries</span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand/20 text-brand"><Clock className="size-3.5" /></span>
            </div>
            <p className="font-display text-3xl font-extrabold text-brand [font-stretch:80%]">{newLeadsCount}</p>
            <p className="text-[11px] text-white/60 mt-1">Requires advisor callback</p>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-card/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">HMRC Urgency</span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400"><ShieldAlert className="size-3.5" /></span>
            </div>
            <p className="font-display text-3xl font-extrabold text-red-400 [font-stretch:80%]">{urgentHmrcCount}</p>
            <p className="text-[11px] text-white/60 mt-1">Nudge letters / Compliance</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Trade-In Queries</span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand/20 text-brand"><Sparkles className="size-3.5" /></span>
            </div>
            <p className="font-display text-3xl font-extrabold text-white [font-stretch:80%]">{tradeInCount}</p>
            <p className="text-[11px] text-white/60 mt-1">Paying in slabs &amp; boxes</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Managed Turnover</span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-white"><DollarSign className="size-3.5" /></span>
            </div>
            <p className="font-display text-3xl font-extrabold text-white [font-stretch:80%]">£{(totalClientTurnover / 1000).toFixed(0)}k</p>
            <p className="text-[11px] text-white/60 mt-1">Across active client roster</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'leads', label: 'Consultation Enquiries', count: leads.length },
              { id: 'clients', label: 'Active Client Accounts', count: clients.length },
              { id: 'hmrc', label: 'HMRC Case Tracker', count: urgentHmrcCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand text-black shadow-md'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-white/10 text-white'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBackendData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-brand hover:text-brand transition-colors disabled:opacity-50"
              title="Refresh leads and data from backend"
            >
              <RefreshCw className={`size-3.5 ${isRefreshing ? 'animate-spin text-brand' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
            </button>

            <button
              onClick={() => {
                const csvData = leads.map(l => `${l.name},${l.email},${l.phone},${l.type},${l.status}`).join('\n')
                const blob = new Blob([csvData], { type: 'text/csv' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'collecttax-leads.csv'
                a.click()
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-brand hover:text-brand transition-colors"
            >
              <Download className="size-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 1. LEADS VIEW */}
        {activeTab === 'leads' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search lead by name, email, platform or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-card/60 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground/50 outline-none focus:border-brand transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase font-bold">Status:</span>
                {['All', 'New', 'In Review', 'Contacted', 'Closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      statusFilter === status
                        ? 'border border-brand bg-brand/10 text-brand'
                        : 'border border-white/10 bg-card/40 text-muted-foreground hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-card/50 backdrop-blur-xl">
              <table className="w-full text-left text-sm border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Contact</th>
                    <th className="p-4">Trader Type</th>
                    <th className="p-4">Turnover Scope</th>
                    <th className="p-4">Trade-In</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredLeads.map(lead => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="p-4">
                        <p className="font-bold text-white group-hover:text-brand transition-colors">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                        <p className="text-[11px] text-white/50">{lead.phone}</p>
                      </td>

                      <td className="p-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          lead.type.includes('HMRC') 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-white/5 text-white/80 border border-white/10'
                        }`}>
                          {lead.type}
                        </span>
                      </td>

                      <td className="p-4 text-xs text-white/80">
                        {lead.annualSales}
                      </td>

                      <td className="p-4">
                        {lead.tradeInInterest ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-brand">
                            <Sparkles className="size-3" /> Yes (Cards)
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Cash only</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          lead.status === 'New' ? 'bg-brand/20 text-brand border border-brand/40' :
                          lead.status === 'In Review' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                          lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                          'bg-white/10 text-muted-foreground'
                        }`}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs text-brand font-semibold group-hover:translate-x-1 transition-transform">
                          <span>Details</span>
                          <ChevronRight className="size-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. ACTIVE CLIENTS VIEW */}
        {activeTab === 'clients' && (
          <div className="grid gap-5 md:grid-cols-2">
            {clients.map(client => (
              <div key={client.id} className="rounded-3xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand">{client.id}</span>
                    <h3 className="font-display text-2xl font-extrabold uppercase [font-stretch:85%] text-white">{client.traderName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{client.businessType} • {client.packageEnrolled}</p>
                  </div>
                  <span className="rounded-full bg-brand/20 border border-brand/40 px-3 py-1 text-xs font-bold text-brand">
                    {client.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs border-y border-white/10 py-4">
                  <div>
                    <span className="text-muted-foreground">Rolling Turnover:</span>
                    <p className="font-bold text-white text-base font-mono">£{client.currentYearTurnover.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">VAT Regime:</span>
                    <p className="font-bold text-brand text-base">{client.vatStatus}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Platforms Traded:</span>
                    <span className="text-white/80">{client.primaryPlatforms.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Next Filing Deadline:</span>
                    <span className="font-bold text-amber-400">{client.nextHmrDeadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Payment Plan:</span>
                    <span className="text-white">{client.paymentMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. HMRC CASE TRACKER VIEW */}
        {activeTab === 'hmrc' && (
          <div className="rounded-3xl border border-red-500/30 bg-card/60 p-8 backdrop-blur-2xl">
            <div className="flex items-start gap-4 mb-6">
              <span className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40">
                <ShieldAlert className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase [font-stretch:85%] text-white">
                  Active HMRC Nudge Letter &amp; Compliance Enquiries
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Urgent 30-day response window cases being represented by CollectTax UK.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.filter(l => l.type.includes('HMRC')).map(lead => (
                <div key={lead.id} className="rounded-2xl border border-white/10 bg-black/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{lead.name}</span>
                      <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">Urgent Enquiry</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{lead.email} • {lead.phone}</p>
                    <p className="text-xs text-white/90 mt-2 bg-white/5 p-3 rounded-xl border border-white/5 max-w-xl">
                      &ldquo;{lead.message}&rdquo;
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    <span className="text-xs text-brand font-semibold">Stage: {lead.status}</span>
                    <a
                      href={`mailto:${lead.email}?subject=CollectTax UK: Formal HMRC Response Support for ${encodeURIComponent(lead.name)}`}
                      className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-black hover:scale-105 transition-transform"
                    >
                      Draft Representation Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* LEAD DETAIL MODAL / DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-brand/40 bg-[#0d0d0d] p-6 md:p-8 shadow-[0_20px_100px_rgba(25,230,25,0.3)] relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute right-6 top-6 size-8 rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white flex items-center justify-center text-sm"
            >
              &times;
            </button>

            <span className="text-xs uppercase font-bold text-brand">{selectedLead.id}</span>
            <h3 className="font-display text-3xl font-extrabold uppercase [font-stretch:85%] text-white mt-1">
              {selectedLead.name}
            </h3>
            <p className="text-xs text-muted-foreground">{selectedLead.createdAt} • Submitted via Discovery Form</p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-xs">
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.phone || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Trader Category:</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.type}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Reported Annual Volume:</span>
                <p className="font-bold text-brand mt-0.5">{selectedLead.annualSales}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-muted-foreground uppercase font-bold">Trader&apos;s Message:</span>
              <p className="mt-2 text-sm text-white/95 bg-white/5 p-4 rounded-2xl border border-white/10 leading-relaxed">
                {selectedLead.message}
              </p>
            </div>

            {selectedLead.tradeInInterest && (
              <div className="mt-4 p-3 rounded-xl border border-brand/40 bg-brand/10 flex items-center gap-2 text-xs text-brand font-bold">
                <Sparkles className="size-4" /> Client requested paying accountancy fees via Graded Slabs / Trade-In
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Update Status:</span>
                {(['New', 'In Review', 'Contacted', 'Closed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => updateLeadStatus(selectedLead.id, st)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      selectedLead.status === st
                        ? 'bg-brand text-black'
                        : 'bg-white/5 text-muted-foreground hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => deleteLeadEntry(selectedLead.id)}
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
                  title="Remove lead"
                >
                  <Trash2 className="size-3.5" />
                  <span>Delete</span>
                </button>
                <a
                  href={`mailto:${selectedLead.email}?subject=CollectTax UK: Consultation Discovery Response`}
                  className="rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-black hover:scale-105 transition-transform"
                >
                  Send Email Response
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
