import { 
    Terminal, Crosshair, Award, Shield, Trophy, Activity, 
    Home, Zap, Map, Star, Briefcase, Code, Users, User, Settings as SettingsIcon, LogOut, ShieldAlert,
    Target, Globe, Database as DatabaseIcon, Brain
} from 'lucide-react';

export const CATEGORIES = ['ALL', 'WEB', 'SYSTEMS', 'DATA/ML', 'MOBILE', 'SECURITY', 'DATABASE'];

export const LANGUAGES = [
    { id: 'python', name: 'Python', category: 'DATA/ML', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 500, icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', category: 'WEB', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 400, icon: '⚡' },
    { id: 'rust', name: 'Rust', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1200, icon: '🦀' },
    { id: 'go', name: 'Go', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 900, icon: '🐹' },
    { id: 'sql', name: 'SQL', category: 'DATABASE', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 300, icon: '🗄️' },
    { id: 'bash', name: 'Bash', category: 'SECURITY', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 600, icon: '🐚' },
    { id: 'swift', name: 'Swift', category: 'MOBILE', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 800, icon: '📱' },
    { id: 'c', name: 'C', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1500, icon: '⚙️' },
    { id: 'cpp', name: 'C++', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1300, icon: '🚀' },
    { id: 'java', name: 'Java', category: 'SYSTEMS', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 600, icon: '☕' },
    { id: 'csharp', name: 'C#', category: 'SYSTEMS', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 550, icon: '🎮' },
    { id: 'php', name: 'PHP', category: 'WEB', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 350, icon: '🐘' },
    { id: 'ruby', name: 'Ruby', category: 'WEB', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 450, icon: '💎' },
    { id: 'typescript', name: 'TypeScript', category: 'WEB', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 500, icon: '📘' },
    { id: 'kotlin', name: 'Kotlin', category: 'MOBILE', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 650, icon: '🎯' },
    { id: 'scala', name: 'Scala', category: 'DATA/ML', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1000, icon: '🌀' },
    { id: 'perl', name: 'Perl', category: 'SECURITY', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 700, icon: '🐫' },
    { id: 'r', name: 'R', category: 'DATA/ML', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 600, icon: '📊' },
    { id: 'dart', name: 'Dart', category: 'MOBILE', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 400, icon: '🎯' },
    { id: 'haskell', name: 'Haskell', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1400, icon: 'λ' },
    { id: 'lua', name: 'Lua', category: 'SYSTEMS', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 300, icon: '🌙' },
    { id: 'erlang', name: 'Erlang', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1100, icon: '📡' },
    { id: 'clojure', name: 'Clojure', category: 'DATA/ML', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 950, icon: '☯️' },
    { id: 'elixir', name: 'Elixir', category: 'WEB', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 800, icon: '💧' },
    { id: 'julia', name: 'Julia', category: 'DATA/ML', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 750, icon: '🍕' },
    { id: 'fsharp', name: 'F#', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 850, icon: '📈' },
    { id: 'groovy', name: 'Groovy', category: 'SYSTEMS', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 400, icon: '🎸' },
    { id: 'objectivec', name: 'Objective-C', category: 'MOBILE', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 900, icon: '🍎' },
    { id: 'assembly', name: 'Assembly x86', category: 'SECURITY', diffLabel: 'Expert', diffColor: '#ff003c', xp: 2000, icon: '💾' },
    { id: 'fortran', name: 'Fortran', category: 'DATA/ML', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1500, icon: '📜' },
    { id: 'cobol', name: 'COBOL', category: 'DATABASE', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 800, icon: '🏦' },
    { id: 'ada', name: 'Ada', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1000, icon: '🛡️' },
    { id: 'lisp', name: 'Lisp', category: 'DATA/ML', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1200, icon: '🖇️' },
    { id: 'scheme', name: 'Scheme', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 900, icon: '🏗️' },
    { id: 'prolog', name: 'Prolog', category: 'DATA/ML', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1100, icon: '🧠' },
    { id: 'scratch', name: 'Scratch', category: 'WEB', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 100, icon: '🐱' },
    { id: 'solidity', name: 'Solidity', category: 'SECURITY', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 800, icon: '⛓️' },
    { id: 'vyper', name: 'Vyper', category: 'SECURITY', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 950, icon: '🐍' },
    { id: 'zig', name: 'Zig', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1200, icon: '⚡' },
    { id: 'nim', name: 'Nim', category: 'SYSTEMS', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 700, icon: '👑' },
    { id: 'carbon', name: 'Carbon', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1300, icon: '💎' },
    { id: 'mojo', name: 'Mojo', category: 'DATA/ML', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1100, icon: '🔥' },
    { id: 'v', name: 'V Language', category: 'SYSTEMS', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 600, icon: '✌️' },
    { id: 'hare', name: 'Hare', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 800, icon: '🐇' },
    { id: 'odin', name: 'Odin', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 900, icon: '⚔️' },
    { id: 'beef', name: 'Beef', category: 'SYSTEMS', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 700, icon: '🥩' },
    { id: 'roc', name: 'Roc', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 1000, icon: '🦅' },
    { id: 'gleam', name: 'Gleam', category: 'WEB', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 750, icon: '✨' },
    { id: 'pkl', name: 'Pkl', category: 'SYSTEMS', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 400, icon: '🥒' },
    { id: 'ocaml', name: 'OCaml', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1300, icon: '🐫' },
    { id: 'pascal', name: 'Pascal', category: 'SYSTEMS', diffLabel: 'Beginner', diffColor: '#00ff88', xp: 300, icon: '🎨' },
    { id: 'smalltalk', name: 'Smalltalk', category: 'SYSTEMS', diffLabel: 'Advanced', diffColor: '#ff6b35', xp: 900, icon: '🗣️' },
    { id: 'tcl', name: 'Tcl', category: 'SECURITY', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 500, icon: '🧵' },
    { id: 'postscript', name: 'PostScript', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1100, icon: '🖨️' },
    { id: 'matlab', name: 'MATLAB', category: 'DATA/ML', diffLabel: 'Intermediate', diffColor: '#00d4ff', xp: 600, icon: '📐' },
    { id: 'verilog', name: 'Verilog', category: 'SYSTEMS', diffLabel: 'Expert', diffColor: '#ff003c', xp: 1600, icon: '🔌' },
];

export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Languages', path: '/arsenal', icon: Terminal },
    { name: 'Compiler', path: '/compiler', icon: Zap },
    { name: 'Daily Challenges', path: '/daily-challenges', icon: Zap },
    { name: 'Roadmaps', path: '/roadmaps', icon: Map },
    { name: 'Hack Arena', path: '/arena', icon: Activity },
    { name: 'Hall of Fame', path: '/leaderboard', icon: Trophy },
    { name: 'Certificates', path: '/certificates', icon: Award },
    { name: 'Achievements', path: '/achievements', icon: Star },
    { name: 'Interview Prep', path: '/interview-prep', icon: Briefcase },
    { name: 'Code Snippets', path: '/snippets', icon: Code },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Kali Hub', path: '/kali', icon: Shield, color: 'text-red' },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export const ROADMAPS = [
    {
      id: 'full-stack-engineer',
      title: 'Full-Stack Engineer',
      icon: Globe,
      color: 'text-cyan',
      desc: 'Master the entire web ecosystem from DOM to Distributed Systems.',
      steps: ['HTML/CSS/JS Mastery', 'Frontend Frameworks (React)', 'Backend Systems (Node/Python)', 'Databases & Arch', 'Cloud Deployment']
    },
    {
      id: 'cyber-security',
      title: 'Offensive Security',
      icon: Shield,
      color: 'text-red',
      desc: 'Become an elite penetration tester and ethical hacker.',
      steps: ['Networking Fundamentals', 'Linux Mastery', 'Bash & Python for Hackers', 'Web App Pentest', 'Privilege Escalation']
    },
    {
      id: 'system-architect',
      title: 'Backend & Systems',
      icon: DatabaseIcon,
      color: 'text-gold',
      desc: 'Build high-performance, scalable distributed systems.',
      steps: ['Data Structures & Algos', 'C/C++ Exploration', 'Rust Systems Programming', 'Concurrency Models', 'System Design']
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Specialist',
      icon: Brain,
      color: 'text-purple',
      desc: 'The future of code: Neural networks and data intelligence.',
      steps: ['Python for Data Science', 'Mathematics & Stats', 'TensorFlow/PyTorch', 'Neural Architectures', 'LLM Engineering']
    }
  ];

