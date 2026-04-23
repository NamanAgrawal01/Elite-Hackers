const fs = require('fs');
const path = require('path');

const files = [
  'src/components/notifications/NotificationBell.jsx',
  'src/components/dashboard/GlobalActivityFeed.jsx',
  'src/pages/About.jsx',
  'src/pages/Achievements.jsx',
  'src/pages/Community.jsx',
  'src/pages/CommunitySquads.jsx',
  'src/pages/Contact.jsx',
  'src/pages/DailyChallenges.jsx',
  'src/pages/Dashboard.jsx',
  'src/pages/EliteHall.jsx',
  'src/pages/ForgotPassword.jsx',
  'src/pages/HackArena.jsx',
  'src/pages/Home.jsx',
  'src/pages/InterviewPrep.jsx',
  'src/pages/QuizPage.jsx',
  'src/pages/Signup.jsx'
];

files.forEach(file => {
  const absolutePath = path.join(process.cwd(), file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    content = content.replace(/motion as Motion as Motion/g, 'motion');
    // Also fix potential <Motion. instead of <motion.
    content = content.replace(/<Motion\./g, '<motion.');
    content = content.replace(/<\/Motion\./g, '</motion.');
    fs.writeFileSync(absolutePath, content);
    console.log(`Fixed ${file}`);
  }
});
