import React, { useState } from 'react';
import { UserRole } from '../types';
import { USER_ROLES } from '../data/mockData';
import { 
  Anchor, 
  Award, 
  ChevronDown, 
  Sparkles, 
  UserCheck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeRole, onRoleChange }) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const currentRoleDetail = USER_ROLES.find((r) => r.id === activeRole) || USER_ROLES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-800 px-4 lg:px-6 py-3 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Certifications */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-500 to-emerald-400 p-0.5 shadow-md shadow-teal-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Anchor className="w-5 h-5 text-teal-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-slate-900 via-sky-700 to-teal-600 bg-clip-text text-transparent">
                  LARS MARITIME
                </h1>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-500" /> LARS-AI PLATFORM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Maritime Intelligence & Office Management System
              </p>
            </div>
          </div>

          {/* ISO Certifications Badges */}
          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-[11px] text-slate-700 font-medium shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>ISO 9001:2015</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-[11px] text-slate-700 font-medium shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>ISO 45001:2018</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />
            </div>
          </div>
        </div>

        {/* AI Status & Role Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
          
          {/* AI Connection Status */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="hidden sm:inline">AI Status:</span>
            <span className="font-bold text-emerald-700">LARS-AI Engine Online</span>
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-teal-600" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 leading-none mb-0.5">Role Aktif</div>
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  {currentRoleDetail.label}
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5">
                <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  PILIH HAK AKSES ROLE (SIMULASI PRD)
                </div>
                {USER_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      onRoleChange(role.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-start gap-2.5 ${
                      activeRole === role.id ? 'bg-teal-50/60 border-l-3 border-teal-600' : ''
                    }`}
                  >
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border mt-0.5 shrink-0 ${role.badgeColor.replace('bg-', 'bg-light-').replace('text-', 'text-slate-800')}`}>
                      {role.id.toUpperCase()}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        {role.label}
                        {activeRole === role.id && <CheckCircle2 className="w-3 h-3 text-teal-600 inline" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                        {role.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
