import React from 'react';
import { ModuleType } from '../types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileCheck2, 
  FolderGit2, 
  Workflow, 
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  pendingApprovalsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ModuleType,
      label: 'Dashboard Analytics',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'chatbot' as ModuleType,
      label: 'AI Chatbot Assistant',
      icon: MessageSquare,
      badge: 'LARS-AI',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      id: 'survey_generator' as ModuleType,
      label: 'AI Survey Report Generator',
      icon: FileCheck2,
      badge: 'Vision & Audio',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'dms' as ModuleType,
      label: 'Document Management (DMS)',
      icon: FolderGit2,
      badge: 'OCR & AI',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'workflow' as ModuleType,
      label: 'Workflow Tracker (6-Step)',
      icon: Workflow,
      badge: '6-Tahap',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'audit' as ModuleType,
      label: 'System Audit Log & Security',
      icon: ShieldAlert,
      badge: 'ISO 27001',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-3 lg:p-4 flex flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          MODUL LARS AI PLATFORM
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* System Quick Info Box */}
      <div className="mt-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          LARS AI Engine Core
        </div>
        <p className="text-[10px] text-slate-500 leading-tight font-medium">
          Powered by LARS-AI Maritime Engine. Zero latency response & computer vision inspection ready.
        </p>
      </div>
    </aside>
  );
};
