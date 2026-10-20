import React from 'react';
import { Calendar } from 'lucide-react';

const FilterBar = ({ filters, activePeriod, onPeriodChange }) => {
  if (!filters) return null;

  const { dateRangePresets } = filters;

  return (
    <div className="filter-bar">
      <Calendar size={18} color="var(--text-secondary)" />
      <span className="filter-label">Period:</span>
      <div className="filter-group">
        {dateRangePresets.map((preset) => (
          <button
            key={preset.value}
            className={`filter-btn ${activePeriod === preset.value ? 'active' : ''}`}
            onClick={() => onPeriodChange(preset.value)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;