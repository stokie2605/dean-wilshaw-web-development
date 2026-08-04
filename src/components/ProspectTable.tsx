import React, { useState, useEffect } from 'react';
import { Check, Edit, Trash2, Plus, AlertCircle, Download, Upload } from 'lucide-react';

export type LeadStatus = 
  | 'Not Contacted'
  | 'Email Sent'
  | 'Followed Up'
  | 'Accepted'
  | 'Not Accepted';

export interface Lead {
  id: string;
  business: string;
  industry: string;
  contact: string;
  auditDone: boolean;
  date: string;
  status: LeadStatus;
}

const STORAGE_KEY = 'dw_crm_leads_v2';

export const ProspectTable: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Lead, 'id'>>({
    business: '',
    industry: '',
    contact: '',
    auditDone: false,
    date: new Date().toISOString().split('T')[0],
    status: 'Not Contacted'
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const toggleAudit = (id: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, auditDone: !lead.auditDone } : lead
    ));
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ['Business', 'Industry', 'Contact', 'Audit', 'Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        `"${l.business.replace(/"/g, '""')}"`,
        `"${l.industry.replace(/"/g, '""')}"`,
        `"${l.contact.replace(/"/g, '""')}"`,
        l.auditDone ? 'Yes' : 'No',
        `"${l.date}"`,
        `"${l.status}"`
      ].join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\\n').filter(line => line.trim() !== '');
      if (lines.length < 2) return;

      const newLeads: Lead[] = lines.slice(1).map(line => {
        const regex = /(?:\\"([^\\"]*(?:\\"\\"[^\\"]*)*)\\"|([^,]+))/g;
        const values: string[] = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
          values.push(match[1] ? match[1].replace(/\\"\\"/g, '\\"') : match[2] || '');
        }

        return {
          id: crypto.randomUUID(),
          business: values[0]?.trim() || 'Unknown',
          industry: values[1]?.trim() || '',
          contact: values[2]?.trim() || '',
          auditDone: values[3]?.trim().toLowerCase() === 'yes',
          date: values[4]?.trim() || new Date().toISOString().split('T')[0],
          status: (values[5]?.trim() as LeadStatus) || 'Not Contacted'
        };
      });

      setLeads(prev => [...newLeads, ...prev]);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleOpenAddModal = () => {
    setEditingLead(null);
    setFormData({
      business: '',
      industry: '',
      contact: '',
      auditDone: false,
      date: new Date().toISOString().split('T')[0],
      status: 'Not Contacted'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      business: lead.business,
      industry: lead.industry,
      contact: lead.contact,
      auditDone: lead.auditDone,
      date: lead.date,
      status: lead.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      setLeads(prev => prev.map(l => l.id === editingLead.id ? { ...formData, id: editingLead.id } : l));
    } else {
      const newLead: Lead = { ...formData, id: crypto.randomUUID() };
      setLeads(prev => [newLead, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 text-slate-100">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Lead Pipeline</h2>
          <p className="text-sm text-slate-400">Manage local pitches, audits, and outreach status.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg font-medium transition text-sm shadow-md cursor-pointer border border-slate-700">
            <Upload size={16} /> Import
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg font-medium transition text-sm shadow-md border border-slate-700"
          >
            <Download size={16} /> Export
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition text-sm shadow-md ml-2"
          >
            <Plus size={16} /> Add Manual Lead
          </button>
        </div>
      </div>

      {/* Clean Table */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-xs font-semibold tracking-wider">
                <th className="py-4 px-4">Business</th>
                <th className="py-4 px-4">Industry</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4 text-center">Audit</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <AlertCircle className="mx-auto mb-2 opacity-50" size={24} />
                    No leads saved yet. Click <strong>"Add Manual Lead"</strong> above to start.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">{lead.business}</td>
                    <td className="py-3.5 px-4 text-slate-400">{lead.industry || '—'}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">{lead.contact || '—'}</td>
                    
                    {/* Audit Checkbox Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleAudit(lead.id)}
                        title={lead.auditDone ? "Mark Audit Incomplete" : "Mark Audit Complete"}
                        className={`w-6 h-6 rounded border flex items-center justify-center mx-auto transition ${
                          lead.auditDone 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                            : 'border-slate-600 hover:border-slate-400 text-transparent'
                        }`}
                      >
                        <Check size={14} className={lead.auditDone ? "opacity-100" : "opacity-0"} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-xs">{lead.date}</td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-medium focus:outline-none focus:border-slate-500 ${
                          lead.status === 'Accepted' ? 'text-emerald-400 border-emerald-500/50' :
                          lead.status === 'Not Accepted' ? 'text-rose-400 border-rose-500/50' :
                          lead.status === 'Followed Up' ? 'text-amber-400 border-amber-500/50' :
                          lead.status === 'Email Sent' ? 'text-sky-400 border-sky-500/50' :
                          'text-slate-400'
                        }`}
                      >
                        <option value="Not Contacted">Not Contacted</option>
                        <option value="Email Sent">Email Sent</option>
                        <option value="Followed Up">Followed Up</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Not Accepted">Not Accepted</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(lead)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
                          title="Edit Lead"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                          title="Delete Lead"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingLead ? 'Edit Lead' : 'Add New Lead'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Business Name</label>
                <input
                  required
                  type="text"
                  value={formData.business}
                  onChange={e => setFormData({ ...formData, business: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Premier Recoveries"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Vehicle Recovery"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Contact (Email/Phone)</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={e => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  placeholder="info@premier.co.uk / 01782..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Not Contacted">Not Contacted</option>
                    <option value="Email Sent">Email Sent</option>
                    <option value="Followed Up">Followed Up</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Not Accepted">Not Accepted</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="auditModal"
                  checked={formData.auditDone}
                  onChange={e => setFormData({ ...formData, auditDone: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="auditModal" className="text-sm text-slate-300 cursor-pointer">
                  Audit Completed
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
