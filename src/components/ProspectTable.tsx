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
  {
    id: '1',
    businessName: 'Watts Mortgage & Wealth Management',
    type: 'Financial Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Mobile: 36, Desktop: 86. Severely slow mobile load speed on high-ticket financial lead gen site.'
  },
  {
    id: '2',
    businessName: 'FW Power Generators',
    type: 'B2B Industrial',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Mobile: 39, Desktop: 55, Best Practices: 58. High-ticket B2B industrial target with critical mobile performance and console/security errors.'
  },
  {
    id: '3',
    businessName: 'Webb House Furnishers',
    type: 'Retail / Showroom',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Mobile: 43, Desktop: 60, SEO: 83. High-end showroom site in deep red. Slow gallery load times hurting mobile shoppers.'
  },
  {
    id: '4',
    businessName: 'Hall Smith Whittingham Solicitors',
    type: 'Legal Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Mobile: 55, Desktop: 78. Outdated mobile performance causing bounce rate on legal enquiries.'
  },
  {
    id: '5',
    businessName: 'AJ Joinery & Building Ltd',
    type: 'Trade / Construction',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Mobile: 56, Desktop: 74. High-value local trade lead. Slow mobile load time affecting project portfolio views.'
  },
  {
    id: '6',
    businessName: 'Bowcock Cuerden LLP',
    type: 'Legal Services',
    location: 'South Cheshire',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Mobile: 64, Desktop: 71, SEO: 85. Dual opportunity: Mobile speed upgrade + technical SEO ranking fixes.'
  },
  {
    id: '7',
    businessName: 'Premier Recoveries',
    type: 'Vehicle Recovery',
    location: 'Stoke-on-Trent',
    dateContacted: '',
    contactMethod: 'WhatsApp',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'Needs 4s load time fixed.'
  },
  {
    id: '8',
    businessName: 'Burke Bros Recovery',
    type: 'Vehicle Recovery',
    location: 'Stafford',
    dateContacted: '',
    contactMethod: 'WhatsApp',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'M6 Corridor lead.'
  },
  {
    id: '9',
    businessName: 'D L Evans & Son Roofing',
    type: 'Roofing',
    location: 'Crewe',
    dateContacted: '',
    contactMethod: 'Email',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: 'Heritage brand.'
  },
  {
    id: '10',
    businessName: 'Wall Street Clothing',
    type: 'Menswear / Tailoring',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Smart suit & outfit finder. Prototype: https://wallstreet-clothing.web.app'
  },
  {
    id: '11',
    businessName: "Alexandra's of Alsager Jewellers",
    type: 'Luxury Jewellery',
    location: 'Alsager',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Custom ring builder & consultation booking. Prototype: https://alexandras-jewellers.web.app'
  },
  {
    id: '12',
    businessName: 'Handmade Naturals',
    type: 'Organic Skincare',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Personalized 3-step skincare routine finder. Prototype: https://handmade-naturals.web.app'
  },
  {
    id: '13',
    businessName: 'Alsager Computers',
    type: 'IT / Tech Repair',
    location: 'Alsager',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Repair cost estimator & shop drop-off booking. Prototype: https://alsager-computers.web.app'
  },
  {
    id: '14',
    businessName: 'Smart Choice Uniforms',
    type: 'School & Workwear',
    location: 'South Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] School uniform bundler & workwear quote app. Prototype: https://smartchoice-uniforms.web.app'
  },
  {
    id: '15',
    businessName: 'RM Cybernetics',
    type: 'High-Tech Hardware',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] High-voltage spec finder & custom circuit app. Prototype: https://rm-cybernetics.web.app'
  },
  {
    id: '16',
    businessName: 'Alec Ross Carpets',
    type: 'Flooring & Carpets',
    location: 'South Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Video Sent',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Room area estimator & home measuring visit app. Prototype: https://alecross-carpets.web.app'
  },
  {
    id: '17',
    businessName: 'Just Roofs Cheshire',
    type: 'Roofing / Construction',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Trading Standards-approved. Needs mobile performance review and high-ticket service UX upgrade.'
  },
  {
    id: '18',
    businessName: 'Cheshire Roofing',
    type: 'Roofing / Construction',
    location: 'Macclesfield',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Covers Congleton, Knutsford, Wilmslow. Prime candidate for emergency call-out high-conversion landing page.'
  },
  {
    id: '19',
    businessName: 'Apex Roofing Cheshire',
    type: 'Roofing / Construction',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Emergency roofing services. Target for sub-second mobile rendering to capture urgent traffic.'
  },
  {
    id: '20',
    businessName: 'P D Roofing & Building Contractors',
    type: 'Roofing / Construction',
    location: 'Cheshire',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Multi-service (slate, tile, flat). Needs portfolio restructure and modern lead capture forms.'
  },
  {
    id: '21',
    businessName: 'Octagon Bespoke',
    type: 'Luxury Home Builders',
    location: 'London (Remote)',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] High-end residential. Needs sub-second mobile performance for HNW clients.'
  },
  {
    id: '22',
    businessName: 'London Projects',
    type: 'Bespoke Prime Residential',
    location: 'London (Remote)',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Prime property renovations. Target for luxury portfolio rendering speeds.'
  },
  {
    id: '23',
    businessName: '75 Harley Street Dental',
    type: 'Private Dentist',
    location: 'London (Remote)',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Harley street clinic. High-ticket cosmetic treatments. Mobile booking speed is critical.'
  },
  {
    id: '24',
    businessName: 'E11even Dental',
    type: 'Private Dentist',
    location: 'London (Remote)',
    dateContacted: '2026-07-30',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Elite dental clinic. Target for custom patient onboarding web app.'
  },
  {
    id: '25',
    businessName: 'Bee Scaffolding Manchester',
    type: 'Scaffolding',
    location: 'Manchester',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Trades target. Needs mobile speed audit for 4G contractor call-outs.'
  },
  {
    id: '26',
    businessName: 'Base Scaffolding Services',
    type: 'Scaffolding',
    location: 'Manchester',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] B2B Trades target.'
  },
  {
    id: '27',
    businessName: 'Stoke Plant Hire',
    type: 'Heavy Machinery',
    location: 'Stoke-on-Trent',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: HIGH] Plant hire for construction. Target mobile load speeds for on-site managers.'
  },
  {
    id: '28',
    businessName: 'Instant Tool and Plant Hire',
    type: 'B2B Equipment',
    location: 'Newcastle-under-Lyme',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] Staffordshire/Cheshire multi-location plant hire.'
  },
  {
    id: '29',
    businessName: 'Clee Hill Plant Hire',
    type: 'B2B Equipment',
    location: 'Stoke-on-Trent',
    dateContacted: '',
    contactMethod: '',
    email: '',
    phone: '',
    status: 'Pending',
    followUpDate: '',
    notes: '[PRIORITY: MEDIUM] B2B Equipment hire.'
  }
];

export const ProspectTable: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('dw_outreach_leads');
    if (saved) {
      const parsed = JSON.parse(saved);
      const newProspects = defaultProspects.filter(dp => !parsed.some((p: Prospect) => p.id === dp.id || p.businessName === dp.businessName));
      if (newProspects.length > 0) {
        const merged = [...parsed, ...newProspects];
        setProspects(merged);
        localStorage.setItem('dw_outreach_leads', JSON.stringify(merged));
      } else {
        setProspects(parsed);
      }
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
