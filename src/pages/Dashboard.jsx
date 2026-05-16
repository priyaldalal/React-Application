import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { UI_CONFIG } from '../config/uiConfig';

const MetricCard = ({ title, value, trend, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="premium-card p-3 shadow-sm border-slate-100 dark:border-slate-800"
  >
    <div className="flex justify-between items-start mb-2">
      <div className={`p-1.5 rounded-md ${color} text-white shadow-lg shadow-indigo-500/10`}>
        <Icon size={12} />
      </div>
      <div className={`flex items-center gap-0.5 text-[8px] font-black ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'} uppercase`}>
        {trend > 0 ? <ArrowUpRight size={8} /> : <ArrowDownRight size={8} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-[16px] font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { theme } = useTheme();
  const { t } = useTranslation('common');
  const isDark = theme === 'dark';

  const data = [
    { name: 'Jan', value: 4000, revenue: 2400 },
    { name: 'Feb', value: 3000, revenue: 1398 },
    { name: 'Mar', value: 2000, revenue: 9800 },
    { name: 'Apr', value: 2780, revenue: 3908 },
    { name: 'May', value: 1890, revenue: 4800 },
    { name: 'Jun', value: 2390, revenue: 3800 },
    { name: 'Jul', value: 3490, revenue: 4300 },
  ];

  const pieData = [
    { name: t('desktop'), value: 400 },
    { name: t('mobile'), value: 300 },
    { name: t('tablet'), value: 300 },
  ];

  const COLORS = ['#6366f1', '#a855f7', '#ec4899'];

  return (
    <div className="h-full overflow-auto custom-scrollbar pr-2 space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <h1 className="text-[16px] font-black text-slate-900 dark:text-white tracking-tight uppercase">{t('performance_overview')}</h1>
          <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">{t('intelligence_engine')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => toast.info('Filtering by date range...')}
            className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-colors"
          >
            {t('last_30_days')}
          </button>
          <button 
            onClick={() => toast.success('Dashboard report generated!')}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors"
          >
            {t('export_pdf')}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard title={t('total_users')} value="1,248" trend={12.5} icon={Users} color="bg-indigo-600" />
        <MetricCard title={t('active_revenue')} value="$42,850" trend={-3.2} icon={DollarSign} color="bg-purple-600" />
        <MetricCard title={t('sales_growth')} value="24%" trend={5.4} icon={TrendingUp} color="bg-pink-600" />
        <MetricCard title={t('avg_sessions')} value="12.5m" trend={2.1} icon={Activity} color="bg-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 premium-card p-3 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.1em]">{t('revenue_vs_usage')}</h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                <span className="text-[8px] font-black text-slate-400 uppercase">{t('usage')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span className="text-[8px] font-black text-slate-400 uppercase">{t('revenue')}</span>
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#f1f5f9"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#475569' : '#94a3b8', fontSize: 8, fontWeight: 900 }}
                  dy={5}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#475569' : '#94a3b8', fontSize: 8, fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#fff', 
                    border: '1px solid ' + (isDark ? '#1e293b' : '#e2e8f0'), 
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '8px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Charts */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="premium-card p-3 shadow-sm"
          >
            <h3 className="text-[9px] font-black mb-3 uppercase tracking-widest text-slate-500">{t('device_distribution')}</h3>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {pieData.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[7px] font-black text-slate-400 uppercase truncate">{item.name}</p>
                  <p className="text-[9px] font-black" style={{ color: COLORS[i] }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="premium-card p-4 bg-indigo-600 text-white border-none shadow-lg shadow-indigo-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-white/10 rounded-md">
                <Target size={14} />
              </div>
              <h3 className="font-black uppercase tracking-[0.1em] text-[9px]">{t('monthly_goal')}</h3>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-lg font-black">$24,500</span>
                <span className="text-[9px] font-bold opacity-60">/ $30,000</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                ></motion.div>
              </div>
            </div>
            <p className="text-[9px] font-bold opacity-80 leading-tight">
              {t('goal_description', { percent: 82 })}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
