import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, Briefcase } from 'lucide-react';

interface LoginScreenProps {
  language: 'en' | 'hi';
  onLogin: (userData: any) => void;
  onSkipLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ language, onLogin, onSkipLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState<any>({});

  const content = {
    en: {
      welcome: 'Welcome to PM Internship Scheme',
      subtitle: 'Your gateway to career opportunities',
      loginTitle: 'Sign In to Your Account',
      registerTitle: 'Create Your Account',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      phone: 'Phone Number (Optional)',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      switchToRegister: 'Don\'t have an account? Sign up',
      switchToLogin: 'Already have an account? Sign in',
      skipLogin: 'Continue as Guest',
      forgotPassword: 'Forgot Password?',
      orDivider: 'OR',
      benefits: {
        title: 'Why Create an Account?',
        items: [
          'Save and bookmark internships',
          'Get personalized recommendations',
          'Track your application history',
          'Access exclusive opportunities'
        ]
      },
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 6 characters'
      }
    },
    hi: {
      welcome: 'पीएम इंटर्नशिप योजना में आपका स्वागत है',
      subtitle: 'करियर के अवसरों का आपका प्रवेश द्वार',
      loginTitle: 'अपने खाते में साइन इन करें',
      registerTitle: 'अपना खाता बनाएं',
      name: 'पूरा नाम',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      phone: 'फोन नंबर (वैकल्पिक)',
      loginButton: 'साइन इन करें',
      registerButton: 'खाता बनाएं',
      switchToRegister: 'खाता नहीं है? साइन अप करें',
      switchToLogin: 'पहले से खाता है? साइन इन करें',
      skipLogin: 'अतिथि के रूप में जारी रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      orDivider: 'या',
      benefits: {
        title: 'खाता क्यों बनाएं?',
        items: [
          'इंटर्नशिप सेव और बुकमार्क करें',
          'व्यक्तिगत सिफारिशें प्राप्त करें',
          'अपने आवेदन इतिहास को ट्रैक करें',
          'विशेष अवसरों तक पहुंच प्राप्त करें'
        ]
      },
      validation: {
        nameRequired: 'नाम आवश्यक है',
        emailRequired: 'ईमेल आवश्यक है',
        emailInvalid: 'कृपया एक वैध ईमेल दर्ज करें',
        passwordRequired: 'पासवर्ड आवश्यक है',
        passwordMin: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'
      }
    }
  };

  const t = content[language];

  const validateForm = () => {
    const newErrors: any = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = t.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.validation.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.validation.passwordMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login/register
      const userData = {
        id: '1',
        name: formData.name || 'User',
        email: formData.email,
        token: 'mock-jwt-token'
      };
      
      onLogin(userData);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome & Benefits */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {t.welcome}
              </h1>
              <p className="text-blue-600 font-medium">{t.subtitle}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.benefits.title}</h3>
            <ul className="space-y-3">
              {t.benefits.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onSkipLogin}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            {t.skipLogin}
          </button>
        </div>

        {/* Right Side - Login/Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? t.loginTitle : t.registerTitle}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={t.name}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t.email}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder={t.phone}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                  {isLogin ? t.loginButton : t.registerButton}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t.orDivider}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? t.switchToRegister : t.switchToLogin}
              </button>
              
              {isLogin && (
                <div>
                  <button className="text-gray-500 hover:text-gray-700 text-sm">
                    {t.forgotPassword}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};