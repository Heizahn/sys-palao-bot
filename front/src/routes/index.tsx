import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Messages } from '../pages/Messages';
import { Students } from '../pages/Students';
// import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';
import { ProtectedRoute } from '../components/ProtectedRute';
import { Layout } from '../components/Layout';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Layout>
              <Messages />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};
