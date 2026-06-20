import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';

const Login = lazy(() => import('../pages/auth/Login'));
const MyReports = lazy(() => import('../pages/reports/MyReports'));
const ReportView = lazy(() => import('../pages/reports/ReportView'));
const Profile = lazy(() => import('../pages/profile/Profile'))

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Layout Wrapper */}
          <Route element={<Layout />}>
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/report/:id" element={<ReportView />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Route>

      </Routes>
    </Suspense>
  );
}