import React, { useState } from 'react';
import { MicroLogo } from '../common/MicroLogo';
import { Mail, Lock, User, Building2, GraduationCap, X, CheckCircle2 } from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../../types/microbiology';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentUser: UserProfile;
  language: SupportedLanguage;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [institution, setInstitution] = useState(currentUser.institution || '');
  const [course, setCourse] = useState(currentUser.course || '');
  const [role, setRole] = useState<UserProfile['role']>(currentUser.role || 'student');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: UserProfile = {
      ...currentUser,
      name: name.trim() || 'Microbiology Scholar',
      email: email.trim() || 'student@microanalysis.org',
      institution: institution.trim(),
      course: course.trim(),
      role,
    };
    onLoginSuccess(updatedUser);
    onClose();
  };

  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      ...currentUser,
      name: 'Guest Microbiologist',
      email: 'guest.student@microanalysis.edu',
      institution: 'Department of Microbiology',
      course: 'B.Sc. / M.Sc. Microbiology',
      role: 'student',
    };
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-2 rounded-2xl bg-purple-50 mb-2 border border-purple-100">
            <MicroLogo size={42} />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {isSignUp ? 'Create Scholar Account' : 'Welcome to MICRO ANALYSIS'}
          </h3>
          <p className="text-xs text-purple-900/70 font-medium mt-1">
            {isSignUp ? 'Access synchronized lab reports and study progress' : 'Analyze. Learn. Discover.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Dipesh / Microbiology Student"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institution</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-purple-700 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Govt. Science College"
                  className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-8 pr-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Course / Dept</label>
              <div className="relative">
                <GraduationCap className="w-3.5 h-3.5 text-purple-700 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="B.Sc. Microbiology"
                  className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-8 pr-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Academic Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="student">Undergraduate / Postgraduate Student</option>
              <option value="researcher">Research Scholar / PhD</option>
              <option value="lab_technician">Laboratory Technician</option>
              <option value="educator">Faculty / Educator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-900 to-pink-600 hover:from-purple-950 hover:to-pink-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all active:scale-[0.99] text-sm mt-2"
          >
            {isSignUp ? 'Sign Up as Scholar' : 'Continue to Dashboard'}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-100" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-purple-900/60 bg-white px-2">
            Or quick start
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-purple-700" />
          <span>Continue as Guest Learner</span>
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-purple-800 hover:text-purple-950 font-semibold underline underline-offset-2"
          >
            {isSignUp ? 'Already have an account? Sign in' : "New to Micro Analysis? Create profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
