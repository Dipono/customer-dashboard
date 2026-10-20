import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Receipt, CreditCard, Tag } from 'lucide-react';

const formatCurrency = (amount) =>
  `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const StatCard = ({ label, value, change, changeLabel, icon: Icon }) => (
  <div className="stat-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      {Icon && (
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: '#eef2ff', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#6366f1', flexShrink: 0
        }}>
          <Icon size={20} />
        </div>
      )}
    </div>
    {change !== undefined && (
      <span className={`stat-change ${change > 0 ? 'negative' : change < 0 ? 'positive' : 'neutral'}`}>
        {change > 0 ? <ArrowUpRight size={14} /> : change < 0 ? <ArrowDownRight size={14} /> : null}
        {Math.abs(change)}% {changeLabel}
      </span>
    )}
  </div>
);

const SpendingSummary = ({ summary }) => {
  if (!summary) return null;

  const { totalSpent, transactionCount, averageTransaction, topCategory, comparedToPrevious } = summary;

  return (
    <div className="dashboard-grid grid-4">
      <StatCard
        label="Total Spent"
        value={formatCurrency(totalSpent)}
        change={comparedToPrevious?.spentChange}
        changeLabel="vs prev period"
        icon={CreditCard}
      />
      <StatCard
        label="Transactions"
        value={transactionCount}
        change={comparedToPrevious?.transactionChange}
        changeLabel="vs prev period"
        icon={Receipt}
      />
      <StatCard
        label="Avg. Transaction"
        value={formatCurrency(averageTransaction)}
        icon={TrendingUp}
      />
      <StatCard
        label="Top Category"
        value={topCategory}
        icon={Tag}
      />
    </div>
  );
};

export default SpendingSummary;