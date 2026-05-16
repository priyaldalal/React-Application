import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400, sales: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398, sales: 2210 },
  { name: 'Mar', revenue: 2000, users: 9800, sales: 2290 },
  { name: 'Apr', revenue: 2780, users: 3908, sales: 2000 },
  { name: 'May', revenue: 1890, users: 4800, sales: 2181 },
  { name: 'Jun', revenue: 2390, users: 3800, sales: 2500 },
  { name: 'Jul', revenue: 3490, users: 4300, sales: 2100 },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Email', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6'];

const StatCard = ({ title, value, trend, trendType, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="premium-card p-3.5 flex flex-col gap-2"
  >
    <div className="flex justify-between items-start">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        <Icon size={16} />
      </div>
      <div className={clsx(
        "flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] font-black",
        trendType === 'up' ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      )}>
        {trendType === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{value}</h3>
    </div>
  </motion.div>
);

const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="h-full flex flex-col overflow-hidden gap-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Intelligence Engine
          </h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Real-time Data Processing & Analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm"><Calendar size={12} className="mr-2" /> Range</Button>
          <Button variant="secondary" size="sm"><Filter size={12} className="mr-2" /> Filter</Button>
          <Button size="sm"><Download size={12} className="mr-2" /> Export Insights</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-6 pb-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Global Reach" value="2.4M" trend="+14.2%" trendType="up" icon={Users} delay={0.1} />
          <StatCard title="Net Revenue" value="$482.5K" trend="+8.1%" trendType="up" icon={DollarSign} delay={0.2} />
          <StatCard title="Conversion" value="3.82%" trend="-1.4%" trendType="down" icon={TrendingUp} delay={0.3} />
          <StatCard title="Orders" value="12.8K" trend="+22.5%" trendType="up" icon={ShoppingCart} delay={0.4} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue & Growth */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 premium-card p-4 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Revenue Velocity</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Monthly revenue stream vs projected growth.</p>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1e293b' : '#fff', 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      color: isDark ? '#f8fafc' : '#1e293b'
                    }}
                    itemStyle={{ color: isDark ? '#f8fafc' : '#1e293b' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="premium-card p-4 flex flex-col gap-4"
          >
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Traffic Origins</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white">{((item.value / 1200) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Engagement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="premium-card p-4 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Customer Engagement</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase">Daily active users vs session duration.</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#94a3b8' : '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1e293b' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#f8fafc' : '#1e293b'
                  }}
                  itemStyle={{ color: isDark ? '#f8fafc' : '#1e293b' }}
                />
                <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="sales" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
