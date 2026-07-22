import React, { useState } from 'react';
import { WorkflowStep } from '../../types';
import { WORKFLOW_STEPS } from '../../data/mockData';
import { 
  Workflow, 
  CheckCircle2, 
  Clock, 
  Database, 
  Cpu, 
  Sparkles, 
  FileCheck2, 
  Share2, 
  Code,
  Activity
} from 'lucide-react';

export const WorkflowTrackerModule: React.FC = () => {
  const [steps] = useState<WorkflowStep[]>(WORKFLOW_STEPS);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep>(WORKFLOW_STEPS[2]);

  const getStepIcon = (id: number) => {
    switch (id) {
      case 1: return FileCheck2;
      case 2: return Database;
      case 3: return Cpu;
      case 4: return Sparkles;
      case 5: return CheckCircle2;
      case 6: return Share2;
      default: return Workflow;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Workflow className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-slate-800">
              Workflow Tracker (6-Step System Lifecycle)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Pelacakan Alur End-to-End Pemrosesan Inspeksi & Intelijen Maritim LARS AI secara Real-time
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="text-slate-500">Lifecycle Status:</span>
          <span className="font-bold text-emerald-700">Live Active</span>
        </div>
      </div>

      {/* 6-STEP VISUAL INTERACTIVE STEPPER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>ALUR 6 TAHAP SISTEM LARS AI (KLIK UNTUK DETIL SIMULASI):</span>
        </div>

        {/* Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step) => {
            const Icon = getStepIcon(step.id);
            const isSelected = selectedStep.id === step.id;
            const isCompleted = step.status === 'Completed';
            const isActive = step.status === 'Active';

            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all relative ${
                  isSelected
                    ? 'bg-teal-50/80 border-teal-500 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                    : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs mb-2 transition-transform ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : isActive
                      ? 'bg-teal-100 text-teal-700 border border-teal-300 animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
                  {step.shortName}
                </span>

                <span
                  className={`mt-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isActive
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step.status}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* DETAILED INSPECTOR PANEL FOR SELECTED STEP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Step Details */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 border border-teal-300 flex items-center justify-center font-black text-sm">
                #{selectedStep.id}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {selectedStep.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Terakhir Diperbarui: {selectedStep.lastUpdated}
                </span>
              </div>
            </div>

            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-xl border border-teal-200">
              {selectedStep.status}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi Operasional Tahap:</h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
              {selectedStep.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">ENGINE AI/MODULE</span>
              <span className="font-bold text-teal-700">Gemini 3.5 Flash / Cloud Vault</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">SECURITY PROTOCOL</span>
              <span className="font-bold text-emerald-700">AES-256 Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right: Payload & Data Log Inspector */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-teal-700 uppercase tracking-wider mb-3">
              <Code className="w-4 h-4 text-teal-600" />
              SIMULASI PAYLOAD & METADATA JSON
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 overflow-x-auto leading-relaxed shadow-inner">
              <pre className="whitespace-pre-wrap">{selectedStep.payloadSample}</pre>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Real-time Stream Log</span>
            </div>
            <span className="text-emerald-700 font-bold">Synced with LARS Cloud</span>
          </div>
        </div>

      </div>

    </div>
  );
};
