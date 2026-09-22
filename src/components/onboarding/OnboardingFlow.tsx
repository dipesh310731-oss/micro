import React, { useState } from 'react';
import { MicroLogo } from '../common/MicroLogo';
import { Sparkles, BookOpen, FlaskConical, ArrowRight, Check } from 'lucide-react';
import { SupportedLanguage } from '../../types/microbiology';

interface OnboardingFlowProps {
  onComplete: () => void;
  language: SupportedLanguage;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Analyze',
      subtitle: 'Petri Plate Image Analysis & Colony Counting',
      description:
        'Upload or capture Petri plate photographs. Our computer-vision and AI models detect plate rims, isolate colonies, count colonies, and categorize morphology traits.',
      icon: Sparkles,
      color: 'from-purple-900 via-purple-800 to-pink-600',
      tag: 'Step 1 of 3',
    },
    {
      title: 'Learn',
      subtitle: 'Complete Microbiology Knowledge & Study Hub',
      description:
        'Master 14 major microbiology branches including Bacteriology, Virology, Mycology, Immunology, and Genetics with exam-oriented 2-mark, 5-mark, and 10-mark notes, MCQs, and Viva questions.',
      icon: BookOpen,
      color: 'from-pink-600 via-purple-700 to-indigo-800',
      tag: 'Step 2 of 3',
    },
    {
      title: 'Discover',
      subtitle: 'Explore Lab Techniques, Microscopy & AI Q&A',
      description:
        'Hands-on laboratory protocols for Gram staining, biochemical test batteries (Catalase, Oxidase, IMViC), autoclaves, and instant multilingual AI question-answering in English, Marathi, Hindi, and Hinglish.',
      icon: FlaskConical,
      color: 'from-purple-900 via-indigo-900 to-pink-600',
      tag: 'Step 3 of 3',
    },
  ];

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7FD] flex flex-col justify-between p-6 max-w-md mx-auto sm:max-w-xl md:max-w-2xl overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <MicroLogo size={34} />
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            MICRO <span className="text-pink-600">ANALYSIS</span>
          </span>
        </div>
        <button
          onClick={onComplete}
          className="text-xs font-semibold text-purple-900/70 hover:text-purple-950 px-3 py-1.5 rounded-lg hover:bg-purple-100/50 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Illustration & Card Content */}
      <div className="my-auto py-8 flex flex-col items-center text-center">
        {/* Animated Badge & Icon */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center p-2 shadow-inner border border-purple-200/60">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg shadow-purple-900/20`}>
              <StepIcon className="w-10 h-10 stroke-[2]" />
            </div>
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border border-purple-200 text-purple-900 font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {step.tag}
          </span>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          “{step.title}”
        </h2>
        <h3 className="text-sm font-bold text-pink-600 mb-4 max-w-xs leading-snug">
          {step.subtitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xs leading-relaxed">
          {step.description}
        </p>

        {/* Dots indicator */}
        <div className="flex items-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? 'w-8 bg-purple-800' : 'w-2 bg-purple-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pb-4 space-y-3">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-pink-600 hover:from-purple-950 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <span>Get Started</span>
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-600 font-medium">
          Professional scientific platform for microbiology learners & laboratories
        </p>
      </div>
    </div>
  );
};
