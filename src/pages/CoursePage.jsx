import React, { useState } from 'react';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useXP } from '../context/XPContext';
import { Helmet } from 'react-helmet-async';
import CodeEditor from '../components/compiler/CodeEditor';
import { Play, CheckCircle, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

const API_URL = "https://emkc.org/api/v2/piston";

const MOCK_COURSE_DATA = {
  python: {
    title: "Python: Operational Security & Scripting",
    lessons: [
      {
        id: 'py-01',
        title: "Hello World Array",
        theory: "Every hacker starts somewhere. In Python, the print() function allows you to output data to the terminal. Execute a script that exactly logs 'System Intrusions Detected' to the console.",
        initialCode: "# Write your payload below\\n",
        expectedOutput: "System Intrusions Detected",
        xpReward: 50
      }
    ]
  }
};

const CoursePage = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  if (!userData) return <LoadingScreen />;
  const { addXP } = useXP();
  
  const course = MOCK_COURSE_DATA[languageId] || MOCK_COURSE_DATA['python'];
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const lesson = course.lessons[currentLessonIdx];

  const [code, setCode] = useState(lesson.initialCode);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [passed, setPassed] = useState(false);

  const runTests = async () => {
    setIsCompiling(true);
    setOutput("Executing Sandbox Tests...");
    setPassed(false);

    try {
      const response = await fetch(`${API_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: languageId === 'python' ? 'python' : 'javascript', // Fallback
          version: languageId === 'python' ? '3.10.0' : '18.15.0',
          files: [{ content: code }]
        })
      });

      const result = await response.json();
      
      if (result.run) {
        const out = (result.run.stdout || "").trim();
        setOutput(out || result.run.stderr);
        
        if (out === lesson.expectedOutput) {
          setPassed(true);
          toast.success('TEST PASSED: Payload injected successfully.', { icon: '✅' });
        } else {
          toast.error('TEST FAILED: Output did not match expected signature.', { icon: '❌' });
        }
      } else {
        setOutput(result.message || "Engine failure.");
      }
    } catch (err) {
      setOutput("CRITICAL ERROR: Unable to reach Piston nodes.");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleNextLesson = async () => {
    // Grant XP
    await addXP(lesson.xpReward, `Completed Lesson: ${lesson.title}`);
    
    // Add completion flag to userdoc if last lesson
    if (currentLessonIdx === course.lessons.length - 1) {
      if (currentUser && !userData.completedLanguages.includes(languageId)) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          completedLanguages: arrayUnion(languageId)
        });
        toast.success(`${course.title} ADDED TO YOUR ARSENAL!`, { icon: '🏆' });
      }
      navigate('/dashboard');
    } else {
      const nextIdx = currentLessonIdx + 1;
      setCurrentLessonIdx(nextIdx);
      setCode(course.lessons[nextIdx].initialCode);
      setOutput('');
      setPassed(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col xl:flex-row gap-6 animate-fade-in-up w-full">
      <Helmet>
        <title>Course Node — Elite Hackers</title>
      </Helmet>

      {/* LEFT PANE: THEORY */}
      <div className="xl:w-[400px] w-full flex flex-col h-full bg-[#0d1117] border border-[#1a2236] rounded-2xl overflow-hidden relative">
        <div className="h-14 bg-bg-primary border-b border-[#1a2236] flex items-center justify-between px-6">
           <div className="text-[12px] font-mono font-bold text-secondary tracking-widest uppercase flex items-center gap-2">
             <Cpu size={16} /> SECURE MODULE
           </div>
           <div className="text-primary font-mono text-[10px] bg-primary/10 border border-primary/20 px-2 py-1 rounded">
             {currentLessonIdx + 1} / {course.lessons.length}
           </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
          <h2 className="font-display font-bold text-2xl text-primary tracking-wide mb-6">{lesson.title}</h2>
          
          <div className="bg-[#050508] border border-[#1a2236] p-4 rounded-xl mb-6 relative overflow-hidden group glow-cyan">
             <div className="flex gap-3 text-[#00d4ff] text-[13px] font-mono leading-relaxed relative z-10">
                <ShieldAlert size={18} className="shrink-0 mt-1" />
                <p>{lesson.theory}</p>
             </div>
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-cyan/5 pointer-events-none blur-xl"></div>
          </div>

          <div className="mb-4">
             <h3 className="font-mono text-[10px] text-muted tracking-widest uppercase font-bold mb-3">Expected Payload Output</h3>
             <div className="bg-[#050508] border border-[#1a2236] text-primary font-mono text-sm p-4 rounded-lg">
                {lesson.expectedOutput}
             </div>
          </div>
          
          <div className="mb-4 mt-8 flex items-center justify-between border-t border-[#1a2236] pt-6">
             <span className="font-mono text-[10px] text-muted tracking-widest uppercase font-bold">Reward</span>
             <span className="text-gold font-bold font-mono tracking-widest">⚡ +{lesson.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: COMPILER & OUTPUT */}
      <div className="flex-1 flex flex-col h-full gap-4">
        {/* Editor Area */}
        <div className="flex-1 bg-[#0d1117] border border-[#1a2236] rounded-2xl overflow-hidden flex flex-col">
          <div className="h-12 bg-bg-primary border-b border-[#1a2236] flex items-center justify-between px-4">
            <span className="text-[10px] text-muted font-mono font-bold tracking-widest uppercase">main.{languageId === 'python' ? 'py' : 'js'}</span>
            <button 
              onClick={runTests}
              disabled={isCompiling || passed}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-6 py-1.5 rounded-md font-mono text-[11px] font-bold tracking-widest uppercase transition-all disabled:opacity-50"
            >
              {isCompiling ? <><div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> EXECUTING</> : <><Play size={12} className="fill-primary" /> TEST PAYLOAD</>}
            </button>
          </div>
          <div className="flex-1 border-b border-[#1a2236]">
            <CodeEditor language={languageId === 'python' ? 'python' : 'javascript'} code={code} onChange={setCode} />
          </div>
        </div>

        {/* Output & Control Area */}
        <div className="h-[200px] bg-[#0d1117] border border-[#1a2236] rounded-2xl p-4 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <span className="text-[10px] text-muted font-mono font-bold tracking-widest uppercase mb-2">DEBUG TERMINAL</span>
          <div className="flex-1 overflow-y-auto font-mono text-[13px] text-[#e2e8f0] hide-scrollbar whitespace-pre-wrap">
             {output || <span className="opacity-30 select-none">Awaiting input stream...</span>}
          </div>

          <div className="mt-4 pt-4 border-t border-[#1a2236] flex justify-between items-center">
             {passed ? (
                <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest font-bold">
                   <CheckCircle size={18} /> PROTOCOL CLEARED
                </div>
             ) : (
                <div className="text-muted font-mono text-[10px] tracking-widest uppercase glow-red">
                   Awaiting successful execution
                </div>
             )}

             <button 
               onClick={handleNextLesson}
               disabled={!passed}
               className={`flex items-center gap-2 px-6 py-2.5 rounded font-mono text-[11px] font-bold tracking-widest uppercase transition-all ${passed ? 'bg-primary text-[#050508] shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:bg-white' : 'bg-[#1a2236] text-muted disabled:opacity-50'}`}
             >
               {currentLessonIdx === course.lessons.length - 1 ? 'COMPLETE NODE' : 'NEXT NODE'} <ArrowRight size={14} />
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CoursePage;