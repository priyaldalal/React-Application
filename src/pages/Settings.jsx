import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  Cloud
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
import { UI_CONFIG } from '../config/uiConfig';

const Settings = () => {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t('success'));
    }, 1500);
  };

  const navItems = [
    { name: t('personal_details'), icon: User, active: true },
    { name: t('interface_themes'), icon: Palette },
    { name: t('security_access'), icon: Shield },
    { name: t('notification_center'), icon: Bell },
    { name: t('cloud_integration'), icon: Cloud },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-5xl mx-auto pb-8">
      <PageHeader 
        title={t('system_settings')} 
        subtitle={t('settings_subtitle')}
        actions={
          <Button onClick={handleSave} loading={loading} size="sm" className="shadow-lg shadow-indigo-600/20">
            {t('save_changes')}
          </Button>
        }
      />

      <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Left Column - Navigation/Summary */}
          <div className="lg:col-span-1 space-y-3">
            <Section className="bg-indigo-600 text-white border-none shadow-lg shadow-indigo-500/20">
              <div className="flex flex-col items-center text-center py-2">
                <div className="relative mb-2">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg font-black border-2 border-white/30">
                    JD
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-1 bg-white text-indigo-600 rounded-md shadow-lg hover:scale-110 transition-transform">
                    <Smartphone size={10} />
                  </button>
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-tight leading-none">John Doe</h3>
                <p className="text-indigo-100 text-[8px] font-bold uppercase tracking-widest mt-1">Enterprise Admin</p>
                <div className="mt-3 flex gap-1">
                  <div className="px-1.5 py-0.5 bg-white/10 rounded text-[7px] font-black uppercase tracking-widest border border-white/20">
                    LVL 5
                  </div>
                  <div className="px-1.5 py-0.5 bg-green-400 text-green-900 rounded text-[7px] font-black uppercase tracking-widest">
                    V-01
                  </div>
                </div>
              </div>
            </Section>

            <div className="premium-card p-1 space-y-0.5">
              {navItems.map((item, i) => (
                <button 
                  key={i}
                  className={clsx(
                    "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                    item.active 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <item.icon size={12} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-3 space-y-3">
            {/* Profile Section */}
            <Section title={t('personal_details')} icon={User} description={t('personal_details_desc')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextBox label={t('first_name')} defaultValue="John" />
                <TextBox label={t('last_name')} defaultValue="Doe" />
              </div>
              <EmailBox label={t('primary_email')} defaultValue="john.doe@enterprise.com" />
              <SelectionBox 
                label={t('primary_language')} 
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
            <Section title={t('interface_themes')} icon={Palette} description={t('dark_mode_desc')}>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md">
                      <Globe size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-[10px] text-slate-900 dark:text-white uppercase tracking-tight">{t('dark_mode_strategy')}</h4>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter truncate">{t('dark_mode_desc')}</p>
                    </div>
                  </div>
                  <SwitchToggle 
                    checked={theme === 'dark'} 
                    onChange={toggleTheme} 
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 opacity-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md">
                      <Lock size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-[10px] text-slate-900 dark:text-white uppercase tracking-tight">{t('compact_interface')}</h4>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter truncate">{t('compact_interface_desc')}</p>
                    </div>
                  </div>
                  <SwitchToggle checked={false} disabled />
                </div>
              </div>
            </Section>

            {/* Security Section */}
            <Section title={t('security_credentials')} icon={Shield} description={t('security_desc')}>
              <div className="space-y-3">
                <div className="relative">
                  <TextBox 
                    label={t('current_password')} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-[22px] text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextBox label={t('new_password')} type="password" placeholder="Min. 8 characters" />
                  <TextBox label={t('confirm_password')} type="password" placeholder="Repeat new password" />
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[9px] font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest">{t('two_factor')}</h4>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1" icon={Mail}>{t('via_email')}</Button>
                    <Button variant="secondary" size="sm" className="flex-1" icon={Smartphone}>{t('via_sms')}</Button>
                  </div>
                </div>
              </div>
            </Section>

            {/* Danger Zone */}
            <div className="p-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="text-center md:text-left min-w-0">
                  <h3 className="text-[11px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-widest">{t('account_termination')}</h3>
                  <p className="text-[9px] text-rose-600/70 dark:text-rose-500/70 font-bold uppercase tracking-tight truncate">{t('termination_desc')}</p>
                </div>
                <Button variant="danger" size="sm" className="whitespace-nowrap shadow-lg shadow-rose-500/10">{t('deactivate_account')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default Settings;
