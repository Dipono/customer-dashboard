import React, { useState, useCallback } from 'react';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import CustomerProfile from './CustomerProfile';
import SpendingSummary from './SpendingSummary';
import CategoryBreakdown from './CategoryBreakdown';
import SpendingTrends from './SpendingTrends';
import TransactionList from './TransactionList';
import SpendingGoals from './SpendingGoals';
import FilterBar from './FilterBar';
import LoadingSpinner from './LoadingSpinner';

const CUSTOMER_ID = '12345';

const Dashboard = () => {
  const [period, setPeriod] = useState('30d');
  const [categoryDateDraft, setCategoryDateDraft] = useState({ startDate: '', endDate: '' });
  const [categoryDateRange, setCategoryDateRange] = useState(null);
  const [transactionParams, setTransactionParams] = useState({
    limit: 5,
    offset: 0,
    sortBy: 'date_desc'
  });

  const fetchProfile = useCallback(
    () => api.getCustomerProfile(CUSTOMER_ID),
    []
  );
  const fetchFilters = useCallback(() => api.getFilters(CUSTOMER_ID), []);
  const fetchSummary = useCallback(
    () => api.getSpendingSummary(CUSTOMER_ID, period),
    [period]
  );
  const fetchCategories = useCallback(
    () => api.getCategories(CUSTOMER_ID, period, categoryDateRange),
    [period, categoryDateRange]
  );
  const fetchTrends = useCallback(() => api.getTrends(CUSTOMER_ID, 12), []);
  const fetchTransactions = useCallback(
    () => api.getTransactions(CUSTOMER_ID, transactionParams),
    [transactionParams]
  );
  const fetchGoals = useCallback(() => api.getGoals(CUSTOMER_ID), []);

  const { data: profile, loading: profileLoading } = useFetch(
    fetchProfile
  );

  const { data: filters } = useFetch(fetchFilters);

  const { data: summary, loading: summaryLoading } = useFetch(
    fetchSummary
  );

  const { data: categories, loading: categoriesLoading } = useFetch(
    fetchCategories
  );

  const { data: trends, loading: trendsLoading } = useFetch(
    fetchTrends
  );

  const { data: transactions, loading: transactionsLoading } = useFetch(
    fetchTransactions
  );

  const { data: goals, loading: goalsLoading } = useFetch(fetchGoals);

  const handleParamsChange = useCallback((newParams) => {
    setTransactionParams(newParams);
  }, []);

  const handlePeriodChange = useCallback((newPeriod) => {
    setPeriod(newPeriod);
    setCategoryDateRange(null);
    setCategoryDateDraft({ startDate: '', endDate: '' });
  }, []);

  const handleCategoryDateDraftChange = useCallback((nextRange) => {
    setCategoryDateDraft(nextRange);
  }, []);

  const handleCategoryDateRangeApply = useCallback((nextRange) => {
    setCategoryDateRange(nextRange);
  }, []);

  const handleCategoryDateRangeClear = useCallback(() => {
    setCategoryDateRange(null);
    setCategoryDateDraft({ startDate: '', endDate: '' });
  }, []);

  if (profileLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Customer <span>Spending Insights</span>
          </h1>
          <p className="dashboard-subtitle">
            Financial analytics dashboard • Mock data
          </p>
        </div>
      </div>

      {/* Customer Profile */}
      <div style={{ marginBottom: '24px' }}>
        <CustomerProfile profile={profile} />
      </div>

      {/* Filter Bar */}
      <div style={{ marginBottom: '24px' }}>
        <FilterBar
          filters={filters}
          activePeriod={period}
          onPeriodChange={handlePeriodChange}
        />
      </div>

      {/* Spending Summary */}
      <div style={{ marginBottom: '24px' }}>
        {summaryLoading ? (
          <LoadingSpinner text="Loading summary..." />
        ) : (
          <SpendingSummary summary={summary} />
        )}
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: '24px' }}>
        {categoriesLoading ? (
          <LoadingSpinner text="Loading categories..." />
        ) : (
          <CategoryBreakdown
            data={categories}
            dateDraft={categoryDateDraft}
            hasCustomDateRange={Boolean(categoryDateRange)}
            onDateDraftChange={handleCategoryDateDraftChange}
            onApplyDateRange={handleCategoryDateRangeApply}
            onClearDateRange={handleCategoryDateRangeClear}
          />
        )}
      </div>

      {/* Spending Trends */}
      <div style={{ marginBottom: '24px' }}>
        {trendsLoading ? (
          <LoadingSpinner text="Loading trends..." />
        ) : (
          <SpendingTrends data={trends} />
        )}
      </div>

      {/* Two Column Layout: Transactions + Goals */}
      <div className="dashboard-grid grid-2-1">
        <div>
          {transactionsLoading ? (
            <LoadingSpinner text="Loading transactions..." />
          ) : (
            <TransactionList
              data={transactions}
              params={transactionParams}
              onParamsChange={handleParamsChange}
            />
          )}
        </div>
        <div>
          {goalsLoading ? (
            <LoadingSpinner text="Loading goals..." />
          ) : (
            <SpendingGoals data={goals} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0 20px',
        color: '#94a3b8',
        fontSize: '13px'
      }}>
      </div>
    </div>
  );
};

export default Dashboard;