import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedPage from './pages/ProdectedPage/ProtectedPage';
import NotFound from './pages/NotFound/NotFound';
import AuthGuard from './components/AuthGuard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <AuthGuard requireAuth={false}>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/protected"
        element={
          <AuthGuard requireAuth={true}>
            <ProtectedPage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
