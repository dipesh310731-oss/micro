import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Mic,
  MicOff,
  Bookmark,
  Share2,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Languages,
  Zap
} from 'lucide-react';
import {
  SupportedLanguage,
  ChatResponseMode,
  ChatMessage,
  SavedNote
} from '../../types/microbiology';
import { sendChatMessage } from '../../services/apiService';
import { translations } from '../../data/translations';

interface MicrobiologyAIChatProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSaveToNotes: (note: SavedNote) => void;
}

const SUGGESTED_QUERIES = [
  'Explain the principle of Gram staining in detail.',
  'What is the difference between selective and differential media?',
  'Explain the phases of the bacterial growth curve.',
  'How does an autoclave achieve sterilization?',
  'Compare Exotoxins vs Endotoxins with examples.',
  'Explain Koch’s postulates and their modern molecular limitations.'
];

export const MicrobiologyAIChat: React.FC<MicrobiologyAIChatProps> = ({
  language,
  onLanguageChange,
  onSaveToNotes,
}) => {
  const t = translations[language] || translations.en;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Hello! I am your AI Microbiology Professor & Laboratory Tutor. Ask me any question on bacteriology, virology, immunology, culture techniques, or exam preparation.\n\nYou can switch response modes below for **2-mark**, **5-mark**, **10-mark** answers or **Viva Voce** practice!`,
      timestamp: new Date().toISOString(),
      language,
      mode: 'detailed',
      sampleQuestions: [
        'Explain the principle of Gram staining.',
        'What are the key differences between Gram-positive and Gram-negative bacteria?',
        'How does an autoclave work?'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [activeMode, setActiveMode] = useState<ChatResponseMode>('detailed');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
      language,
      mode: activeMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await sendChatMessage(query, language, activeMode, history);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.text,
        timestamp: new Date().toISOString(),
        language,
        mode: activeMode,
        sampleQuestions: res.sampleQuestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Apologies, I encountered an issue connecting to the microbiology knowledge server. Please verify your connection or retry.',
        timestamp: new Date().toISOString(),
        language,
        mode: activeMode,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveNote = (msg: ChatMessage) => {
    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      title: msg.text.slice(0, 40) + '...',
      content: msg.text,
      category: 'AI Q&A Notes',
      timestamp: new Date().toISOString(),
      examTarget: msg.mode as any,
    };
    onSaveToNotes(newNote);
    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  // Web Speech API Voice recognition
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is not supported by your current browser.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Select speech lang
      let speechLang = 'en-US';
      if (language === 'mr') speechLang = 'mr-IN';
      else if (language === 'hi' || language === 'hinglish') speechLang = 'hi-IN';
      recognition.lang = speechLang;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-3xl mx-auto bg-white rounded-3xl border border-purple-100 shadow-xs overflow-hidden">
      {/* Top Configuration Bar: Language & Answer Mode Selector */}
      <div className="bg-gradient-to-r from-purple-50/90 via-pink-50/40 to-purple-50/90 p-3 border-b border-purple-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-900 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <span>{t.askMicrobiology}</span>
                <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.2 rounded-full font-bold">
                  Gemini 3.8 Flash
                </span>
              </h2>
            </div>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-1 text-xs">
            <Languages className="w-3.5 h-3.5 text-purple-700" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Chat Language"
              className="bg-white border border-purple-200 text-purple-900 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>

        {/* Answer Depth Mode Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-purple-900 uppercase shrink-0">Mode:</span>
          {(
            [
              { id: 'detailed', label: 'Detailed' },
              { id: 'simple', label: 'Simple' },
              { id: '2marks', label: '2 Marks' },
              { id: '5marks', label: '5 Marks' },
              { id: '10marks', label: '10 Marks' },
              { id: 'viva', label: 'Viva Voce' },
              { id: 'mcq', label: 'MCQs' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all ${
                activeMode === m.id
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-purple-900 border border-purple-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7FD]/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white text-xs ${
                  isUser
                    ? 'bg-pink-600'
                    : 'bg-purple-900 shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm space-y-2 shadow-xs ${
                  isUser
                    ? 'bg-purple-900 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-purple-100 rounded-tl-xs'
                }`}
              >
                {/* Mode Pill for AI */}
                {!isUser && msg.mode && (
                  <div className="flex items-center justify-between text-[10px] text-purple-900/70 border-b border-purple-50 pb-1.5 font-bold uppercase tracking-wider">
                    <span>Format: {msg.mode}</span>
                    <span>Microbiology Tutor</span>
                  </div>
                )}

                {/* Message Markdown-like text formatting */}
                <div className="whitespace-pre-line leading-relaxed font-normal">
                  {msg.text}
                </div>

                {/* AI Action buttons: Copy, Save to Notes */}
                {!isUser && (
                  <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-purple-900 flex items-center gap-1 font-semibold transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSaveNote(msg)}
                        className="hover:text-pink-600 flex items-center gap-1 font-semibold transition-colors"
                      >
                        {savedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-pink-600" />
                            <span className="text-pink-600">Saved</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Save to Notes</span>
                          </>
                        )}
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Follow-up Questions Chips */}
                {!isUser && msg.sampleQuestions && msg.sampleQuestions.length > 0 && (
                  <div className="pt-2 border-t border-purple-50 space-y-1.5">
                    <span className="text-[10px] font-bold text-purple-900 uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-600" />
                      Suggested Follow-ups:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.sampleQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q)}
                          className="text-left bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs px-2.5 py-1.5 rounded-xl border border-purple-100 transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate">{q}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-700 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-purple-900 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-white border border-purple-100 rounded-2xl rounded-tl-xs p-3 shadow-xs flex items-center gap-2 text-xs text-purple-900 font-semibold">
              <Sparkles className="w-4 h-4 animate-spin text-pink-600" />
              <span>Analyzing microbiology literature in {language.toUpperCase()}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      {messages.length <= 2 && (
        <div className="p-2 border-t border-purple-50 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0 pl-1">Suggested:</span>
          {SUGGESTED_QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="shrink-0 text-[11px] bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-100 px-2.5 py-1 rounded-full font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-purple-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleVoiceInput}
            title={isRecording ? 'Stop Recording' : 'Voice Input'}
            className={`p-2.5 rounded-xl border transition-colors ${
              isRecording
                ? 'bg-red-500 text-white border-red-500 animate-pulse'
                : 'text-purple-900 hover:bg-purple-50 border-purple-200'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'मायक्रोबायोलॉजी प्रश्न विचारा...'
                : language === 'hi'
                ? 'माइक्रोबायोलॉजी सवाल पूछें...'
                : language === 'hinglish'
                ? 'Microbiology doubt poocho (e.g. Gram stain principle kya hai?)...'
                : 'Ask any microbiology question, concept or viva trap...'
            }
            className="flex-1 bg-purple-50/40 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-slate-900 placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-gradient-to-r from-purple-900 to-pink-600 hover:from-purple-950 hover:to-pink-700 text-white p-2.5 rounded-xl shadow-md disabled:opacity-50 transition-all active:scale-95"
            aria-label="Send Question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
