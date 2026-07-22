import React, { useState } from 'react';
import { DocumentItem, UserRole } from '../../types';
import { INITIAL_DOCUMENTS } from '../../data/mockData';
import { summarizeDocumentWithGemini } from '../../services/geminiService';
import { 
  FolderGit2, 
  Search, 
  FileText, 
  FileCode, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  X, 
  Loader2, 
  CheckCircle2,
  Calendar,
  User,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface DocumentManagementModuleProps {
  activeRole: UserRole;
}

export const DocumentManagementModule: React.FC<DocumentManagementModuleProps> = ({ activeRole }) => {
  const [documents] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummaryResult, setAiSummaryResult] = useState<DocumentItem['summary'] | null>(null);

  const categories = ['All', 'Kontrak', 'Laporan Inspection', 'SOP', 'Regulasi', 'Invoice'];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDocIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-rose-500" />;
      case 'DOCX': return <FileCode className="w-5 h-5 text-sky-600" />;
      case 'XLSX': return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleOpenDoc = async (doc: DocumentItem) => {
    const hasAccess = doc.accessRoles.includes(activeRole);
    if (!hasAccess) {
      alert(`Akses Ditolak: Role "${activeRole.toUpperCase()}" tidak memiliki izin untuk membuka dokumen rahasia ini.`);
      return;
    }

    setSelectedDoc(doc);
    setIsDrawerOpen(true);
    setIsSummarizing(true);
    setAiSummaryResult(null);

    try {
      const summary = await summarizeDocumentWithGemini(doc.title, doc.ocrText || doc.title, 'ID');
      setAiSummaryResult(summary);
    } catch (e) {
      setAiSummaryResult(doc.summary || null);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-slate-800">
              Document Management System (DMS) & AI Summarizer
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Pengarsipan Dokumen Maritim Terpusat, Smart Search, OCR Indexing, dan Ringkasan Kontrak Otomatis oleh LARS-AI Engine
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="text-slate-500">Role Terdeteksi:</span>
          <span className="font-extrabold text-teal-700 uppercase">{activeRole}</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Smart AI Search dokumen, SOP, kontrak..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="p-4">DOKUMEN & FORMAT</th>
                <th className="p-4">KATEGORI</th>
                <th className="p-4">TANGGAL & UKURAN</th>
                <th className="p-4">AUTHOR</th>
                <th className="p-4">HAK AKSES ROLE</th>
                <th className="p-4 text-right">AKSI AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocuments.map((doc) => {
                const hasAccess = doc.accessRoles.includes(activeRole);
                return (
                  <tr
                    key={doc.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !hasAccess ? 'opacity-50 bg-slate-50/40' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0 shadow-2xs">
                          {getDocIcon(doc.type)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{doc.title}</span>
                            {!hasAccess && (
                              <span className="bg-rose-50 text-rose-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" /> Terkunci
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {doc.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-teal-50 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-teal-200 text-teal-700">
                        {doc.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <div>
                        <div className="text-slate-700 font-semibold">{doc.date}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{doc.size}</div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 font-medium">{doc.author}</td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.accessRoles.map((r) => (
                          <span
                            key={r}
                            className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                              r === activeRole
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDoc(doc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ml-auto transition-all ${
                          hasAccess
                            ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        {hasAccess ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AI Summary</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>No Access</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI DOCUMENT SUMMARIZER DRAWER / MODAL */}
      {isDrawerOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      AI Document Summarizer
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Ekstraksi Inteligensi LARS-AI Engine
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Overview Header Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  {getDocIcon(selectedDoc.type)}
                  <span className="font-bold text-xs text-slate-900">{selectedDoc.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                  <div>Kategori: <span className="text-teal-700 font-bold">{selectedDoc.category}</span></div>
                  <div>Ukuran: <span className="text-slate-700 font-mono font-semibold">{selectedDoc.size}</span></div>
                </div>
              </div>

              {/* AI Extraction Progress or Results */}
              {isSummarizing ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    Menganalisis teks OCR & struktur klausul dokumen menggunakan LARS-AI Engine...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-extrabold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    RINGKASAN POIN UTAMA (AI INSIGHTS)
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <User className="w-3.5 h-3.5 text-teal-600" />
                      <span>PIHAK TERLIBAT:</span>
                    </div>
                    <p className="text-xs text-slate-900 font-bold">
                      {aiSummaryResult?.partiesInvolved}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>NILAI KONTRAK / ESTIMASI BIAYA:</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-black">
                      {aiSummaryResult?.contractValue}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                      <span>RUANG LINGKUP PEKERJAAN (SCOPE):</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {aiSummaryResult?.scopeOfWork}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>MASA BERLAKU & TANGGAL PENTING:</span>
                    </div>
                    <p className="text-xs text-slate-800 font-mono font-bold">
                      {aiSummaryResult?.validityPeriod}
                    </p>
                  </div>

                  {selectedDoc.ocrText && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">PREVIEW TEKS OCR INDEXING:</div>
                      <p className="text-[11px] font-mono text-slate-600 italic">
                        "{selectedDoc.ocrText}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Verified by LARS AI DMS</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Tutup Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
