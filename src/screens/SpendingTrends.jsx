import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const formatCurrency = (amount) =>
  `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-ZA', { month: 'short', year: '2-digit' });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'white', padding: '12px 16px', borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '6px' }}>{formatMonth(label)}</p>
        <p style={{ color: '#6366f1', fontSize: '14px', fontWeight: 600 }}>
          {formatCurrency(data.totalSpent)}
        </p>
        <p style={{ color: '#64748b', fontSize: '12px' }}>
          {data.transactionCount} transactions
        </p>
      </div>
    );
  }
  return null;
};

const SpendingTrends = ({ data }) => {
  const [chartType, setChartType] = useState('area');

  if (!data || !data.trends) return null;

  const trends = data.trends.map(t => ({
    ...t,
    monthLabel: formatMonth(t.month)
  }));

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Monthly Spending Trends</h3>
          <p className="card-subtitle">Last {trends.length} months</p>
        </div>
        <div className="filter-group">
          <button
            className={`filter-btn ${chartType === 'area' ? 'active' : ''}`}
            onClick={() => setChartType('area')}
          >
            Area
          </button>
          <button
            className={`filter-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        {chartType === 'area' ? (
          <AreaChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalSpent"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#colorSpent)"
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        ) : (
          <BarChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="totalSpent" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrends;