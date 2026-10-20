
import {
  mockCustomerProfile,
  mockSpendingSummary,
  mockCategories,
  mockTrends,
  mockTransactions,
  mockGoals,
  mockFilters
} from '../mockData/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getCustomerProfile: async (customerId) => {
    await delay(300);
    return { ...mockCustomerProfile, customerId };
  },

  getSpendingSummary: async (customerId, period = '30d') => {
    await delay(400);
    const multipliers = { '7d': 0.25, '30d': 1, '90d': 3, '1y': 12 };
    const multiplier = multipliers[period] || 1;
    return {
      ...mockSpendingSummary,
      period,
      totalSpent: mockSpendingSummary.totalSpent * multiplier,
      transactionCount: Math.round(mockSpendingSummary.transactionCount * multiplier),
      averageTransaction: mockSpendingSummary.averageTransaction
    };
  },

  getCategories: async (customerId, period = '30d', customDateRange = null) => {
    await delay(350);
    const multipliers = { '7d': 0.25, '30d': 1, '90d': 3, '1y': 12 };
    const periodDays = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 };
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const endDate = customDateRange
      ? new Date(`${customDateRange.endDate}T00:00:00Z`)
      : new Date('2024-09-16T00:00:00Z');
    const startDate = customDateRange
      ? new Date(`${customDateRange.startDate}T00:00:00Z`)
      : new Date(endDate);
    let multiplier = multipliers[period] || 1;

    if (customDateRange) {
      if (
        !Number.isFinite(startDate.getTime()) ||
        !Number.isFinite(endDate.getTime()) ||
        startDate > endDate
      ) {
        throw new Error('A valid start and end date are required.');
      }
      const inclusiveDays = Math.floor((endDate - startDate) / millisecondsPerDay) + 1;
      multiplier = inclusiveDays / 30;
    } else {
      startDate.setUTCDate(startDate.getUTCDate() - (periodDays[period] || 30) + 1);
    }

    const categories = mockCategories.map((category) => ({
      ...category,
      amount: Math.round(category.amount * multiplier * 100) / 100,
      transactionCount: Math.round(category.transactionCount * multiplier)
    }));
    const totalAmount = Math.round(
      categories.reduce((total, category) => total + category.amount, 0) * 100
    ) / 100;

    return {
      dateRange: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10)
      },
      totalAmount,
      categories: categories.map((category) => ({
        ...category,
        percentage: Math.round((category.amount / totalAmount) * 1000) / 10
      }))
    };
  },

  getTrends: async (customerId, months = 12) => {
    await delay(400);
    return {
      trends: mockTrends.slice(-months)
    };
  },

  getTransactions: async (customerId, params = {}) => {
    await delay(350);
    const { limit = 20, offset = 0, category, sortBy = 'date_desc' } = params;
    
    let filtered = [...mockTransactions];
    
    if (category && category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }
    
    // Sort
    switch (sortBy) {
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount_desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount_asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const paginated = filtered.slice(offset, offset + limit);
    
    return {
      transactions: paginated,
      pagination: {
        total: filtered.length,
        limit,
        offset,
        hasMore: offset + limit < filtered.length
      }
    };
  },

  getGoals: async (customerId) => {
    await delay(300);
    return { goals: mockGoals };
  },

  getFilters: async (customerId) => {
    await delay(200);
    return mockFilters;
  }
};