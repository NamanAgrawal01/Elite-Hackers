import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useXP } from '../context/XPContext';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { motion as Motion as Motion } from 'framer-motion';

const MOCK_QUIZ_DATA = [
  { id: 1, question: "Which of the following creates a closure in JavaScript?", options: ["Function within a function", "A global variable", "An async/await block", "A self-invoking function"], correct: 0 },
  { id: 2, question: "What is the Big-O time complexity of searching a Hash Table?", options: ["O(log n)", "O(n)", "O(1)", "O(n^2)"], correct: 2 },
  { id: 3, question: "In Python, which structure is immutable?", options: ["List", "Dictionary", "Set", "Tuple"], correct: 3 },
  { id: 4, question: "What is the primary function of a reverse proxy?", options: ["Hide client IPs", "Load balance & hide server IPs", "Prevent SQL Injection natively", "Encrypt database records"], correct: 1 },
  { id: 5, question: "Which status code represents 'Forbidden'?", options: ["401", "403", "404", "500"], correct: 1 }
];

const QuizPage = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useXP();
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === MOCK_QUIZ_DATA[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < MOCK_QUIZ_DATA.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const passMark = Math.ceil(MOCK_QUIZ_DATA.length * 0.6);
      if (score + (selectedOpt === MOCK_QUIZ_DATA[currentQ].correct ? 1 : 0) >= passMark) {
         addXP(150, `Passed ${languageId || 'Evaluation'} Quiz`);
      }
    }
  };

  if (quizFinished) {
    const finalScore = score;
    const total = MOCK_QUIZ_DATA.length;
    const passed = finalScore >= Math.ceil(total * 0.6);

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] animate-fade-in-up">
         <Helmet><title>Evaluation Results — Elite Hackers</title></Helmet>
         <div className="bg-[#0d1117] border border-[#1a2236] p-10 rounded-2xl max-w-lg w-full text-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${passed ? 'bg-primary' : 'bg-red'}`}></div>
            
            <div className={`w-24 h-24 mx-auto mt-4 ${passed ? 'bg-primary/10 text-primary border-primary' : 'bg-red/10 text-red border-red'} border-2 rounded-full flex flex-col items-center justify-center mb-6`}>
               <span className="font-display font-bold text-3xl">{finalScore}</span>
               <span className="font-mono text-xs opacity-80 uppercase tracking-widest">/ {total}</span>
            </div>

            <h2 className="font-display font-bold text-2xl tracking-widest uppercase mb-2 text-text-primary">
               {passed ? 'EVALUATION CLEARED' : 'EVALUATION FAILED'}
            </h2>
            <p className="font-mono text-sm text-text-muted mb-8 tracking-widest">
               {passed ? 'Security clearance granted. +150 XP' : 'Insufficient permissions. Authorization denied.'}
            </p>

            <div className="flex gap-4 justify-center">
               <button onClick={() => navigate('/dashboard')} className="px-6 py-3 border border-border text-text-muted rounded-md hover:text-text-primary hover:border-text-muted font-mono tracking-widest uppercase text-xs font-bold transition-colors">
                  [ TERMINALS ]
               </button>
               {passed ? (
                  <button onClick={() => navigate('/arena')} className="px-6 py-3 bg-primary text-[#050508] rounded-md font-mono tracking-widest uppercase text-xs font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all">
                     [ ENTER ARENA ]
                  </button>
               ) : (
                  <button onClick={() => window.location.reload()} className="px-6 py-3 bg-red text-white rounded-md font-mono tracking-widest uppercase text-xs font-bold hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all">
                     [ RETRY ]
                  </button>
               )}
            </div>
         </div>
      </div>
    );
  }

  const q = MOCK_QUIZ_DATA[currentQ];

  return (
    <div className="max-w-3xl mx-auto py-10 animate-fade-in-up">
      <Helmet><title>Evaluation Engine — Elite Hackers</title></Helmet>

      <div className="flex justify-between items-center mb-8">
        <div className="font-mono text-[11px] text-primary font-bold tracking-widest uppercase bg-primary/10 border border-primary/20 px-3 py-1.5 rounded">
          MODULE {currentQ + 1} OF {MOCK_QUIZ_DATA.length}
        </div>
        <div className="flex items-center gap-2 text-text-muted font-mono text-[11px] tracking-widest uppercase">
          <Clock size={14} className="text-cyan animate-pulse" /> TIME IS LOGGED
        </div>
      </div>

      <div className="w-full h-1 bg-[#1a2236] rounded-full overflow-hidden mb-12">
         <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${((currentQ) / MOCK_QUIZ_DATA.length) * 100}%` }}></div>
      </div>

      <Motion.div 
        key={q.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-bg-card border border-border p-8 rounded-2xl"
      >
         <h2 className="font-display font-bold text-2xl text-text-primary tracking-wide mb-8 leading-relaxed">
            {q.question}
         </h2>

         <div className="space-y-4">
            {q.options.map((opt, idx) => {
               let stateClass = "border-[#1a2236] text-text-secondary hover:border-text-muted bg-[#050508]";
               if (isAnswered) {
                  if (idx === q.correct) stateClass = "border-primary bg-primary/10 text-primary glow-green";
                  else if (idx === selectedOpt) stateClass = "border-red bg-red/10 text-red glow-red";
               } else if (idx === selectedOpt) {
                  stateClass = "border-cyan bg-cyan/10 text-cyan"; // shouldn't reach here normally cuz isAnswered acts instantly
               }

               return (
                 <button 
                   key={idx}
                   onClick={() => handleSelect(idx)}
                   disabled={isAnswered}
                   className={`w-full text-left p-5 border rounded-xl font-mono text-sm tracking-wide transition-all ${stateClass} flex items-center justify-between group disabled:cursor-default`}
                 >
                    <span><span className="opacity-50 mr-3">[{String.fromCharCode(65+idx)}]</span> {opt}</span>
                    {isAnswered && idx === q.correct && <CheckCircle size={18} className="text-primary" />}
                    {isAnswered && idx === selectedOpt && idx !== q.correct && <XCircle size={18} className="text-red" />}
                 </button>
               );
            })}
         </div>

         <div className="mt-10 flex justify-end">
            <button 
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-8 py-3 rounded font-mono text-xs font-bold tracking-widest uppercase transition-all ${isAnswered ? 'bg-text-primary text-bg-primary hover:scale-105' : 'bg-transparent text-text-muted border border-[#1a2236] opacity-50 cursor-not-allowed'}`}
            >
              {currentQ === MOCK_QUIZ_DATA.length - 1 ? 'SUBMIT EVALUATION' : 'NEXT PROTOCOL'} <ChevronRight size={16} />
            </button>
         </div>
      </Motion.div>
    </div>
  );
};

export default QuizPage;