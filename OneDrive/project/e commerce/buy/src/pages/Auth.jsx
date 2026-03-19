import { useState } from 'react';
import { mockAuth } from '../services/mockAuthService';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Chrome, ArrowRight, ChevronLeft, Heart, User } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        await mockAuth.signIn(email, password);
      } else {
        await mockAuth.signUp(email, password, fullName);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // Basic mock of Google login
      await mockAuth.signUp('google-user@example.com', 'google-pass-123', 'Google User');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await mockAuth.sendPasswordReset(email);
      setMessage('Mock password reset link sent (Check console)!');
      console.log('MOCK RESET: Link sent to', email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-sage-hint/10">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sage-moss hover:text-sage-evergreen transition mb-8 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Store</span>
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-sage-mint/30">
          <div className="bg-sage-gradient p-10 text-center border-b border-sage-mint/30">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sage/20">
              <Heart className="h-8 w-8 text-sage-evergreen fill-sage-evergreen" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
              {isLogin ? 'Welcome Back' : 'Join Jaggy'}
            </h2>
            <p className="text-sage-moss font-medium mt-2">
              {isLogin ? 'Login (Mock Mode)' : 'Start your Ayurvedic journey with Jaggy'}
            </p>
          </div>

          <div className="p-10 space-y-8">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-sage-mint/50 py-3.5 rounded-2xl text-sage-evergreen font-bold hover:bg-sage-hint/20 hover:border-sage transition-all duration-300 group disabled:opacity-50"
            >
              <Chrome className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
              Continue with Google
            </button>

            <div className="relative flex items-center gap-4 text-sage-mint">
              <div className="flex-grow border-t border-sage-mint/30"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-moss/50">or with email</span>
              <div className="flex-grow border-t border-sage-mint/30"></div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 animate-shake">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-medium border border-green-100">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-xs font-bold text-sage-moss uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sage-mint group-focus-within:text-sage-evergreen transition" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Mamta Jaggy"
                      className="w-full pl-12 pr-4 py-4 bg-sage-hint/10 border-2 border-transparent rounded-2xl focus:bg-white focus:border-sage-evergreen focus:ring-0 transition-all outline-none font-medium"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-sage-moss uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sage-mint group-focus-within:text-sage-evergreen transition" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@jaggy.test"
                    className="w-full pl-12 pr-4 py-4 bg-sage-hint/10 border-2 border-transparent rounded-2xl focus:bg-white focus:border-sage-evergreen focus:ring-0 transition-all outline-none font-medium"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-sage-moss uppercase tracking-widest">Password</label>
                  {isLogin && (
                    <button 
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[10px] font-bold text-sage-evergreen hover:underline uppercase tracking-widest"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sage-mint group-focus-within:text-sage-evergreen transition" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-sage-hint/10 border-2 border-transparent rounded-2xl focus:bg-white focus:border-sage-evergreen focus:ring-0 transition-all outline-none font-medium"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-mint hover:text-sage-evergreen transition"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-sage/30 hover:shadow-sage/50 group"
              >
                {loading ? (
                  <div className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In Now' : 'Create Account'}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sage-moss text-sm font-medium">
                {isLogin ? "New to Jaggy? " : "Already have an account? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
                  className="text-sage-evergreen font-black hover:underline underline-offset-4"
                >
                  {isLogin ? 'Register Here' : 'Login Here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
