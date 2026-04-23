import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts
import AuthProvider from './context/AuthContext';
import XPProvider from './context/XPContext';
import ThemeProvider from './context/ThemeContext';
import NotificationProvider from './context/NotificationContext';

// Auth & Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import OwnerRoute from './components/auth/OwnerRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCert from './pages/VerifyCert';
import PublicProfile from './pages/PublicProfile';
import Suspended from './pages/Suspended';
import Maintenance from './pages/Maintenance';
import NotFound from './pages/NotFound';

// Protected Pages
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import CompilerPage from './pages/CompilerPage';
import QuizPage from './pages/QuizPage';
import HackArena from './pages/HackArena';
import Leaderboard from './pages/Leaderboard';
import Certificates from './pages/Certificates';
import KaliHub from './pages/KaliHub';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import DailyChallenges from './pages/DailyChallenges';
import Roadmaps from './pages/Roadmaps';
import RoadmapDetail from './pages/RoadmapDetail';
import InterviewPrep from './pages/InterviewPrep';
import Snippets from './pages/Snippets';
import Community from './pages/Community';
import CommunitySquads from './pages/CommunitySquads';
import PostDetail from './pages/PostDetail';
import Achievements from './pages/Achievements';
import AdminMatrix from './pages/AdminMatrix';
import SubscriptionStatus from './pages/SubscriptionStatus';
import Arsenal from './pages/Arsenal';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminContent from './pages/admin/AdminContent';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminChallenges from './pages/admin/AdminChallenges';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSettings from './pages/admin/AdminSettings';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <XPProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify/:certId" element={<VerifyCert />} />
                <Route path="/user/:username" element={<PublicProfile />} />
                <Route path="/suspended" element={<Suspended />} />
                <Route path="/maintenance" element={<Maintenance />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/course/:languageId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
                <Route path="/compiler" element={<ProtectedRoute><CompilerPage /></ProtectedRoute>} />
                <Route path="/quiz/:languageId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                <Route path="/arena" element={<ProtectedRoute><HackArena /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
                <Route path="/kali" element={<ProtectedRoute><KaliHub /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                <Route path="/daily-challenges" element={<ProtectedRoute><DailyChallenges /></ProtectedRoute>} />
                <Route path="/roadmaps" element={<ProtectedRoute><Roadmaps /></ProtectedRoute>} />
                <Route path="/roadmaps/:id" element={<ProtectedRoute><RoadmapDetail /></ProtectedRoute>} />
                <Route path="/interview-prep" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
                <Route path="/snippets" element={<ProtectedRoute><Snippets /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/community/squads" element={<ProtectedRoute><CommunitySquads /></ProtectedRoute>} />
                <Route path="/community/post/:postId" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
                <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
                <Route path="/admin-matrix" element={<ProtectedRoute><AdminMatrix /></ProtectedRoute>} />
                <Route path="/subscription" element={<ProtectedRoute><SubscriptionStatus /></ProtectedRoute>} />
                <Route path="/arsenal" element={<ProtectedRoute><Arsenal /></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute><AdminOverview /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                <Route path="/admin/payments" element={<OwnerRoute><AdminPayments /></OwnerRoute>} />
                <Route path="/admin/content" element={<AdminRoute><AdminContent /></AdminRoute>} />
                <Route path="/admin/quizzes" element={<AdminRoute><AdminQuizzes /></AdminRoute>} />
                <Route path="/admin/certificates" element={<AdminRoute><AdminCertificates /></AdminRoute>} />
                <Route path="/admin/challenges" element={<AdminRoute><AdminChallenges /></AdminRoute>} />
                <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} />
                <Route path="/admin/settings" element={<OwnerRoute><AdminSettings /></OwnerRoute>} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'hacker-toast',
                style: {
                  background: '#0d1117eb',
                  color: '#00ff88',
                  border: '1px solid #1a2236',
                  borderRadius: '12px',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                },
                success: {
                  iconTheme: {
                    primary: '#00ff88',
                    secondary: '#050508',
                  },
                },
              }} 
            />
          </NotificationProvider>
        </XPProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
