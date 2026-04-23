const fs = require('fs');
const path = require('path');

const dirs = [
  'src/firebase',
  'src/context',
  'src/hooks',
  'src/pages',
  'src/pages/admin',
  'src/components/layout',
  'src/components/auth',
  'src/components/ui',
  'src/components/course',
  'src/components/compiler',
  'src/components/quiz',
  'src/components/leaderboard',
  'src/components/payment',
  'src/components/notifications',
  'src/components/community',
  'src/components/certificates',
  'src/components/modals',
  'src/utils',
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const files = [
  'src/context/AuthContext.jsx',
  'src/context/XPContext.jsx',
  'src/context/ThemeContext.jsx',
  'src/context/NotificationContext.jsx',
  
  'src/pages/Home.jsx',
  'src/pages/Login.jsx',
  'src/pages/Signup.jsx',
  'src/pages/ForgotPassword.jsx',
  'src/pages/Dashboard.jsx',
  'src/pages/CoursePage.jsx',
  'src/pages/CompilerPage.jsx',
  'src/pages/QuizPage.jsx',
  'src/pages/HackArena.jsx',
  'src/pages/Leaderboard.jsx',
  'src/pages/Certificates.jsx',
  'src/pages/KaliHub.jsx',
  'src/pages/Profile.jsx',
  'src/pages/PublicProfile.jsx',
  'src/pages/Pricing.jsx',
  'src/pages/DailyChallenges.jsx',
  'src/pages/Roadmaps.jsx',
  'src/pages/RoadmapDetail.jsx',
  'src/pages/InterviewPrep.jsx',
  'src/pages/Community.jsx',
  'src/pages/PostDetail.jsx',
  'src/pages/Snippets.jsx',
  'src/pages/Achievements.jsx',
  'src/pages/VerifyCert.jsx',
  'src/pages/Suspended.jsx',
  'src/pages/Maintenance.jsx',
  'src/pages/NotFound.jsx',
  'src/pages/Settings.jsx',
  
  'src/pages/admin/AdminOverview.jsx',
  'src/pages/admin/AdminUsers.jsx',
  'src/pages/admin/AdminPayments.jsx',
  'src/pages/admin/AdminContent.jsx',
  'src/pages/admin/AdminQuizzes.jsx',
  'src/pages/admin/AdminCertificates.jsx',
  'src/pages/admin/AdminChallenges.jsx',
  'src/pages/admin/AdminAnnouncements.jsx',
  'src/pages/admin/AdminSettings.jsx',
  
  'src/components/auth/ProtectedRoute.jsx',
  'src/components/auth/AdminRoute.jsx'
];

files.forEach(f => {
  const compName = path.basename(f, '.jsx');
  const cnt = `import React from 'react';\n\nexport const ${compName} = ({ children }) => { return <>{children || <div>${compName}</div>}</>; };\n\nexport default ${compName};`;
  // Overwrite to make sure they are simple components
  fs.writeFileSync(path.join(__dirname, f), cnt);
});

console.log('Scaffolding complete.');
