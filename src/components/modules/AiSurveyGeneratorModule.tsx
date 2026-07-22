import React, { useState } from 'react';
import { SurveyReport } from '../../types';
import { VISION_SAMPLES, AUDIO_TRANSCRIPT_SAMPLES } from '../../data/mockData';
import { 
  analyzeImageWithGeminiVision, 
  generateFullSurveyReport 
} from '../../services/geminiService';
import { 
  FileCheck2, 
  Ship, 
  Eye, 
  Mic, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Send, 
  Download, 
  Globe, 
  AlertTriangle, 
  Loader2 
} from 'lucide-react';

export const AiSurveyGeneratorModule: React.FC = () => {
  const [shipName, setShipName] = useState('MT. Ocean Glory');
  const [surveyType, setSurveyType] = useState('On Hire Condition & Structural Survey');
  const [dwt, setDwt] = useState('45,210 DWT');
  const [date, setDate] = useState('18 Mei 2024');
  const [findingsText, setFindingsText] = useState(
    'Mesin utama berjalan stabil pada 120 RPM. Pompa ballast & pemadam kebakaran berfungsi baik. Terlihat rembesan oli tipis di purifier.'
  );

  const [selectedVisionSample, setSelectedVisionSample] = useState(VISION_SAMPLES[0]);
  const [visionAnalysisResult, setVisionAnalysisResult] = useState<string>(VISION_SAMPLES[0].detectedDefect);
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState<string>(AUDIO_TRANSCRIPT_SAMPLES[0]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportLanguage, setReportLanguage] = useState<'ID' | 'EN'>('ID');
  const [generatedReport, setGeneratedReport] = useState<SurveyReport | null>({
    id: 'REP-2024-0518',
    shipName: 'MT. Ocean Glory',
    surveyType: 'On Hire Condition & Structural Survey',
    dwt: '45,210 DWT',
    date: '18 Mei 2024',
    findingsText: 'Mesin utama berjalan stabil pada 120 RPM. Pompa ballast & pemadam kebakaran berfungsi baik.',
    visionFindings: VISION_SAMPLES[0].detectedDefect,
    audioTranscript: AUDIO_TRANSCRIPT_SAMPLES[0],
    executiveSummary: 'EXECUTIVE SUMMARY: Pada tanggal 18 Mei 2024, survei On Hire Condition secara menyeluruh telah dilaksanakan di atas kapal MT. Ocean Glory (45,210 DWT). Secara umum integritas struktur kapal dalam kondisi BAIK dengan beberapa temuan pemeliharaan minor.',
    detailedFindings: [
      'Lambung & Kulit Luar: Terdeteksi korosi permukaan sedang (approx 15% area plat) dekat garis air.',
      'Permesin & Valves: Mesin utama berjalan stabil pada 120 RPM. Valve manifold dalam kondisi kedap.',
      'Peralatan Keselamatan: Pompa pemadam kebakaran dipertahankan pada 8.5 bar. Sekoci penolong diuji dan berfungsi penuh.',
    ],
    recommendations: [
      'Lakukan pembersihan karat lokal & pengecatan ulang epoxy marine grade saat jadwal sandar.',
      'Kalibrasi ulang pressure gauge pada auxiliary boiler sebelum pelayaran berikutnya.',
      'Arsipkan laporan inspeksi AI ini ke dalam Cloud DMS LARS untuk verifikasi klien.',
    ],
    status: 'Draft',
    language: 'ID',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAnalyzeVision = async (sample: typeof VISION_SAMPLES[0]) => {
    setSelectedVisionSample(sample);
    setIsAnalyzingVision(true);
    try {
      const visionResult = await analyzeImageWithGeminiVision(sample.imageUrl, sample.description);
      setVisionAnalysisResult(visionResult);
      showNotification('Analisis Computer Vision LARS-AI selesai!');
    } catch (e) {
      setVisionAnalysisResult(sample.detectedDefect);
    } finally {
      setIsAnalyzingVision(false);
    }
  };

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      const randomTranscript = AUDIO_TRANSCRIPT_SAMPLES[Math.floor(Math.random() * AUDIO_TRANSCRIPT_SAMPLES.length)];
      setAudioTranscript(randomTranscript);
      setIsRecording(false);
      showNotification('Voice Note berhasil ditranskrip & diekstrak oleh AI!');
    }, 2000);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const result = await generateFullSurveyReport({
        shipName,
        surveyType,
        dwt,
        date,
        findingsText,
        visionFindings: visionAnalysisResult,
        audioTranscript,
        language: reportLanguage,
      });

      setGeneratedReport({
        id: `REP-${Date.now().toString().slice(-6)}`,
        shipName,
        surveyType,
        dwt,
        date,
        findingsText,
        visionFindings: visionAnalysisResult,
        audioTranscript,
        executiveSummary: result.executiveSummary,
        detailedFindings: result.detailedFindings,
        recommendations: result.recommendations,
        status: 'Draft',
        language: reportLanguage,
      });

      showNotification('Laporan LARS AI berhasil di-generate!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleTranslate = () => {
    const nextLang = reportLanguage === 'ID' ? 'EN' : 'ID';
    setReportLanguage(nextLang);
    if (generatedReport) {
      if (nextLang === 'EN') {
        setGeneratedReport({
          ...generatedReport,
          language: 'EN',
          executiveSummary: `EXECUTIVE SUMMARY: On ${generatedReport.date}, an intensive ${generatedReport.surveyType} was conducted on board ${generatedReport.shipName} (${generatedReport.dwt}). Overall structural condition is GOOD with minor maintenance findings.`,
          detailedFindings: [
            'Hull & Outer Shell: Moderate surface corrosion detected near portside water line (~15% area).',
            'Machinery & Valves: Main engine operating smoothly at 120 RPM. Cargo valves tight.',
            'Safety Systems: Fire pumps maintained at 8.5 bar. Lifeboat drop test passed.',
          ],
          recommendations: [
            'Perform surface grinding & marine grade epoxy re-coating during quay stay.',
            'Re-calibrate pressure gauge on auxiliary boiler before next voyage.',
            'Archive report into LARS Cloud DMS for client verification.',
          ],
        });
      } else {
        setGeneratedReport({
          ...generatedReport,
          language: 'ID',
          executiveSummary: `EXECUTIVE SUMMARY: Pada tanggal ${generatedReport.date}, survei ${generatedReport.surveyType} secara menyeluruh telah dilaksanakan di atas kapal ${generatedReport.shipName} (${generatedReport.dwt}). Secara umum integritas struktur kapal dalam kondisi BAIK dengan beberapa temuan pemeliharaan minor.`,
          detailedFindings: [
            'Lambung & Kulit Luar: Terdeteksi korosi permukaan sedang (approx 15% area plat) dekat garis air.',
            'Permesin & Valves: Mesin utama berjalan stabil pada 120 RPM. Valve manifold dalam kondisi kedap.',
            'Peralatan Keselamatan: Pompa pemadam kebakaran dipertahankan pada 8.5 bar. Sekoci penolong diuji dan berfungsi penuh.',
          ],
          recommendations: [
            'Lakukan pembersihan karat lokal & pengecatan ulang epoxy marine grade saat jadwal sandar.',
            'Kalibrasi ulang pressure gauge pada auxiliary boiler sebelum pelayaran berikutnya.',
            'Arsipkan laporan inspeksi AI ini ke dalam Cloud DMS LARS untuk verifikasi klien.',
          ],
        });
      }
      showNotification(`Laporan diterjemahkan ke ${nextLang === 'ID' ? 'Bahasa Indonesia' : 'English'}!`);
    }
  };

  const handleExportSimulated = (format: 'PDF' | 'WORD') => {
    showNotification(`File Laporan LARS AI (${format}) berhasil di-download!`);
  };

  const handleSubmitForApproval = () => {
    if (generatedReport) {
      setGeneratedReport({ ...generatedReport, status: 'Pending Approval' });
      showNotification('Laporan telah dikirimkan ke Manager Operasional untuk Approval!');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl font-semibold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-slate-800">
              AI Survey Report Generator & Computer Vision
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Ekstraksi Otomatis Multi-Input (Form Teks + Foto Computer Vision + Transkrip Voice Note) ke Laporan Resmi LARS
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md shadow-teal-600/20 disabled:opacity-50 transition-all shrink-0"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>GENERATE AI REPORT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: MULTI-INPUT FORM (5 COLS) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Section 1: Form Teks Identitas Kapal */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-extrabold text-teal-700 uppercase tracking-wider">
              <Ship className="w-4 h-4 text-teal-600" />
              1. Identitas Kapal & Survei
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Nama Kapal</label>
                <input
                  type="text"
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Bobot DWT</label>
                <input
                  type="text"
                  value={dwt}
                  onChange={(e) => setDwt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Jenis Survei</label>
              <input
                type="text"
                value={surveyType}
                onChange={(e) => setSurveyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Tanggal Survei</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">Catatan Temuan Lapangan</label>
              <textarea
                rows={2}
                value={findingsText}
                onChange={(e) => setFindingsText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Section 2: Upload Foto / Computer Vision */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                <Eye className="w-4 h-4 text-emerald-600" />
                2. Computer Vision Foto Inspeksi
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                LARS Vision AI
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">Pilih sampel foto kapal di bawah untuk mendeteksi korosi & defek secara real-time:</p>

            {/* Sample Image Picker */}
            <div className="grid grid-cols-3 gap-2">
              {VISION_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleAnalyzeVision(sample)}
                  className={`group relative rounded-xl overflow-hidden border transition-all text-left ${
                    selectedVisionSample.id === sample.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={sample.imageUrl} alt={sample.title} className="w-full h-16 object-cover" />
                  <div className="p-1.5 bg-slate-50">
                    <p className="text-[9px] font-bold text-slate-800 truncate">{sample.title}</p>
                    <span className="text-[8px] text-emerald-700 font-extrabold">{sample.severity} Risk</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Vision Detection Result Box */}
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-extrabold text-emerald-800 uppercase">
                <span>HASIL COMPUTER VISION:</span>
                {isAnalyzingVision && <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />}
              </div>
              <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                {isAnalyzingVision ? 'Menganalisis piksel foto menggunakan LARS Vision AI...' : visionAnalysisResult}
              </p>
            </div>
          </div>

          {/* Section 3: Voice Note / Audio Input Simulator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Mic className="w-4 h-4 text-amber-600" />
                3. Voice Note / Voice-to-Report Simulator
              </div>
              <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-200">
                Audio Extract AI
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateVoice}
                disabled={isRecording}
                className={`flex-1 py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isRecording
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'text-rose-600 animate-spin' : 'text-amber-600'}`} />
                <span>{isRecording ? 'Merekam & Transkrip Audio...' : 'Simulasi Rekam Voice Note'}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">TRANSKRIP SUARA SURVEYOR:</div>
              <p className="text-xs text-slate-700 italic leading-relaxed font-serif">
                "{audioTranscript}"
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: REPORT PREVIEW & ACTIONS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Action Toolbar above report */}
          <div className="bg-white border border-slate-200 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">BAHASA REPORT:</span>
              <button
                onClick={handleToggleTranslate}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-teal-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Auto Translate ({reportLanguage})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExportSimulated('PDF')}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>PDF Export</span>
              </button>

              <button
                onClick={handleSubmitForApproval}
                disabled={generatedReport?.status === 'Pending Approval'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  generatedReport?.status === 'Pending Approval'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-600 text-white shadow-md'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{generatedReport?.status === 'Pending Approval' ? 'Terkirim ke Manager' : 'Kirim ke Manager'}</span>
              </button>
            </div>
          </div>

          {/* Official Document Preview Frame */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative space-y-6">
            
            {/* Document Letterhead Header */}
            <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm">
                    LARS
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider">
                      PT LARS MARITIME INTELLIGENCE
                    </h3>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      OFFICIAL SURVEY REPORT - ISO 9001:2015 CERTIFIED
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                  {generatedReport?.id}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Status: <span className="font-bold text-amber-600">{generatedReport?.status}</span>
                </div>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">NAMA KAPAL</span>
                <span className="font-bold text-slate-800">{generatedReport?.shipName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">BOBOT / DWT</span>
                <span className="font-bold text-slate-800">{generatedReport?.dwt}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">JENIS SURVEI</span>
                <span className="font-bold text-slate-800">{generatedReport?.surveyType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">TANGGAL</span>
                <span className="font-bold text-slate-800">{generatedReport?.date}</span>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-sans">
                {generatedReport?.executiveSummary}
              </p>
            </div>

            {/* Section 2: Detailed Technical Findings & Vision */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                2. TEMUAN TEKNIS & COMPUTER VISION
              </h4>
              <div className="space-y-2">
                {generatedReport?.detailedFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Recommendations */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                3. REKOMENDASI TINDAKAN (ACTION ITEMS)
              </h4>
              <ul className="space-y-1.5">
                {generatedReport?.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signatures & Stamp Footer */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Field Marine Surveyor</p>
                <div className="h-10 flex items-center justify-center italic text-teal-700 font-serif text-sm font-bold">
                  Andi Surveyor, S.T.
                </div>
                <p className="text-[10px] text-slate-400 font-mono">Reg ID: LARS-SURV-0892</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Operations Manager Approval</p>
                <div className="h-10 flex items-center justify-center text-emerald-700 font-extrabold text-xs">
                  {generatedReport?.status === 'Pending Approval' ? '[ Menunggu Tanda Tangan ]' : 'Capt. Heru Susanto, M.Mar'}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">ISO Auditor Certified</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
