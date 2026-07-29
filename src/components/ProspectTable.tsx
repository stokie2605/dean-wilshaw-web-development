import React, { useState, useEffect } from 'react';

export interface Prospect {
  id: string;
  businessName: string;
  type: string;
  location: string;
  dateContacted: string;
  contactMethod: string;
  videoLinkSent: string;
  status: 'Pending' | 'Video Sent' | 'Replied' | 'Meeting Booked' | 'Closed';
  followUpDate: string;
  notes: string;
}

const defaultProspects: Prospect[] = [
  {
    id: '1',
    businessName: 'Watts Mortgage & Wealth Management',
    type: 'Financial Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Mobile: 36, Desktop: 86. Severely slow mobile load speed on high-ticket financial lead gen site.'
  },
  {
    id: '2',
    businessName: 'Hall Smith Whittingham Solicitors',
    type: 'Legal Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Mobile: 55, Desktop: 78. Outdated mobile performance causing bounce rate on legal enquiries.'
  },
  {
    id: '3',
    businessName: 'Bowcock Cuerden LLP',
    type: 'Legal Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Mobile: 64, Desktop: 71, SEO: 85. Dual opportunity: Mobile speed upgrade + technical SEO ranking fixes.'
  },
  {
    id: '4',
    businessName: 'Premier Recoveries',
    type: 'Vehicle Recovery',
    location: 'Stoke-on-Trent',
    dateContacted: '',
    contactMethod: 'WhatsApp',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'Needs 4s load time fixed.'
  },
  {
    id: '5',
    businessName: 'Burke Bros Recovery',
    type: 'Vehicle Recovery',
    location: 'Stafford',
    dateContacted: '',
    contactMethod: 'WhatsApp',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'M6 Corridor lead.'
  },
  {
    id: '6',
    businessName: 'D L Evans & Son Roofing',
    type: 'Roofing',
    location: 'Crewe',
    dateContacted: '',
    contactMethod: 'Email',
    videoLinkSent: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'Heritage brand.'
  }
];

export const ProspectTable: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('dw_outreach_leads');
    if (saved) {
      setProspects(JSON.parse(saved));
    } else {
      setProspects(defaultProspects);
      localStorage.setItem('dw_outreach_leads', JSON.stringify(defaultProspects));
    }
  }, []);

  // Save to LocalStorage
  const saveToStorage = (data: Prospect[]) => {
    setProspects(data);
    localStorage.setItem('dw_outreach_leads', JSON.stringify(data));
  };

  const handleStatusChange = (id: string, newStatus: Prospect['status']) => {
    const updated = prospects.map(p => p.id === id ? { ...p, status: newStatus } : p);
    saveToStorage(updated);
  };

  const handleUpdateField = (id: string, field: keyof Prospect, value: string) => {
    const updated = prospects.map(p => p.id === id ? { ...p, [field]: value } : p);
    saveToStorage(updated);
  };

  const addProspect = () => {
    const newProspect: Prospect = {
      id: Date.now().toString(),
      businessName: 'New Business',
      type: '',
      location: '',
      dateContacted: new Date().toISOString().split('T')[0],
      contactMethod: '',
      videoLinkSent: '',
      status: 'Pending',
      followUpDate: '',
      notes: ''
    };
    saveToStorage([newProspect, ...prospects]);
    setIsEditing(newProspect.id);
  };

  const exportCSV = () => {
    const headers = ['Business Name', 'Type', 'Location', 'Date Contacted', 'Contact Method', 'Video Link Sent', 'Status', 'Follow-up Date', 'Notes'];
    const rows = prospects.map(p => [
      `"${p.businessName}"`,
      `"${p.type}"`,
      `"${p.location}"`,
      `"${p.dateContacted}"`,
      `"${p.contactMethod}"`,
      `"${p.videoLinkSent}"`,
      `"${p.status}"`,
      `"${p.followUpDate}"`,
      `"${p.notes}"`
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'DW_Web_Outreach_Log.csv';
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'Video Sent': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Replied': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Meeting Booked': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Closed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="bg-[#2a2f32]/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#2a2f32]/80">
        <div className="flex gap-3">
          <button onClick={addProspect} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <span>+ Add Lead</span>
          </button>
        </div>
        <button onClick={exportCSV} className="bg-white text-[#191c1e] hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export Jobcentre Log (.csv)
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black/20 text-[#aeb1b4] font-medium border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Video Link</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {prospects.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-4 py-3">
                  {isEditing === p.id ? (
                    <input autoFocus value={p.businessName} onChange={e => handleUpdateField(p.id, 'businessName', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-full" />
                  ) : (
                    <div className="font-semibold">{p.businessName}</div>
                  )}
                  <div className="text-xs text-[#aeb1b4] mt-0.5">{p.type} • {p.location}</div>
                </td>
                <td className="px-4 py-3">
                  <select 
                    value={p.status} 
                    onChange={e => handleStatusChange(p.id, e.target.value as Prospect['status'])}
                    className={`appearance-none px-3 py-1 rounded-full text-xs font-bold border cursor-pointer outline-none ${getStatusColor(p.status)}`}
                  >
                    <option value="Pending" className="bg-[#2a2f32]">Pending</option>
                    <option value="Video Sent" className="bg-[#2a2f32]">Video Sent</option>
                    <option value="Replied" className="bg-[#2a2f32]">Replied</option>
                    <option value="Meeting Booked" className="bg-[#2a2f32]">Meeting Booked</option>
                    <option value="Closed" className="bg-[#2a2f32]">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  {isEditing === p.id ? (
                    <input value={p.videoLinkSent} onChange={e => handleUpdateField(p.id, 'videoLinkSent', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-full" placeholder="https://loom.com/..." />
                  ) : (
                    p.videoLinkSent ? <a href={p.videoLinkSent} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">View Video</a> : <span className="text-[#aeb1b4] italic">Not sent</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {isEditing === p.id ? (
                    <input type="date" value={p.dateContacted} onChange={e => handleUpdateField(p.id, 'dateContacted', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white" />
                  ) : (
                    p.dateContacted || '-'
                  )}
                </td>
                <td className="px-4 py-3 max-w-xs truncate">
                  {isEditing === p.id ? (
                    <input value={p.notes} onChange={e => handleUpdateField(p.id, 'notes', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-full" />
                  ) : (
                    p.notes
                  )}
                </td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => isEditing === p.id ? setIsEditing(null) : setIsEditing(p.id)}
                    className="text-[#aeb1b4] hover:text-white transition-colors"
                  >
                    {isEditing === p.id ? 'Save' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
            {prospects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#aeb1b4]">
                  No prospects yet. Add a lead to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
