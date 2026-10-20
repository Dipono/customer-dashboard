import React from 'react';
import { Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const formatCurrency = (amount) =>
  `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const statusConfig = {
  on_track: { label: 'On Track', color: 'var(--text-secondary)', bg: 'var(--neutral-bg)', icon: CheckCircle },
  warning: { label: 'Warning', color: 'var(--text-primary)', bg: 'var(--neutral-bg)', icon: AlertTriangle },
  over_budget: { label: 'Over Budget', color: 'var(--text-primary)', bg: 'var(--neutral-bg)', icon: AlertTriangle }
};

const SpendingGoals = ({ data }) => {
  if (!data || !data.goals) return null;

  const { goals } = data;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Spending Goals</h3>
          <p className="card-subtitle">Monthly budget tracking</p>
        </div>
        <Target size={20} color="var(--primary)" />
      </div>
      <div>
        {goals.map((goal) => {
          const config = statusConfig[goal.status] || statusConfig.on_track;
          const StatusIcon = config.icon;
          const progressColor = 'var(--primary)';

          return (
            <div className="goal-item" key={goal.id}>
              <div className="goal-header">
                <span className="goal-category">{goal.category}</span>
                <span
                  className="goal-status"
                  style={{ color: config.color, background: config.bg }}
                >
                  <StatusIcon size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {config.label}
                </span>
              </div>
              <div className="goal-amounts">
                <span>{formatCurrency(goal.currentSpent)} spent</span>
                <span>of {formatCurrency(goal.monthlyBudget)}</span>
              </div>
              <div className="goal-progress">
                <div
                  className="goal-progress-fill"
                  style={{
                    width: `${Math.min(goal.percentageUsed, 100)}%`,
                    background: progressColor
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: progressColor, fontWeight: 600 }}>
                  {goal.percentageUsed.toFixed(1)}% used
                </span>
                <span className="goal-days">
                  <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {goal.daysRemaining} days remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingGoals;