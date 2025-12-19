import React from "react";
import {
  Building,
  Users,
  FileText,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

interface AuthLoginProps {
  onLogin: (role: "employee" | "hr") => void;
}

function AuthLogin({ onLogin }: AuthLoginProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl">
                  <Building className="w-16 h-16 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"></span>
            </h1>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light"></p>
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  {/* <span>Fast</span> */}
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  {/* <span>Intelligent</span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Login Cards */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Employee Login */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                        <FileText className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Employee Portal
                  </h2>
                  <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    Submit your application with ease and track your journey to
                    success
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center text-gray-600 bg-blue-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        Smart application form with validation
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-blue-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        Real-time status tracking
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-blue-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        Instant submission confirmation
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onLogin("employee")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="text-lg">Access Employee Portal</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* HR Login */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="p-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    HR Command Center
                  </h2>
                  <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    Streamline recruitment with powerful tools and intelligent
                    insights
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center text-gray-600 bg-green-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        Advanced application filtering
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-green-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        One-click approval workflow
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-green-50 rounded-xl p-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4"></div>
                      <span className="font-medium">
                        Comprehensive analytics dashboard
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onLogin("hr")}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="text-lg">Access HR Dashboard</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-6 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex items-center space-x-2 text-blue-200">
                <Shield className="w-5 h-5" />
                <span className="font-medium"></span>
              </div>
              <div className="w-1 h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Zap className="w-5 h-5" />
                <span className="font-medium"></span>
              </div>
              <div className="w-1 h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
