import React, { useState, useEffect } from 'react';

export interface Prospect {
  id: string;
  businessName: string;
  type: string;
  location: string;
  dateContacted: string;
  contactMethod: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Video Sent' | 'Replied' | 'Meeting Booked' | 'Closed';
  followUpDate: string;
  notes: string;
}

const defaultProspects: Prospect[] = [
  // Wealth Management
  { id: '1', businessName: 'Dunham Wealth', type: 'Wealth Management', location: 'Altrincham', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Needs sub-second Financial Dashboard aesthetic.' },
  { id: '2', businessName: 'Blue Circle Wealth Management', type: 'Wealth Management', location: 'Wilmslow', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Golden Triangle location.' },
  { id: '3', businessName: 'Apogee Wealth Management', type: 'Wealth Management', location: 'Knutsford', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Target with Navy Blue/Gold Prestige mockup.' },
  { id: '4', businessName: 'Chronos Wealth Management', type: 'Wealth Management', location: 'Altrincham', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Flawless mobile rendering needed for older wealthy clients.' },
  
  // Luxury Automotive
  { id: '5', businessName: 'Trevor Farrington Ltd', type: 'Classic Car Restoration', location: 'Knutsford', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. E-Types & Rolls Royce. Needs ultra-fast image loading.' },
  { id: '6', businessName: 'JMH Automotive Ltd', type: 'Specialist Automotive', location: 'Holmes Chapel', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Ferrari/Porsche specialists.' },
  { id: '7', businessName: 'DAP Cars', type: 'Luxury Automotive', location: 'Nether Alderley', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Pitch dark-mode Performance UI.' },
  { id: '8', businessName: 'FocusFive Autoworks', type: 'Classic Restoration', location: 'Cheshire', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Perfect for premium video-background hero.' },

  // Property & Surveyors
  { id: '9', businessName: 'Millar Sandy', type: 'Commercial Surveyors', location: 'Stafford', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Mobile property listings need to load in sub-seconds.' },
  { id: '10', businessName: 'Croft Architecture', type: 'Architects', location: 'Stafford', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Portfolio needs to load flawlessly during pitch meetings.' },
  { id: '11', businessName: 'Rushton Hickman', type: 'Commercial Agency', location: 'Staffordshire', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Frictionless B2B Lead Capture.' },
  { id: '12', businessName: 'LK Luxury Landscapers', type: 'Luxury Landscaping', location: 'Alderley Edge', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. High-end Cheshire postcodes.' },
  { id: '13', businessName: 'Cheshire Bespoke Building Ltd', type: 'Bespoke Builders', location: 'Macclesfield', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. High-ticket extensions and custom builds.' },
  { id: '14', businessName: 'Kimble Roden Architects', type: 'Architects', location: 'Alderley Edge', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Super homes architects.' },

  // Healthcare
  { id: '15', businessName: 'Globe Dental Practice', type: 'Private Dentist', location: 'Nantwich', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. High-conversion mobile booking needed.' },
  { id: '16', businessName: 'Crown Bank Dental', type: 'Private Dentist', location: 'Sandbach', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Specialist Implant Clinic.' },
  { id: '17', businessName: 'The Nantwich Clinic', type: 'Private Clinic', location: 'Nantwich', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '10/10 Priority. Multi-specialty.' },

  // Engineering & Logistics
  { id: '18', businessName: 'Glebe Engineering', type: 'Precision Engineering', location: 'Stoke-on-Trent', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Deals with motorsport/aerospace.' },
  { id: '19', businessName: 'Beagle Engineering', type: 'Precision Engineering', location: 'Stoke-on-Trent', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Aerospace / Defence Machining.' },
  { id: '20', businessName: 'Lingl UK', type: 'Manufacturing', location: 'Congleton', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '9/10 Priority. Massive B2B scale.' },
  { id: '21', businessName: 'Boughey Logistics', type: 'Logistics', location: 'Crewe', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '8/10 Priority. Target for corporate B2B digital transformation.' },
  { id: '22', businessName: 'Chris Bennett (Heavy Haulage) Ltd', type: 'Logistics', location: 'Stoke-on-Trent', dateContacted: '', contactMethod: '', email: '', phone: '', status: 'Pending', followUpDate: '', notes: '8/10 Priority. FORS Gold accredited.' }
];

export const ProspectTable: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('dw_crm_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      const newProspects = defaultProspects.filter(dp => !parsed.some((p: Prospect) => p.id === dp.id || p.businessName === dp.businessName));
      if (newProspects.length > 0) {
        const merged = [...parsed, ...newProspects];
        setProspects(merged);
        localStorage.setItem('dw_crm_v3', JSON.stringify(merged));
      } else {
        setProspects(parsed);
      }
    } else {
      setProspects(defaultProspects);
      localStorage.setItem('dw_crm_v3', JSON.stringify(defaultProspects));
    }
  }, []);

  // Save to LocalStorage
  const saveToStorage = (data: Prospect[]) => {
    setProspects(data);
    localStorage.setItem('dw_crm_v3', JSON.stringify(data));
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
      email: '',
    phone: '',
      status: 'Pending',
      followUpDate: '',
      notes: ''
    };
    saveToStorage([newProspect, ...prospects]);
    setIsEditing(newProspect.id);
  };

  const handleDeleteProspect = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this lead?');
    if (confirmDelete) {
      const updated = prospects.filter(p => p.id !== id);
      saveToStorage(updated);
    }
  };

  const exportCSV = () => {
    const headers = ['Business Name', 'Type', 'Location', 'Date Contacted', 'Contact Method', 'Email', 'Phone', 'Status', 'Follow-up Date', 'Notes'];
    const rows = prospects.map(p => [
      `"${p.businessName}"`,
      `"${p.type}"`,
      `"${p.location}"`,
      `"${p.dateContacted}"`,
      `"${p.contactMethod}"`,
      `"${p.email}"`,
      `"${p.phone}"`,
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
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
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
                    <input value={p.email || ''} onChange={e => handleUpdateField(p.id, 'email', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-full" placeholder="Email" />
                  ) : (
                    p.email || <span className="text-[#aeb1b4] italic">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {isEditing === p.id ? (
                    <input value={p.phone || ''} onChange={e => handleUpdateField(p.id, 'phone', e.target.value)} className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-full" placeholder="Phone" />
                  ) : (
                    p.phone || <span className="text-[#aeb1b4] italic">-</span>
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
                  <div className="flex gap-2 items-center">
                    <button 
                      onClick={() => isEditing === p.id ? setIsEditing(null) : setIsEditing(p.id)}
                      className="text-[#aeb1b4] hover:text-white transition-colors"
                    >
                      {isEditing === p.id ? 'Save' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => handleDeleteProspect(p.id)}
                      className="text-red-500/70 hover:text-red-500 transition-colors text-xs ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {prospects.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#aeb1b4]">
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
