import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Lock,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Section from '../components/common/Section';
import Button from '../components/ui/Button';
import TextBox from '../components/form/TextBox';
import EmailBox from '../components/form/EmailBox';
import SwitchToggle from '../components/form/SwitchToggle';
import SelectionBox from '../components/form/SelectionBox';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Configuration updated successfully!');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-6xl mx-auto pb-12">
      <PageHeader 
        title="System Settings" 
        subtitle="Manage your profile, security preferences, and interface configurations."
        actions={
          <Button onClick={handleSave} loading={loading}>
            Save All Changes
          </Button>
        }
      />

      <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Navigation/Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Section className="bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/20">
              <div className="flex flex-col items-center text-center py-4">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black border-2 border-white/30">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white text-indigo-600 rounded-xl shadow-lg hover:scale-110 transition-transform">
                    <Smartphone size={16} />
                  </button>
                </div>
                <h3 className="text-xl font-black">John Doe</h3>
                <p className="text-indigo-100 text-sm font-medium">Enterprise Administrator</p>
                <div className="mt-6 flex gap-2">
                  <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                    Level 5
                  </div>
                  <div className="px-3 py-1 bg-green-400 text-green-900 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Verified
                  </div>
                </div>
              </div>
            </Section>

            <div className="premium-card p-2 space-y-1">
              {[
                { name: 'Profile Information', icon: User, active: true },
                { name: 'Interface & Themes', icon: Palette },
                { name: 'Security & Access', icon: Shield },
                { name: 'Notification Center', icon: Bell },
                { name: 'Cloud Integration', icon: Cloud },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    item.active 
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <Section title="Profile Information" icon={User} description="Update your personal details and identity.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextBox label="First Name" defaultValue="John" />
                <TextBox label="Last Name" defaultValue="Doe" />
              </div>
              <EmailBox label="Primary Email" defaultValue="john.doe@enterprise.com" />
              <SelectionBox 
                label="Primary Language" 
                options={[
                  { label: 'English (US)', value: 'en-US' },
                  { label: 'English (UK)', value: 'en-GB' },
                  { label: 'French', value: 'fr' },
                  { label: 'German', value: 'de' }
                ]}
                defaultValue="en-US"
              />
            </Section>

            {/* Appearance Section */}
            <Section title="Interface & Themes" icon={Palette} description="Customize how the application looks and feels.">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Dark Mode Strategy</h4>
                      <p className="text-xs text-slate-500 font-medium">Toggle between light and dark visual themes.</p>
                    </div>
                  </div>
                  <SwitchToggle 
                    checked={theme === 'dark'} 
                    onChange={toggleTheme} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Compact Interface</h4>
                      <p className="text-xs text-slate-500 font-medium">Reduce whitespace for data-intensive views.</p>
                    </div>
                  </div>
                  <SwitchToggle checked={false} />
                </div>
              </div>
            </Section>

            {/* Security Section */}
            <Section title="Security & Credentials" icon={Shield} description="Manage your authentication and account safety.">
              <div className="space-y-6">
                <div className="relative group">
                  <TextBox 
                    label="Current Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[38px] text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextBox label="New Password" type="password" placeholder="Min. 8 characters" />
                  <TextBox label="Confirm Password" type="password" placeholder="Repeat new password" />
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4">Two-Factor Authentication</h4>
                  <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1" icon={Mail}>Via Email</Button>
                    <Button variant="secondary" className="flex-1" icon={Smartphone}>Via SMS</Button>
                  </div>
                </div>
              </div>
            </Section>

            {/* Danger Zone */}
            <div className="p-8 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-3xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-black text-rose-700 dark:text-rose-400">Account Termination</h3>
                  <p className="text-sm text-rose-600 dark:text-rose-500 font-medium">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="danger">Deactivate Account</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
