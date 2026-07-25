import React, { useState } from 'react';
import { MOCK_COMPANY_PROFILE } from '../../data/fleetData';
import { CompanyProfile } from '../../types';
import { Building2, Save, Globe, Phone, Mail, FileText, CheckCircle2, Shield } from 'lucide-react';

export const CompanySettingsModule: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfile>(MOCK_COMPANY_PROFILE);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification('Company settings saved successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-5 pb-8">
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl font-semibold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />{notification}
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Company Settings & Configuration</h2>
            <p className="text-xs text-slate-500 font-medium">Enterprise profile, legal details, system localization & security settings</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Save className="w-4 h-4" />Save Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Organization Details */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-3">
            COMPANY PROFILE & LEGAL IDENTIFICATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Company Display Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Legal Registered Name</label>
              <input
                type="text"
                value={profile.legalName}
                onChange={e => setProfile({ ...profile, legalName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Head Office Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={e => setProfile({ ...profile, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">City / Postal Code</label>
              <input
                type="text"
                value={profile.city}
                onChange={e => setProfile({ ...profile, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Country</label>
              <input
                type="text"
                value={profile.country}
                onChange={e => setProfile({ ...profile, country: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">NPWP (Tax ID)</label>
              <input
                type="text"
                value={profile.npwp}
                onChange={e => setProfile({ ...profile, npwp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">SIUP / Operating License</label>
              <input
                type="text"
                value={profile.siup}
                onChange={e => setProfile({ ...profile, siup: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Localization & System Preferences */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-3">
            SYSTEM LOCALIZATION
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Default Timezone</label>
              <input
                type="text"
                value={profile.timezone}
                onChange={e => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">System Language</label>
              <input
                type="text"
                value={profile.language}
                onChange={e => setProfile({ ...profile, language: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Reporting Currency</label>
              <input
                type="text"
                value={profile.currency}
                onChange={e => setProfile({ ...profile, currency: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />ISO 27001 Security Policy
            </div>
            <p className="text-[10px] text-emerald-800 leading-tight">
              Enterprise encryption and audit logging are automatically enforced for all company records.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
