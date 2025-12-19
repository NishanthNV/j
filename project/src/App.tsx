import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, XCircle, Clock, Building, User, LogOut, TrendingUp } from 'lucide-react';
import EmployeeForm from './components/EmployeeForm';
import HRDashboard from './components/HRDashboard';
import AuthLogin from './components/AuthLogin';

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  experience: string;
  education: string;
  skills: string;
  coverLetter: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<'employee' | 'hr' | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedApplications = localStorage.getItem('employeeApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employeeApplications', JSON.stringify(applications));
  }, [applications]);

  const handleApplicationSubmit = (applicationData: Omit<Application, 'id' | 'status' | 'submittedAt'>) => {
    const newApplication: Application = {
      ...applicationData,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const handleApplicationReview = (id: string, status: 'approved' | 'rejected', reviewedBy: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? {
              ...app,
              status,
              reviewedAt: new Date().toISOString(),
              reviewedBy,
            }
          : app
      )
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  if (!currentUser) {
    return <AuthLogin onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  TalentFlow
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  {currentUser === 'employee' ? 'Application Portal' : 'HR Command Center'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {currentUser === 'hr' && (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <span className="font-bold text-yellow-800">{pendingCount}</span>
                      <span className="text-yellow-600 text-sm">Pending</span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-800">{approvedCount}</span>
                      <span className="text-green-600 text-sm">Approved</span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-800">{rejectedCount}</span>
                      <span className="text-red-600 text-sm">Rejected</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-700 capitalize">{currentUser}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentUser === 'employee' ? (
          <EmployeeForm onSubmit={handleApplicationSubmit} />
        ) : (
          <HRDashboard
            applications={applications}
            onReview={handleApplicationReview}
          />
        )}
      </main>
    </div>
  );
}

export default App;