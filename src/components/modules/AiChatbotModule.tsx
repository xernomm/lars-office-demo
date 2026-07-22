import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { CHAT_PRESETS } from '../../data/mockData';
import { sendChatMessageToGemini } from '../../services/geminiService';
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Compass, 
  FileText, 
  ShieldCheck, 
  Mail, 
  Users,
  Loader2
} from 'lucide-react';

export const AiChatbotModule: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'LARS AI Engine',
      text: 'Halo! Saya **LARS AI Assistant** (powered by `gemini-3.5-flash`). Ada yang bisa saya bantu terkait SOP survei maritim, analisis dokumen kapal, regulasi SOLAS/MARPOL, atau pembuatan draft email & notulen?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAi: true,
      language: 'ID',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Pengguna',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAi: false,
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessageToGemini(query, language);
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'LARS AI (gemini-3.5-flash)',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: true,
        language,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'LARS AI',
        text: 'Maaf, terjadi masalah koneksi AI. Menggunakan jawaban standar LARS AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: true,
        language,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'LARS AI Engine',
        text: 'Riwayat percakapan telah dibersihkan. Silakan ajukan pertanyaan baru.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: true,
        language,
      },
    ]);
  };

  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'sop': return Compass;
      case 'doc': return FileText;
      case 'reg': return ShieldCheck;
      case 'email': return Mail;
      case 'meeting': return Users;
      default: return Sparkles;
    }
  };

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-extrabold text-teal-700 mt-2 mb-1">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={idx} className="font-bold text-slate-800 my-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const bulletContent = line.trim().replace(/^[-•]\s*/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 my-0.5">
            {bulletContent.replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
      }
      if (line.trim() === '') return <div key={idx} className="h-1.5" />;
      return <p key={idx} className="my-0.5 leading-relaxed text-slate-700">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
      
      {/* Top Header Bar */}
      <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-800 text-sm">AI Chatbot Assistant</h2>
              <span className="bg-teal-50 text-teal-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-teal-200">
                gemini-3.5-flash
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Kecerdasan Buatan Maritim & Asisten Manajemen Perusahaan
            </p>
          </div>
        </div>

        {/* Right Tools: Language Switcher & Clear */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setLanguage('ID')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                language === 'ID'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Globe className="w-3 h-3" />
              ID
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                language === 'EN'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Globe className="w-3 h-3" />
              EN
            </button>
          </div>

          <button
            onClick={handleClearChat}
            title="Bersihkan Chat"
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-600 rounded-lg border border-slate-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Quick Action Buttons Bar */}
      <div className="bg-slate-50/50 p-3 border-b border-slate-200 overflow-x-auto">
        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-600" />
          PRESET QUICK ACTION BUTTONS (KLIK UNTUK INSTANT PROMPT)
        </div>
        <div className="flex items-center gap-2 min-w-max">
          {CHAT_PRESETS.map((preset) => {
            const Icon = getPresetIcon(preset.id);
            return (
              <button
                key={preset.id}
                onClick={() => handleSendMessage(preset.prompt)}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white hover:bg-teal-50 hover:border-teal-300 border border-slate-200 text-slate-700 hover:text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs group disabled:opacity-50"
              >
                <Icon className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${msg.isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.isAi
                  ? 'bg-gradient-to-tr from-teal-600 to-sky-600 text-white shadow-md'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {msg.isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`group relative rounded-2xl p-4 text-xs leading-relaxed ${
                msg.isAi
                  ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  : 'bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-tr-none shadow-md shadow-teal-600/10'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-slate-100 text-[10px] opacity-75">
                <span className="font-bold">{msg.sender}</span>
                <div className="flex items-center gap-2">
                  <span>{msg.timestamp}</span>
                  {msg.isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 hover:text-teal-600 transition-opacity"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div>{msg.isAi ? renderMarkdown(msg.text) : <p>{msg.text}</p>}</div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center gap-3 shadow-xs">
              <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
              <span>LARS AI (`gemini-3.5-flash`) sedang memproses tanggapan...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="bg-white p-3 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={
              language === 'ID'
                ? 'Tulis pertanyaan maritim, SOP, regulasi, atau draf surat...'
                : 'Ask maritime SOPs, regulations, draft reports...'
            }
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-teal-600/20"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </form>
      </div>

    </div>
  );
};
