import React from 'react';
import { ModuleType } from '../types';
import {
  LayoutDashboard,
  Ship,
  Award,
  FolderGit2,
  Users,
  Wrench,
  ClipboardList,
  ShoppingCart,
  Package,
  MessageSquare,
  FileCheck2,
  Workflow,
  ShieldAlert,
  DollarSign,
  PieChart,
  FileBarChart,
  BarChart3,
  Shield,
  Building2,
  PhoneCall
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  pendingApprovalsCount?: number;
}

interface NavSection {
  title?: string;
  items: {
    id: ModuleType;
    label: string;
    icon: React.ElementType;
    badge?: string | null;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
}) => {
  const navSections: NavSection[] = [
    {
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'FLEET MANAGEMENT',
      items: [
        { id: 'fleet_vessels', label: 'Vessels', icon: Ship },
        { id: 'fleet_certificates', label: 'Certificates', icon: Award },
        { id: 'fleet_documents', label: 'Documents', icon: FolderGit2 },
        { id: 'fleet_crew', label: 'Crew Management', icon: Users },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'ops_maintenance', label: 'Planned Maintenance', icon: Wrench },
        { id: 'ops_workorders', label: 'Work Orders', icon: ClipboardList },
        { id: 'ops_procurement', label: 'Procurement', icon: ShoppingCart },
        { id: 'ops_inventory', label: 'Inventory', icon: Package },
      ],
    },
    {
      title: 'LARS AI MODULES',
      items: [
        {
          id: 'chatbot',
          label: 'AI Chatbot Assistant',
          icon: MessageSquare,
          badge: 'LARS-AI',
          badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
        },
        {
          id: 'survey_generator',
          label: 'AI Survey Report Generator',
          icon: FileCheck2,
          badge: 'Vision',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          id: 'dms',
          label: 'Document Management (DMS)',
          icon: FolderGit2,
          badge: 'OCR',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
        },
        {
          id: 'workflow',
          label: 'Workflow Tracker (6-Step)',
          icon: Workflow,
          badge: '6-Step',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        },
        {
          id: 'audit',
          label: 'System Audit Log & Security',
          icon: ShieldAlert,
          badge: 'ISO 27001',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { id: 'fin_accounting', label: 'Accounting', icon: DollarSign },
        { id: 'fin_budget', label: 'Budget & Cost', icon: PieChart },
      ],
    },
    {
      title: 'REPORTING',
      items: [
        { id: 'rep_reports', label: 'Reports', icon: FileBarChart },
        { id: 'rep_analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { id: 'set_users', label: 'Users & Roles', icon: Shield },
        { id: 'set_company', label: 'Company Settings', icon: Building2 },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 p-3 lg:p-4 flex flex-col justify-between shrink-0 shadow-lg border-r border-slate-800 overflow-y-auto h-full">
      <div className="space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && (
              <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded border ${
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
        ))}
      </div>

      {/* Emergency Contact Banner */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-r from-sky-950 to-slate-900 border border-sky-800/60 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1 text-sky-400 text-xs font-extrabold uppercase tracking-wide">
          <PhoneCall className="w-4 h-4 animate-bounce text-sky-400" />
          Emergency Contact
        </div>
        <p className="text-xs font-mono font-bold text-slate-100">+62 21 1234 5678</p>
        <p className="text-[9px] text-slate-400 mt-0.5">24/7 Fleet Operations Center</p>
      </div>
    </aside>
  );
};
