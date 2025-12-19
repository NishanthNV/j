import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, Eye, Calendar, Mail, Phone, User, Briefcase, GraduationCap, FileText, TrendingUp, Award, Star } from 'lucide-react';
import type { Application } from '../App';

interface HRDashboardProps {
  applications: Application[];
  onReview: (id: string, status: 'approved' | 'rejected', reviewedBy: string) => void;
}

function HRDashboard({ applications, onReview }: HRDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-4 py-2 rounded-xl text-sm font-bold";
    switch (status) {
      case 'pending': return `${baseClasses} bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200`;
      case 'approved': return `${baseClasses} bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200`;
      case 'rejected': return `${baseClasses} bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200`;
      default: return baseClasses;
    }
  };

  const handleReview = (id: string, status: 'approved' | 'rejected') => {
    onReview(id, status, 'HR Manager');
    setSelectedApplication(null);
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-sm font-semibold text-blue-600 mb-2">Total Applications</p>
            <p className="text-4xl font-bold text-blue-900">{stats.total}</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl shadow-xl p-8 border border-yellow-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-sm font-semibold text-yellow-600 mb-2">Pending Review</p>
            <p className="text-4xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl p-8 border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-green-600 mb-2">Approved</p>
            <p className="text-4xl font-bold text-green-900">{stats.approved}</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl shadow-xl p-8 border border-red-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-sm font-semibold text-red-600 mb-2">Rejected</p>
            <p className="text-4xl font-bold text-red-900">{stats.rejected}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by name, email, position, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
              />
            </div>
          </div>
          <div className="lg:w-64">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">
            Applications ({filteredApplications.length})
          </h3>
        </div>
        
        {filteredApplications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl font-semibold mb-2">No applications found</p>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-8 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {application.firstName} {application.lastName}
                        </h4>
                        <div className="flex items-center space-x-6 mb-3">
                          <span className="text-lg font-semibold text-blue-600">{application.position}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-lg text-gray-600">{application.department}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600 font-medium">{application.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600 font-medium">
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadge(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="flex items-center space-x-2 px-6 py-3 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-600 font-semibold"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-screen overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-8 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h3>
                <p className="text-blue-100 text-lg font-medium">
                  {selectedApplication.position} • {selectedApplication.department}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={getStatusBadge(selectedApplication.status)}>
                  {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                </span>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-white hover:text-gray-300 text-3xl font-bold p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-10 space-y-10">
              {/* Contact Information */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  Contact Information
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-800 font-semibold text-lg">{selectedApplication.email}</span>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-800 font-semibold text-lg">{selectedApplication.phone}</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl mr-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  Work Experience
                </h4>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.experience}</p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-4">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  Education
                </h4>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.education}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mr-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  Skills & Competencies
                </h4>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.skills}</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  Cover Letter
                </h4>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.coverLetter}</p>
                </div>
              </div>

              {/* Review Actions */}
              {selectedApplication.status === 'pending' && (
                <div className="flex justify-center space-x-6 pt-8 border-t-2 border-gray-200">
                  <button
                    onClick={() => handleReview(selectedApplication.id, 'rejected')}
                    className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <XCircle className="w-6 h-6" />
                    <span className="text-lg">Reject Application</span>
                  </button>
                  <button
                    onClick={() => handleReview(selectedApplication.id, 'approved')}
                    className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg">Approve Application</span>
                  </button>
                </div>
              )}

              {selectedApplication.status !== 'pending' && (
                <div className="pt-8 border-t-2 border-gray-200">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                    <p className="text-gray-600 font-semibold text-lg">
                      Reviewed on {new Date(selectedApplication.reviewedAt!).toLocaleDateString()} by {selectedApplication.reviewedBy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRDashboard;