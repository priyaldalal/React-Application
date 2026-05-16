import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { clsx } from 'clsx';
import Tooltip from './Tooltip';
import { UI_CONFIG } from '../../config/uiConfig';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'he', name: 'Hebrew', native: 'עברית' }
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip content={t('language')} position="bottom">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all flex items-center gap-1"
        >
          <Globe size={12} className={clsx("transition-transform duration-500", isOpen && "rotate-180")} />
          <span className="text-[9px] font-black uppercase tracking-tighter w-3.5 text-center">{currentLanguage.code}</span>
        </button>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-800 p-1 z-[80]"
          >
            <div className="px-2 py-1 border-b border-slate-50 dark:border-slate-800 mb-1">
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t('language')}</p>
            </div>
            <div className="space-y-0.5 overflow-y-auto max-h-[300px] custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    "w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-all group",
                    i18n.language === lang.code
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] font-black leading-none uppercase tracking-tight">{lang.name}</span>
                    <span className={clsx(
                      "text-[7px] font-bold opacity-60",
                      i18n.language === lang.code ? "text-white" : "text-slate-400"
                    )}>{lang.native}</span>
                  </div>
                  {i18n.language === lang.code && (
                    <Check size={10} strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
