import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CodeEditor from '../components/compiler/CodeEditor';
import { Play, RotateCcw, Download, Share2, TerminalSquare, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  python: { version: "3.10.0", name: "python" },
  javascript: { version: "18.15.0", name: "javascript" },
  java: { version: "15.0.2", name: "java" },
  c: { version: "10.2.0", name: "c" },
  cpp: { version: "10.2.0", name: "cpp" },
  rust: { version: "1.68.2", name: "rust" },
  go: { version: "1.16.2", name: "go" },
  bash: { version: "5.2.0", name: "bash" }
};

const DEFAULT_SNIPPETS = {
  python: "print('Hello, Elite Hackers!')",
  javascript: "console.log('Hello, Elite Hackers!');",
  java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Elite Hackers!\");\n  }\n}",
  c: "#include <stdio.h>\n\nint main() {\n  printf(\"Hello, Elite Hackers!\\n\");\n  return 0;\n}",
  cpp: "#include <iostream>\n\nint main() {\n  std::cout << \"Hello, Elite Hackers!\" << std::endl;\n  return 0;\n}",
  rust: "fn main() {\n  println!(\"Hello, Elite Hackers!\");\n}",
  go: "package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Hello, Elite Hackers!\")\n}",
  bash: "echo \"Hello, Elite Hackers!\""
};

const CompilerPage = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_SNIPPETS['python']);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(DEFAULT_SNIPPETS[newLang] || "");
    setOutput('');
    setIsError(false);
  };

  const executeCode = async () => {
    if (!code.trim()) return;
    
    setIsCompiling(true);
    setOutput("Executing protocol...");
    setIsError(false);

    try {
      const targetLang = LANGUAGE_VERSIONS[language];
      
      const response = await fetch(`${API_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: targetLang.name,
          version: targetLang.version,
          files: [{ content: code }]
        })
      });

      const result = await response.json();
      
      if (result.run) {
        if (result.run.stderr) {
           setIsError(true);
           setOutput(result.run.stderr + "\\n" + result.run.stdout);
        } else {
           setOutput(result.run.stdout || "Program exited with 0 (No output)");
        }
      } else {
        setIsError(true);
        setOutput(result.message || "Compilation Engine Failure.");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setOutput("CRITICAL ERROR: Unable to reach Piston execution nodes.");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleClear = () => {
    setOutput('');
    setIsError(false);
    toast('Terminal cleared.', { icon: '🧹', style: { background: '#0d1117', color: '#64748b', border: '1px solid #1a2236' }});
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col xl:flex-row gap-6 animate-fade-in-up w-full">
      <Helmet>
        <title>Compiler Interface — Elite Hackers</title>
      </Helmet>

      {/* EDITOR PANE */}
      <div className="flex-1 flex flex-col h-full bg-[#0d1117] border border-[#1a2236] rounded-2xl overflow-hidden">
        {/* Editor Toolbar */}
        <div className="h-14 bg-bg-primary border-b border-[#1a2236] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex bg-[#050508] border border-[#1a2236] rounded-md overflow-hidden relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted pointer-events-none tracking-widest uppercase font-bold font-mono">LANG:</span>
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-primary text-[12px] font-mono font-bold tracking-widest py-2 pr-8 pl-14 outline-none cursor-pointer appearance-none uppercase"
              >
                {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
                  <option key={lang} value={lang} className="bg-bg-primary text-text-primary capitalize">{lang}</option>
                ))}
              </select>
            </div>
            
            <button className="text-text-muted hover:text-cyan transition-colors" title="Download Source">
              <Download size={18} />
            </button>
            <button className="text-text-muted hover:text-purple transition-colors" title="Share Snippet">
              <Share2 size={18} />
            </button>
          </div>

          <button 
            onClick={executeCode}
            disabled={isCompiling}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-6 py-1.5 rounded-md font-mono text-[12px] font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompiling ? (
              <><div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> EXECUTING...</>
            ) : (
              <><Play size={14} className="fill-primary" /> RUN CODE</>
            )}
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1">
          <CodeEditor 
            language={language}
            code={code}
            onChange={(val) => setCode(val || "")}
          />
        </div>
      </div>

      {/* OUTPUT PANE */}
      <div className="xl:w-[450px] w-full flex flex-col h-[300px] xl:h-full bg-[#050508] border border-[#1a2236] rounded-2xl overflow-hidden relative group">
        <div className="h-12 bg-bg-primary border-b border-[#1a2236] flex items-center justify-between px-4">
           <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-text-secondary tracking-widest uppercase">
             <TerminalSquare size={14} /> OUTPUT TERMINAL
           </div>
           <button onClick={handleClear} className="text-text-muted hover:text-red transition-colors" title="Clear Terminal">
             <RotateCcw size={14} />
           </button>
        </div>
        
        <div className={`flex-1 p-4 font-mono text-[13px] overflow-y-auto whitespace-pre-wrap ${isCompiling ? 'opacity-50' : 'opacity-100'}`}>
          {output ? (
            <div className={isError ? "text-red" : "text-[#e2e8f0]"}>
               {output}
            </div>
          ) : (
            <div className="text-[#1a2236] select-none h-full flex flex-col items-center justify-center">
               <span className="text-4xl mb-3 opacity-20">📟</span>
               <span className="text-[10px] tracking-widest uppercase font-bold">Awaiting Execution...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompilerPage;