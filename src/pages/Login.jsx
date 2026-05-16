import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ui/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate static login with pre-defined credentials
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin123') {
        localStorage.setItem('auth_user', JSON.stringify({ email }));
        toast.success('Access Granted');
        navigate('/dashboard');
      } else {
        toast.error('Invalid Credentials');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen h-screen w-screen flex bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Left Side: Branding & Marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden flex-col justify-between p-12 select-none">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-xl">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter italic">RECT.IO</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-black text-white leading-tight mb-6"
          >
            Manage your <br/>
            <span className="text-indigo-200">enterprise data</span> <br/>
            with precision.
          </motion.h1>
          <p className="text-indigo-100 text-lg max-w-md">
            The all-in-one platform for modern administration, real-time analytics, and seamless team collaboration.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          {[
            { icon: ShieldCheck, title: "Enterprise Security", desc: "Grade A encryption" },
            { icon: Layers, title: "Modular System", desc: "Scalable architecture" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col gap-2"
            >
              <div className="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center text-white mb-2">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="text-sm text-indigo-200">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative bg-white dark:bg-slate-950">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="lg:hidden flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Zap size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter">RECT.IO</span>
            </div>
          </div>

          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Login</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Enter your authorized credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-5">
              <Input 
                label="Email Address" 
                icon={Mail} 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              
              <div className="relative group">
                <Input 
                  label="Password" 
                  icon={Lock} 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[18px] text-slate-400 hover:text-indigo-600 transition-colors z-20 p-2 rounded-md"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <label className="flex items-center gap-2 cursor-pointer group w-full sm:w-auto">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer w-5 h-5 rounded-md border-slate-200 text-indigo-600 focus:ring-indigo-600 transition-all cursor-pointer" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Keep me signed in</span>
              </label>
              <a href="#" className="text-sm font-black text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline whitespace-nowrap">Trouble signing in?</a>
            </div>

            <Button 
              type="submit" 
              isLoading={loading} 
              className="w-full py-4 text-base font-black tracking-wide"
            >
              SIGN INTO DASHBOARD <ArrowRight size={20} className="ml-2" />
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            By logging in, you agree to our <a href="#" className="font-bold text-slate-900 dark:text-white hover:underline">Terms of Service</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
