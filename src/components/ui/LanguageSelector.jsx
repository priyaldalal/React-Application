import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { clsx } from 'clsx';
import Tooltip from './Tooltip';

const languages = [
  { code: 'en', name: 'English',  native: 'English' },
  { code: 'fr', name: 'French',   native: 'Français' },
  { code: 'es', name: 'Spanish',  native: 'Español' },
  { code: 'ru', name: 'Russian',  native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'zh', name: 'Chinese',  native: '中文' },
  { code: 'am', name: 'Amharic',  native: 'አማርኛ' },
  { code: 'he', name: 'Hebrew',   native: 'עברית' },
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const current = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <Tooltip content={t('language')} position="bottom" disabled={isOpen}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all flex items-center gap-1"
        >
          <Globe size={13} className={clsx('transition-transform duration-300', isOpen && 'rotate-180')} />
          <span className="text-[8px] font-bold uppercase w-3 text-center">{current.code}</span>
        </button>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 p-0.5 z-[80]"
          >
            <div className="px-2 py-1 border-b border-slate-50 dark:border-slate-800 mb-0.5">
              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">{t('language')}</p>
            </div>
            <div className="max-h-[260px] overflow-y-auto space-y-0.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className={clsx(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors',
                    i18n.language === lang.code
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="text-left">
                    <span className="text-[9px] font-bold block leading-none">{lang.name}</span>
                    <span className={clsx('text-[7px]', i18n.language === lang.code ? 'text-indigo-200' : 'text-slate-400')}>{lang.native}</span>
                  </div>
                  {i18n.language === lang.code && <Check size={10} strokeWidth={3} />}
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
