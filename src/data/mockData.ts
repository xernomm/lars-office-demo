import { UserRoleDetail, DocumentItem, VisionSample, AuditLog, WorkflowStep } from '../types';

export const USER_ROLES: UserRoleDetail[] = [
  {
    id: 'direktur',
    label: 'Direktur / CEO',
    title: 'Executive Director & Board',
    description: 'Akses Penuh: KPI Produktivitas, Keuangan Proyek, Fleet Analytics & Pengesahan Final.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'manager',
    label: 'Manager Operasional',
    title: 'Operations & Survey Manager',
    description: 'Manajemen Tim Surveyor, Approval Laporan AI, SLA Compliance & Alokasi Tugas.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'surveyor',
    label: 'Surveyor Lapangan',
    title: 'Field Marine Surveyor',
    description: 'Input Data Inspeksi, Upload Computer Vision, Voice Note & Generator Laporan.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'staff',
    label: 'Admin / Staff Kantoran',
    title: 'Office Staff & Archiving',
    description: 'Pengelolaan DMS, Pengarsipan Dokumen, Audit Log & Dukungan Administrasi.',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  },
  {
    id: 'finance',
    label: 'Finance & Billing',
    title: 'Financial Controller',
    description: 'Manajemen Invoice Proyek Maritim, Monitoring Cashflow & Billing Status.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'client',
    label: 'Client Eksternal (Pemilik Kapal)',
    title: 'External Shipowner / Charterer',
    description: 'Portal Klien: Download Laporan Resmi Hasil Survei & Tracking Status Inspeksi.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
];

export const CHAT_PRESETS = [
  {
    id: 'sop',
    label: 'Tanya SOP Perusahaan',
    prompt: 'Tanya SOP Perusahaan (contoh: Prosedur On Hire Survey Tanker)',
  },
  {
    id: 'doc',
    label: 'Tanya Dokumen Lapangan',
    prompt: 'Tanya Dokumen (contoh: Laporan Draft Survey MT. Ocean Glory Mei 2024)',
  },
  {
    id: 'reg',
    label: 'Tanya Regulasi Maritim',
    prompt: 'Tanya Regulasi Maritim (SOLAS / MARPOL)',
  },
  {
    id: 'email',
    label: 'AI Email Assistant',
    prompt: 'AI Email Assistant (Drafting email balasan klien untuk hasil inspeksi)',
  },
  {
    id: 'meeting',
    label: 'AI Meeting Assistant',
    prompt: 'AI Meeting Assistant (Buat ringkasan notulen rapat koordinasi armada)',
  },
];

export const VISION_SAMPLES: VisionSample[] = [
  {
    id: 'vis-1',
    title: 'Bottom Plate Surface Corrosion',
    description: 'Foto bagian pelat bawah kapal MT. Ocean Glory di area portside.',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80',
    detectedDefect: 'Terdeteksi korosi permukaan sedang (approx 15% area plat) dekat garis air.',
    severity: 'Medium',
  },
  {
    id: 'vis-2',
    title: 'Propeller Biofouling & Barnacles',
    description: 'Foto baling-baling kapal sebelum pembersihan underwater.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    detectedDefect: 'Pertumbuhan teritip (barnacles) padat pada blade propeller (efisiensi hidrodinamika berkurang ~8%).',
    severity: 'High',
  },
  {
    id: 'vis-3',
    title: 'Deck Manifold Valve Gasket Leak',
    description: 'Foto area manifold perpipaan muatan kargo minyak.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    detectedDefect: 'Tetesan fluida ringan pada flensa katup manifold nomor 3 (gasket perlu diganti).',
    severity: 'Low',
  },
];

export const AUDIO_TRANSCRIPT_SAMPLES = [
  "Hasil inspeksi ruang mesin MT Ocean Glory: Mesin utama berjalan stabil pada 120 RPM, suhu exhaust gas rata-rata 380 derajat Celcius. Pompa bilga dan ballast berfungsi normal. Terlihat rembesan oli tipis di sekitar purifier nomor 2.",
  "Pemeriksaan sounding tangki kargo 1P dan 1S: Tinggi cairan HFO 4.8 meter, suhu tangki 42 derajat Celcius. Tidak ada akumulasi air bebas di dasar tangki.",
  "Inspeksi peralatan keselamatan deck: Sekoci penolong bagian kanan telah dilakukan tes penurunan beban (drop test). Semua rakit penolong inflatable (ILR) dalam masa sertifikasi berlaku hingga November 2024."
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    title: 'Kontrak Kerjasama LARS & PT Samudra Jaya Line.pdf',
    type: 'PDF',
    category: 'Kontrak',
    date: '15 Mei 2024',
    size: '4.2 MB',
    author: 'Legal & Board Dept',
    accessRoles: ['direktur', 'manager', 'finance', 'staff'],
    summary: {
      partiesInvolved: 'PT LARS Maritime Intelligence & PT Samudra Jaya Line',
      contractValue: 'Rp 850.000.000 / Tahun',
      scopeOfWork: 'Layanan Inspeksi Survei Kondisi Kapal Tanker & Sertifikasi Rutin untuk 8 Armada Kapal.',
      validityPeriod: '15 Mei 2024 - 14 Mei 2025',
      complianceScore: '99% (ISO 9001:2015 Approved)',
    },
    ocrText: 'PERJANJIAN KERJASAMA JASA INSPEKSI MARITIM... Pasal 1: Pihak Pertama PT LARS... Nilai kontrak sebesar IDR 850.000.000 include PPN.'
  },
  {
    id: 'doc-002',
    title: 'Laporan Draft Survey MT. Ocean Glory Mei 2024.pdf',
    type: 'PDF',
    category: 'Laporan Inspection',
    date: '18 Mei 2024',
    size: '8.7 MB',
    author: 'Senior Surveyor Budi S.',
    accessRoles: ['direktur', 'manager', 'surveyor', 'client', 'staff'],
    summary: {
      partiesInvolved: 'PT LARS Maritime, Master MT Ocean Glory, Terminal Ops',
      contractValue: 'Laporan Teknis Inspeksi (Survey Fee Included)',
      scopeOfWork: 'Penentuan muatan kargo CPO sebesar 42.440 MT dengan teknik Hydrostatic Draft Survey.',
      validityPeriod: 'Final Report Verified',
      complianceScore: '98% (BKI Standard)',
    },
    ocrText: 'FINAL DRAFT SURVEY REPORT MT OCEAN GLORY... DWT: 45,210. Initial Draft Fwd: 4.2m, Aft: 5.8m. Final Draft Fwd: 11.2m, Aft: 11.4m.'
  },
  {
    id: 'doc-003',
    title: 'SOP On-Hire & Off-Hire Tanker Survey (SOP-MAR-042).docx',
    type: 'DOCX',
    category: 'SOP',
    date: '10 Jan 2024',
    size: '1.8 MB',
    author: 'QA/QC Maritime Team',
    accessRoles: ['direktur', 'manager', 'surveyor', 'staff'],
    summary: {
      partiesInvolved: 'Tim Surveyor LARS & Auditor Mutu Internal',
      contractValue: 'Standar Operasional Internal',
      scopeOfWork: 'Tata cara inspeksi tangki, sounding bunker, pemeriksaan sertifikat SOLAS/MARPOL.',
      validityPeriod: 'Berlaku Selamanya (Revisi Tahunan)',
      complianceScore: '100% Mandatory Compliance',
    },
    ocrText: 'SOP INSPEKSI MARITIM LARS AI... Prosedur 1.1 Persiapan dokumen sertifikasi kapal...'
  },
  {
    id: 'doc-004',
    title: 'Regulasi IMO SOLAS Consolidated Edition 2024.pdf',
    type: 'PDF',
    category: 'Regulasi',
    date: '01 Feb 2024',
    size: '18.4 MB',
    author: 'IMO Maritime Safety Committee',
    accessRoles: ['direktur', 'manager', 'surveyor', 'staff', 'client'],
    summary: {
      partiesInvolved: 'International Maritime Organization (IMO) & Flag Administrations',
      contractValue: 'Standard International Treaty',
      scopeOfWork: 'Standar Internasional Keselamatan Jiwa di Laut (Safety of Life at Sea).',
      validityPeriod: 'Edisi Konsolidasi 2024',
      complianceScore: '100% International Law',
    },
    ocrText: 'SOLAS CHAPTER II-1: Construction - Structure, subdivision and stability, machinery and electrical installations.'
  },
  {
    id: 'doc-005',
    title: 'Invoice Tagihan Survey Proyek MT Ocean Glory.xlsx',
    type: 'XLSX',
    category: 'Invoice',
    date: '20 Mei 2024',
    size: '850 KB',
    author: 'Finance & Accounting',
    accessRoles: ['direktur', 'manager', 'finance'],
    summary: {
      partiesInvolved: 'PT LARS Maritime (Billing) & PT Samudra Jaya Line (Payer)',
      contractValue: 'Rp 65.000.000 (Inv #INV/2024/05/092)',
      scopeOfWork: 'Biaya jasa survei draft & sertifikasi inspeksi teknis.',
      validityPeriod: 'Jatuh Tempo: 20 Juni 2024 (Term 30 Hari)',
      complianceScore: 'Pajak PPN 11% Sesuai Regulasi',
    },
    ocrText: 'INVOICE NUMBER INV/2024/05/092... Total Biaya Jasa: Rp 65.000.000. Status: Outstanding.'
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    name: '1. Input Data Lapangan',
    shortName: 'Input Data',
    description: 'Surveyor menginput form teknis, mengunggah foto inspeksi, dan merekam voice note di lokasi kapal.',
    status: 'Completed',
    payloadSample: 'Payload: { ship: "MT Ocean Glory", photos: 3, voiceNoteSec: 45, dwt: 45210 }',
    lastUpdated: '18 Mei 2024 - 09:30 WIB',
  },
  {
    id: 2,
    name: '2. Data Masuk Cloud Terpusat',
    shortName: 'Cloud Ingestion',
    description: 'Data dienkripsi (AES-256) dan ditransmisikan secara real-time ke LARS Maritime Cloud Database.',
    status: 'Completed',
    payloadSample: 'Storage: s3://lars-cloud-maritime/inspections/2024/MT_Ocean_Glory_18May.json',
    lastUpdated: '18 Mei 2024 - 09:32 WIB',
  },
  {
    id: 3,
    name: '3. AI Processing (NLP/OCR/Vision)',
    shortName: 'AI Processing',
    description: 'Gemini 2.5 Flash memproses foto dengan Computer Vision, menganalisis transkrip suara, dan OCR dokumen.',
    status: 'Completed',
    payloadSample: 'Model: gemini-2.5-flash | Latency: 1.2s | Confidence: 99.4%',
    lastUpdated: '18 Mei 2024 - 09:33 WIB',
  },
  {
    id: 4,
    name: '4. AI Output & Insights',
    shortName: 'AI Output',
    description: 'Sistem menghasilkan draft laporan lengkap (Executive Summary, Temuan Defek, & Rekomendasi).',
    status: 'Active',
    payloadSample: 'GeneratedDraft: { execSummary: "GOOD", defectScore: 15, recCount: 3 }',
    lastUpdated: '18 Mei 2024 - 09:34 WIB',
  },
  {
    id: 5,
    name: '5. Validasi & Review User',
    shortName: 'Validasi & Review',
    description: 'Surveyor me-review draft AI, melakukan adjustment jika diperlukan, lalu mengirimkan ke Manager untuk Approval.',
    status: 'Active',
    payloadSample: 'ApprovalQueue: Pending Manager Signature (SLA: < 24 Hours)',
    lastUpdated: '18 Mei 2024 - 10:15 WIB',
  },
  {
    id: 6,
    name: '6. Output Final & Distribusi',
    shortName: 'Output Final',
    description: 'Laporan resmi terverifikasi didistribusikan ke Portal Klien, diarsipkan di DMS, dan invoice diterbitkan.',
    status: 'Pending',
    payloadSample: 'DistributionTargets: [Client Portal, DMS Archive, Finance Invoice Module]',
    lastUpdated: 'Pending Approval',
  },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '22 Juli 2024 - 11:45:12',
    user: 'Bambang Supriyanto',
    role: 'direktur',
    module: 'Dashboard Analytics',
    action: 'Mengakses Executive KPI Financial & Fleet Efficiency Dashboard',
    ipAddress: '180.252.112.44',
    status: 'Success',
  },
  {
    id: 'log-102',
    timestamp: '22 Juli 2024 - 11:20:05',
    user: 'Captain Heru Susanto',
    role: 'manager',
    module: 'AI Survey Generator',
    action: 'Menyetujui & Menyahkan Laporan Survey MT Ocean Glory',
    ipAddress: '36.85.15.102',
    status: 'Success',
  },
  {
    id: 'log-103',
    timestamp: '22 Juli 2024 - 10:55:40',
    user: 'Andi Surveyor',
    role: 'surveyor',
    module: 'AI Vision Inspection',
    action: 'Upload Foto Computer Vision Bottom Plate MT Ocean Glory (Gemini 2.5 Flash)',
    ipAddress: '114.122.204.18',
    status: 'Success',
  },
  {
    id: 'log-104',
    timestamp: '22 Juli 2024 - 10:10:15',
    user: 'Rina Finance',
    role: 'finance',
    module: 'Document Management System',
    action: 'Membuka Invoice Tagihan Survey Proyek MT Ocean Glory.xlsx',
    ipAddress: '180.252.112.98',
    status: 'Success',
  },
  {
    id: 'log-105',
    timestamp: '22 Juli 2024 - 09:30:22',
    user: 'Klien External (PT Samudra Jaya)',
    role: 'client',
    module: 'Client Portal DMS',
    action: 'Attempt akses file internal SOP-MAR-042.docx',
    ipAddress: '202.158.45.12',
    status: 'Denied',
  },
];
