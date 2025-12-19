import React, { useState } from 'react';
import { Send, User, Mail, Phone, Briefcase, GraduationCap, Star, FileText, CheckCircle, Sparkles, Award } from 'lucide-react';
import type { Application } from '../App';

interface EmployeeFormProps {
  onSubmit: (data: Omit<Application, 'id' | 'status' | 'submittedAt'>) => void;
}

function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    experience: '',
    education: '',
    skills: '',
    coverLetter: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Service',
    'Product Management',
  ];

  const positions = [
    'Software Engineer',
    'Senior Software Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Data Analyst',
    'Marketing Specialist',
    'Sales Representative',
    'HR Coordinator',
    'Financial Analyst',
    'Operations Manager',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          department: '',
          experience: '',
          education: '',
          skills: '',
          coverLetter: '',
        });
      }, 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-12 text-center border border-green-200">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-full shadow-lg">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Application Submitted Successfully!
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Thank you for your application! Our HR team will review it carefully and get back to you soon.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-blue-800">
                  Application ID: #{Date.now().toString().slice(-6)}
                </span>
              </div>
              <p className="text-blue-600 font-medium">
                Save this ID to track your application status
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-2">✓</div>
                <p className="text-sm text-gray-600 font-medium">Application Received</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-yellow-600 mb-2">⏳</div>
                <p className="text-sm text-gray-600 font-medium">Under Review</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="text-2xl font-bold text-blue-600 mb-2">📧</div>
                <p className="text-sm text-gray-600 font-medium">Response Coming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-10 py-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-white/20 rounded-2xl mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Join Our Team</h2>
                <p className="text-blue-100 text-lg">Start your journey with us by completing this application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-12">
          {/* Personal Information */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg ${
                    errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg ${
                    errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              Job Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Position Applied For *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg ${
                    errors.position ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Select a position</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                {errors.position && <p className="text-red-500 text-sm mt-2 font-medium">{errors.position}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg ${
                    errors.department ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-2 font-medium">{errors.department}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              Professional Information
            </h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Work Experience *
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg resize-none ${
                    errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Describe your relevant work experience, including company names, positions, and key achievements..."
                />
                {errors.experience && <p className="text-red-500 text-sm mt-2 font-medium">{errors.experience}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Education *
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg resize-none ${
                    errors.education ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="List your educational background, degrees, certifications, and relevant coursework..."
                />
                {errors.education && <p className="text-red-500 text-sm mt-2 font-medium">{errors.education}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Skills & Competencies *
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg resize-none ${
                    errors.skills ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="List your technical skills, soft skills, languages, and any other relevant competencies..."
                />
                {errors.skills && <p className="text-red-500 text-sm mt-2 font-medium">{errors.skills}</p>}
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              Cover Letter
            </h3>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Why do you want to join our company? *
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg resize-none ${
                  errors.coverLetter ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Tell us about your motivation, what interests you about this role, and how you can contribute to our team..."
              />
              {errors.coverLetter && <p className="text-red-500 text-sm mt-2 font-medium">{errors.coverLetter}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8 border-t-2 border-gray-100">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 flex items-center space-x-4 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              <Send className="w-6 h-6" />
              <span>Submit Application</span>
              <Sparkles className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;