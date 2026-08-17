import React, { useState } from 'react';
import { useToolParams, getWhatsAppUrl } from '../../hooks/useToolParams';

export function BookingForm() {
  const { phone, hasCustomPhone, biz, trade } = useToolParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (8am - 12pm)');
  const [notes, setNotes] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPhone = hasCustomPhone ? phone : userPhone;
    const msg = `Hi ${biz}, I would like to book a ${trade} inspection.\nDate: ${date || 'Earliest available'}\nTime: ${time}\nDetails: ${notes || 'Standard check'}`;
    window.open(getWhatsAppUrl(targetPhone, msg), '_blank');
  };

  return (
    <form
      onSubmit={handleBook}
      className="bg-[#0f1218] border border-slate-800 rounded-xl p-5 text-white max-w-md w-full shadow-xl space-y-3"
    >
      <h3 className="font-bold text-base text-white">Book an Appointment with {biz}</h3>
      <p className="text-xs text-slate-400">Select your preferred date &amp; time slot:</p>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Time Window</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-500"
        >
          <option>Morning (8am - 12pm)</option>
          <option>Afternoon (12pm - 4pm)</option>
          <option>Evening / After 5pm</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Quick Note / Address</label>
        <input
          type="text"
          placeholder="e.g. ST7 Postcode, boiler leaking"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-500"
        />
      </div>

      {!hasCustomPhone && (
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Enter your mobile to test on your phone:
          </label>
          <input
            type="tel"
            placeholder="e.g. 07123 456789"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg p-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-lg shadow-red-600/20"
      >
        Confirm via WhatsApp
      </button>
    </form>
  );
}
