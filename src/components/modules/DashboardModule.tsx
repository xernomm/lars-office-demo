import React from 'react';
import { UserRole, ModuleType } from '../../types';
import { USER_ROLES } from '../../data/mockData';
import { 
  TrendingUp, 
  DollarSign, 
  Ship, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  ArrowUpRight, 
  FileText, 
  BarChart3
} from 'lucide-react';

interface DashboardModuleProps {
  activeRole: UserRole;
  onNavigateModule: (module: ModuleType) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ activeRole, onNavigateModule }) => {
  const currentRoleInfo = USER_ROLES.find((r) => r.id === activeRole) || USER_ROLES[0];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${currentRoleInfo.badgeColor.replace('bg-', 'bg-light-').replace('text-', 'text-slate-800')}`}>
              ROLE: {currentRoleInfo.label}
            </span>
            <span className="text-xs text-slate-500 font-medium">| Standard Operating Environment</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Selamat Datang di LARS AI Maritime Intelligence Platform
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {currentRoleInfo.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateModule('survey_generator')}
            className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buat Laporan AI Baru</span>
          </button>
        </div>
      </div>

      {/* RENDER DASHBOARD DYNAMICALLY BASED ON ACTIVE ROLE */}

      {/* 1. ROLE DIREKTUR / CEO */}
      {activeRole === 'direktur' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PRODUKTIVITAS TIM</span>
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><TrendingUp className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-slate-900">+68.4%</div>
              <p className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <ArrowUpRight className="w-3 h-3" /> Peningkatan efisiensi berkat AI Report Generator
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">REVENUE SURVEI PROYEK</span>
                <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><DollarSign className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-slate-900">Rp 1.45 Miliar</div>
              <p className="text-[10px] text-slate-500 font-medium">Total revenue Q2 2024 (8 Armada Kapal)</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">ARMADA KAPAL TERINSPEKSI</span>
                <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600"><Ship className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-slate-900">42 Kapal</div>
              <p className="text-[10px] text-slate-500 font-medium">Tanker, Tugboat, & Bulk Carrier</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">ISO COMPLIANCE SCORE</span>
                <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600"><ShieldCheck className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-slate-900">99.2%</div>
              <p className="text-[10px] text-purple-700 font-bold">Standard ISO 9001 & ISO 45001 Verified</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  ANALISIS KINERJA & PROYEKSI WAKTU HEMAT SURVEI
                </h3>
                <span className="text-[10px] text-slate-400 font-semibold">Target Efisiensi 50-70% PRD</span>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Waktu Pembuatan Laporan Tradisional</span>
                    <span className="text-rose-600 font-mono">18 Jam / Laporan</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-teal-800 font-black">Waktu Pembuatan Laporan LARS AI (Gemini 3.5)</span>
                    <span className="text-emerald-600 font-mono font-black">3.5 Jam / Laporan</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
              <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">STATUS MONITORING DIREKSI</h3>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Draft Survey MT Ocean Glory</span>
                  <span className="text-emerald-700 font-bold">Approved</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">On-Hire Condition SPOB Barito</span>
                  <span className="text-amber-700 font-bold">Reviewing</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Audit ISO 27001 Cloud DMS</span>
                  <span className="text-teal-700 font-bold">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROLE MANAGER */}
      {activeRole === 'manager' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">MENUNGGU APPROVAL</span>
              <div className="text-2xl font-black text-amber-600">3 Laporan</div>
              <p className="text-[10px] text-slate-500 font-medium">SLA Approval &lt; 24 jam</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">SURVEYOR AKTIF LAPANGAN</span>
              <div className="text-2xl font-black text-teal-700">12 Personel</div>
              <p className="text-[10px] text-slate-500 font-medium">Tanjung Priok, Merak, & Surabaya</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">KUALITAS AI DRAFT</span>
              <div className="text-2xl font-black text-emerald-700">98.5% Accuracy</div>
              <p className="text-[10px] text-slate-500 font-medium">Berdasarkan Computer Vision</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">QUEUE APPROVAL SURVEI MANAGER</h3>
            <div className="space-y-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">MT. Ocean Glory - Draft Survey LARS AI</div>
                  <div className="text-[10px] text-slate-500 font-medium">Surveyor: Andi S. | Tanggal: 18 Mei 2024</div>
                </div>
                <button
                  onClick={() => onNavigateModule('survey_generator')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Review & Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ROLE SURVEYOR */}
      {activeRole === 'surveyor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TUGAS SURVEI HARI INI</span>
              <div className="text-2xl font-black text-teal-700">2 Kapal</div>
              <p className="text-[10px] text-slate-500 font-medium">MT Ocean Glory & SPOB Barito</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">COMPUTER VISION CAPTURED</span>
              <div className="text-2xl font-black text-emerald-700">14 Foto Defek</div>
              <p className="text-[10px] text-slate-500 font-medium">Tersimpan di Cloud LARS</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">DRAFT DI-GENERATE</span>
              <div className="text-2xl font-black text-amber-600">1 Laporan</div>
              <p className="text-[10px] text-slate-500 font-medium">Menunggu Approval Manager</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">SHORTCUT SURVEI CEPAT</h3>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigateModule('survey_generator')}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upload Computer Vision & Voice Note</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ROLE FINANCE */}
      {activeRole === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TOTAL INVOICE DITERBITKAN</span>
              <div className="text-2xl font-black text-slate-900">Rp 450.000.000</div>
              <p className="text-[10px] text-emerald-700 font-bold">PPN 11% Compliant</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">OUTSTANDING BILLING</span>
              <div className="text-2xl font-black text-amber-600">Rp 65.000.000</div>
              <p className="text-[10px] text-slate-500 font-medium">Inv #INV/2024/05/092 (MT Ocean Glory)</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">PAYMENT STATUS</span>
              <div className="text-2xl font-black text-emerald-700">85.5% Paid</div>
              <p className="text-[10px] text-slate-500 font-medium">Term 30 Hari</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">MANAJEMEN INVOICE PROYEK</h3>
            <button
              onClick={() => onNavigateModule('dms')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Buka File Invoice di DMS</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. ROLE CLIENT */}
      {activeRole === 'client' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">PORTAL DOKUMEN KAPAL KLIEN (PT SAMUDRA JAYA)</h3>
                <p className="text-xs text-slate-500 font-medium">Laporan Resmi Inspeksi LARS AI yang Siap Di-download</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-xl border border-emerald-200">
                Verified Owner Access
              </span>
            </div>

            <div className="space-y-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Laporan Draft Survey MT. Ocean Glory Mei 2024.pdf</div>
                  <div className="text-[10px] text-slate-500 font-medium">Disetujui oleh Senior Surveyor & Manager | Ukuran: 8.7 MB</div>
                </div>
                <button
                  onClick={() => alert('Simulasi Download Laporan Resmi PDF untuk Klien Sukses!')}
                  className="bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ROLE ADMIN / STAFF */}
      {activeRole === 'staff' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">PENYIMPANAN CLOUD DMS</span>
              <div className="text-2xl font-black text-teal-700">128.4 GB / 1 TB</div>
              <p className="text-[10px] text-slate-500 font-medium">Enkripsi AES-256 Active</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TOTAL SYSTEM USERS</span>
              <div className="text-2xl font-black text-emerald-700">34 Active Users</div>
              <p className="text-[10px] text-slate-500 font-medium">RBAC Role Controlled</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">API HEALTH LATENCY</span>
              <div className="text-2xl font-black text-purple-700">42 ms</div>
              <p className="text-[10px] text-slate-500 font-medium">Gemini 3.5 Flash Engine</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">ADMINISTRASI KANTOR & AUDIT</h3>
            <button
              onClick={() => onNavigateModule('audit')}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Buka Security & Audit Log System</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
