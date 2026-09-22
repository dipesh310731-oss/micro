import React, { useState } from 'react';
import {
  User,
  Building2,
  GraduationCap,
  Mail,
  Globe,
  Flame,
  Bookmark,
  FileText,
  ShieldAlert,
  Info,
  LogOut,
  Edit2,
  Check,
  Moon,
  Sun,
  Award
} from 'lucide-react';
import { UserProfile, SupportedLanguage, SavedNote, PetriAnalysisResult } from '../../types/microbiology';
import { MicroLogo } from '../common/MicroLogo';
import { translations } from '../../data/translations';

interface UserProfileHubProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  savedNotes: SavedNote[];
  reports: PetriAnalysisResult[];
  onOpenReport: (report: PetriAnalysisResult) => void;
  onOpenAuthModal: () => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const UserProfileHub: React.FC<UserProfileHubProps> = ({
  user,
  onUpdateUser,
  savedNotes,
  reports,
  onOpenReport,
  onOpenAuthModal,
  language,
  onLanguageChange,
}) => {
  const t = translations[language] || translations.en;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [institution, setInstitution] = useState(user.institution);
  const [course, setCourse] = useState(user.course);
  const [role, setRole] = useState(user.role);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      institution,
      course,
      role,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-900 to-pink-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-purple-900/20 shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {user.name}
                </h2>
                <p className="text-xs font-bold text-pink-600 capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-1.5 self-center sm:self-start bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-200 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
              <Mail className="w-3.5 h-3.5 text-purple-700" />
              <span>{user.email}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                {user.institution || 'Department of Microbiology'}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                {user.course || 'Undergraduate Microbiology'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-5 pt-4 border-t border-purple-50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="student">Student</option>
                <option value="researcher">Researcher</option>
                <option value="lab_technician">Lab Technician</option>
                <option value="educator">Educator</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Course / Specialization</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs font-medium"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-purple-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-950 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Flame className="w-4 h-4 fill-amber-500" />
          </div>
          <p className="text-xl font-black text-slate-900">{user.studyStreakDays} Days</p>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Study Streak</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900">{reports.length}</p>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Plate Reports</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900">{savedNotes.length}</p>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Saved Notes</span>
        </div>
      </div>

      {/* Language & App Preferences */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900">Application Preferences</h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/40 border border-purple-100/60">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-purple-700" />
              <div>
                <span className="font-bold text-slate-800">Interface & AI Language</span>
                <p className="text-[10px] text-slate-500">Supports English, Marathi, Hindi, and Hinglish</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Application Language"
              className="bg-white border border-purple-200 text-purple-900 text-xs font-bold rounded-xl px-2.5 py-1.5"
            >
              <option value="en">English (EN)</option>
              <option value="mr">मराठी (MR)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Saved Study Notes Preview */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-pink-600" />
            <span>Saved Study Notes ({savedNotes.length})</span>
          </h3>
        </div>

        {savedNotes.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            No saved notes yet. Bookmark answers from AI Chat or Exam Notes in the Study Hub.
          </p>
        ) : (
          <div className="space-y-2">
            {savedNotes.slice(0, 4).map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-2xl bg-purple-50/40 border border-purple-100 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950 truncate max-w-xs">{note.title}</span>
                  <span className="text-[10px] bg-purple-200/80 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                    {note.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About & Version Information */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <MicroLogo size={28} />
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs">MICRO ANALYSIS v2.4</h4>
            <p className="text-[10px] text-purple-900 font-semibold">“Analyze. Learn. Discover.”</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Developed for university microbiology faculties, clinical training laboratories, and students worldwide.
          Incorporates Computer Vision colony isolation models, multi-language Gemini 3.8 Flash RAG AI, and standard diagnostic microbiology criteria.
        </p>
      </div>
    </div>
  );
};
