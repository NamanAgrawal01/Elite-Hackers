import React from 'react';
import { Terminal } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 font-mono">
          <div className="max-w-2xl w-full bg-[#0d1117] border border-red/30 rounded-xl p-8 shadow-[0_0_50px_rgba(255,0,60,0.1)]">
            <div className="flex items-center gap-4 text-red mb-6">
              <div className="p-3 bg-red/10 rounded-lg">
                <Terminal size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tighter uppercase">KERNEL PANIC</h1>
                <p className="text-xs text-red/60 tracking-widest">CRITICAL SYSTEM ERROR DETECTED</p>
              </div>
            </div>

            <div className="bg-[#050508] rounded-lg p-5 border border-border mb-8 overflow-x-auto">
              <p className="text-primary mb-2 text-sm font-bold">ERROR_LOG:</p>
              <code className="text-text-secondary text-xs block whitespace-pre-wrap">
                {this.state.error?.toString() || "Unknown core dump"}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-red text-[#050508] font-bold rounded-lg hover:scale-105 transition-all uppercase text-sm tracking-widest"
              >
                [ REBOOT SYSTEM ]
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 border border-border text-text-secondary font-bold rounded-lg hover:border-primary hover:text-primary transition-all uppercase text-sm tracking-widest"
              >
                [ RETURN TO BASE ]
              </button>
            </div>
            
            <p className="mt-8 text-[10px] text-text-muted text-center uppercase tracking-[4px]">
              Tracing protocol... Unauthorized access may have caused this instability.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
