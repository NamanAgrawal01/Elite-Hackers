import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/ui/LoadingScreen';

// Contexts
import AuthProvider from './context/AuthContext';
import XPProvider from './context/XPContext';
import ThemeProvider from './context/ThemeContext';
import NotificationProvider from './context/NotificationContext';

// Auth & Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import OwnerRoute from './components/auth/OwnerRoute';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyCert = lazy(() => import('./pages/VerifyCert'));
const PublicProfile = lazy(() => import('./pages/PublicProfile'));
const Suspended = lazy(() => import('./pages/Suspended'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CoursePage = lazy(() => import('./pages/CoursePage'));
const CompilerPage = lazy(() => import('./pages/CompilerPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const HackArena = lazy(() => import('./pages/HackArena'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Certificates = lazy(() => import('./pages/Certificates'));
const KaliHub = lazy(() => import('./pages/KaliHub'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Pricing = lazy(() => import('./pages/Pricing'));
const DailyChallenges = lazy(() => import('./pages/DailyChallenges'));
const Roadmaps = lazy(() => import('./pages/Roadmaps'));
const RoadmapDetail = lazy(() => import('./pages/RoadmapDetail'));
const InterviewPrep = lazy(() => import('./pages/InterviewPrep'));
const Snippets = lazy(() => import('./pages/Snippets'));
const Community = lazy(() => import('./pages/Community'));
const CommunitySquads = lazy(() => import('./pages/CommunitySquads'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Achievements = lazy(() => import('./pages/Achievements'));
const AdminMatrix = lazy(() => import('./pages/AdminMatrix'));
const SubscriptionStatus = lazy(() => import('./pages/SubscriptionStatus'));
const Arsenal = lazy(() => import('./pages/Arsenal'));

const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent'));
const AdminQuizzes = lazy(() => import('./pages/admin/AdminQuizzes'));
const AdminCertificates = lazy(() => import('./pages/admin/AdminCertificates'));
const AdminChallenges = lazy(() => import('./pages/admin/AdminChallenges'));
const AdminAnnouncements = lazy(() => import('./pages/admin/AdminAnnouncements'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <XPProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingScreen />}>
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
              </Suspense>
            </BrowserRouter>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'hacker-toast',
                style: {
                  background: 'rgba(10, 12, 22, 0.92)',
                  color: '#00ff88',
                  border: '1px solid var(--border)',
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
                    secondary: 'var(--bg-primary)',
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
