import React, { useState } from 'react';
import {
  ShoppingCart, Film, Car, Utensils, ShoppingBag, Zap, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

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

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TransactionList = ({ data, onParamsChange, params }) => {
  const [sortBy, setSortBy] = useState(params.sortBy || 'date_desc');
  const [categoryFilter, setCategoryFilter] = useState(params.category || 'all');

  if (!data) return null;

  const { transactions, pagination } = data;
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    onParamsChange({ ...params, sortBy: val, offset: 0 });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategoryFilter(val);
    onParamsChange({ ...params, category: val === 'all' ? undefined : val, offset: 0 });
  };

  const handlePageChange = (newOffset) => {
    onParamsChange({ ...params, offset: newOffset });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Recent Transactions</h3>
          <p className="card-subtitle">
            {pagination.total} transactions found
          </p>
        </div>
        <div className="filter-group">
          <Filter size={16} color="#64748b" />
          <select className="filter-select" value={categoryFilter} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Dining">Dining</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
          </select>
          <select className="filter-select" value={sortBy} onChange={handleSortChange}>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <div className="transaction-list">
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No transactions found
          </div>
        ) : (
          transactions.map((txn) => {
            const IconComponent = iconMap[txn.icon] || ShoppingCart;
            return (
              <div className="transaction-item" key={txn.id}>
                <div
                  className="transaction-icon"
                  style={{ background: `${txn.categoryColor}20`, color: txn.categoryColor }}
                >
                  <IconComponent size={20} />
                </div>
                <div className="transaction-info">
                  <div className="transaction-merchant">{txn.merchant}</div>
                  <div className="transaction-meta">
                    <span>{formatDate(txn.date)}</span>
                    <span>•</span>
                    <span>{txn.paymentMethod}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="transaction-amount">{formatCurrency(txn.amount)}</span>
                  <span
                    className="transaction-category-tag"
                    style={{ background: txn.categoryColor }}
                  >
                    {txn.category}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(Math.max(0, pagination.offset - pagination.limit))}
          >
            <ChevronLeft size={14} style={{ verticalAlign: 'middle' }} /> Prev
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            disabled={!pagination.hasMore}
            onClick={() => handlePageChange(pagination.offset + pagination.limit)}
          >
            Next <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;