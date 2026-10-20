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
        background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '12px 16px', borderRadius: '8px',
        boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '6px' }}>{formatMonth(label)}</p>
        <p style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>
          {formatCurrency(data.totalSpent)}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
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
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalSpent"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#colorSpent)"
              dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--bg-card)' }}
            />
          </AreaChart>
        ) : (
          <BarChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="totalSpent" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrends;