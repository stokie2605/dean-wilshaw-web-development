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
      className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 text-slate-900 dark:text-white max-w-md w-full shadow-md space-y-3 transition-colors"
    >
      <h3 className="font-bold text-base text-slate-900 dark:text-white">Book an Appointment with {biz}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">Select your preferred date &amp; time slot:</p>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Window</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
        >
          <option>Morning (8am - 12pm)</option>
          <option>Afternoon (12pm - 4pm)</option>
          <option>Evening / After 5pm</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quick Note / Address</label>
        <input
          type="text"
          placeholder="e.g. ST7 Postcode, boiler leaking"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
        />
      </div>

      {!hasCustomPhone && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Enter your mobile to test on your phone:
          </label>
          <input
            type="tel"
            placeholder="e.g. 07123 456789"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20"
      >
        Confirm via WhatsApp
      </button>
    </form>
  );
}
