import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { ShoppingCart, Film, Car, Utensils, ShoppingBag, Zap } from 'lucide-react';

const iconMap = {
  'shopping-cart': ShoppingCart,
  'film': Film,
  'car': Car,
  'utensils': Utensils,
  'shopping-bag': ShoppingBag,
  'zap': Zap
};

const formatCurrency = (amount) =>
  `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: '8px',
        boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>{data.name}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{formatCurrency(data.amount)}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{data.percentage}% of total</p>
      </div>
    );
  }
  return null;
};

const CategoryBreakdown = ({
  data,
  dateDraft,
  hasCustomDateRange,
  onDateDraftChange,
  onApplyDateRange,
  onClearDateRange
}) => {
  if (!data) return null;

  const { categories, totalAmount, dateRange } = data;
  const canApplyDateRange =
    dateDraft.startDate &&
    dateDraft.endDate &&
    dateDraft.startDate <= dateDraft.endDate;

  const handleDateChange = (field, value) => {
    onDateDraftChange({ ...dateDraft, [field]: value });
  };

  const handleDateSubmit = (event) => {
    event.preventDefault();
    if (canApplyDateRange) onApplyDateRange(dateDraft);
  };

  return (
    <div className="dashboard-grid grid-2-1">
      {/* Pie Chart */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Spending by Category</h3>
            <p className="card-subtitle">
              {dateRange?.startDate} to {dateRange?.endDate}
            </p>
          </div>
        </div>
        <form className="category-date-form" onSubmit={handleDateSubmit}>
          <label>
            <span>Start date</span>
            <input
              type="date"
              value={dateDraft.startDate}
              max={dateDraft.endDate || undefined}
              onChange={(event) => handleDateChange('startDate', event.target.value)}
            />
          </label>
          <label>
            <span>End date</span>
            <input
              type="date"
              value={dateDraft.endDate}
              min={dateDraft.startDate || undefined}
              onChange={(event) => handleDateChange('endDate', event.target.value)}
            />
          </label>
          <button type="submit" disabled={!canApplyDateRange}>
            Apply dates
          </button>
          {hasCustomDateRange && (
            <button type="button" className="category-date-clear" onClick={onClearDateRange}>
              Clear
            </button>
          )}
        </form>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                strokeWidth={0}
              >
                {categories.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: '-10px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total</p>
            <p style={{ fontSize: '24px', fontWeight: 700 }}>{formatCurrency(totalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Category Details</h3>
        </div>
        <div className="category-list">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || ShoppingCart;
            return (
              <div className="category-item" key={cat.name}>
                <div
                  className="category-icon-wrapper"
                  style={{ background: `${cat.color}20`, color: cat.color }}
                >
                  <IconComponent size={20} />
                </div>
                <div className="category-details">
                  <div className="category-name-row">
                    <span className="category-name">{cat.name}</span>
                    <span className="category-amount">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="category-meta">{cat.transactionCount} transactions</span>
                    <span className="category-meta">{cat.percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${cat.percentage}%`, background: cat.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;