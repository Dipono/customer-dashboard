
export const mockCustomerProfile = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.50,
  currency: "ZAR"
};

export const mockSpendingSummary = {
  period: "30d",
  totalSpent: 4250.75,
  transactionCount: 47,
  averageTransaction: 90.44,
  topCategory: "Groceries",
  comparedToPrevious: {
    spentChange: 12.5,
    transactionChange: -3.2
  }
};

export const mockCategories = [
  { name: "Groceries", amount: 1250.30, percentage: 29.4, transactionCount: 15, color: "#FF6B6B", icon: "shopping-cart" },
  { name: "Entertainment", amount: 890.20, percentage: 20.9, transactionCount: 8, color: "#4ECDC4", icon: "film" },
  { name: "Transportation", amount: 680.45, percentage: 16.0, transactionCount: 12, color: "#45B7D1", icon: "car" },
  { name: "Dining", amount: 520.30, percentage: 12.2, transactionCount: 9, color: "#F7DC6F", icon: "utensils" },
  { name: "Shopping", amount: 450.80, percentage: 10.6, transactionCount: 6, color: "#BB8FCE", icon: "shopping-bag" },
  { name: "Utilities", amount: 458.70, percentage: 10.8, transactionCount: 3, color: "#85C1E9", icon: "zap" }
];

export const mockTrends = [
  { month: "2024-01", totalSpent: 3890.25, transactionCount: 42, averageTransaction: 92.62 },
  { month: "2024-02", totalSpent: 4150.80, transactionCount: 38, averageTransaction: 109.23 },
  { month: "2024-03", totalSpent: 3750.60, transactionCount: 45, averageTransaction: 83.35 },
  { month: "2024-04", totalSpent: 4200.45, transactionCount: 39, averageTransaction: 107.70 },
  { month: "2024-05", totalSpent: 3980.30, transactionCount: 44, averageTransaction: 90.46 },
  { month: "2024-06", totalSpent: 4250.75, transactionCount: 47, averageTransaction: 90.44 },
  { month: "2024-07", totalSpent: 4100.20, transactionCount: 41, averageTransaction: 100.00 },
  { month: "2024-08", totalSpent: 4350.90, transactionCount: 49, averageTransaction: 88.79 },
  { month: "2024-09", totalSpent: 4250.75, transactionCount: 47, averageTransaction: 90.44 }
];

export const mockTransactions = [
  { id: "txn_123456", date: "2024-09-16T14:30:00Z", merchant: "Pick n Pay", category: "Groceries", amount: 245.80, description: "Weekly groceries", paymentMethod: "Credit Card", icon: "shopping-cart", categoryColor: "#FF6B6B" },
  { id: "txn_123457", date: "2024-09-15T10:15:00Z", merchant: "Netflix", category: "Entertainment", amount: 199.00, description: "Monthly subscription", paymentMethod: "Debit Order", icon: "film", categoryColor: "#4ECDC4" },
  { id: "txn_123458", date: "2024-09-14T08:45:00Z", merchant: "Uber", category: "Transportation", amount: 85.50, description: "Ride to airport", paymentMethod: "Credit Card", icon: "car", categoryColor: "#45B7D1" },
  { id: "txn_123459", date: "2024-09-13T19:20:00Z", merchant: "Nando's", category: "Dining", amount: 320.00, description: "Dinner with family", paymentMethod: "Credit Card", icon: "utensils", categoryColor: "#F7DC6F" },
  { id: "txn_123460", date: "2024-09-12T11:00:00Z", merchant: "Takealot", category: "Shopping", amount: 450.80, description: "Electronics purchase", paymentMethod: "Credit Card", icon: "shopping-bag", categoryColor: "#BB8FCE" },
  { id: "txn_123461", date: "2024-09-11T09:30:00Z", merchant: "Eskom", category: "Utilities", amount: 458.70, description: "Monthly electricity", paymentMethod: "Debit Order", icon: "zap", categoryColor: "#85C1E9" },
  { id: "txn_123462", date: "2024-09-10T16:45:00Z", merchant: "Woolworths", category: "Groceries", amount: 380.25, description: "Groceries", paymentMethod: "Credit Card", icon: "shopping-cart", categoryColor: "#FF6B6B" },
  { id: "txn_123463", date: "2024-09-09T20:00:00Z", merchant: "Ster-Kinekor", category: "Entertainment", amount: 180.00, description: "Movie tickets", paymentMethod: "Credit Card", icon: "film", categoryColor: "#4ECDC4" },
  { id: "txn_123464", date: "2024-09-08T07:15:00Z", merchant: "Shell", category: "Transportation", amount: 650.00, description: "Fuel", paymentMethod: "Credit Card", icon: "car", categoryColor: "#45B7D1" },
  { id: "txn_123465", date: "2024-09-07T12:30:00Z", merchant: "KFC", category: "Dining", amount: 120.50, description: "Lunch", paymentMethod: "Credit Card", icon: "utensils", categoryColor: "#F7DC6F" }
];

export const mockGoals = [
  { id: "goal_001", category: "Entertainment", monthlyBudget: 1000.00, currentSpent: 650.30, percentageUsed: 65.03, daysRemaining: 12, status: "on_track" },
  { id: "goal_002", category: "Groceries", monthlyBudget: 1500.00, currentSpent: 1450.80, percentageUsed: 96.72, daysRemaining: 12, status: "warning" },
  { id: "goal_003", category: "Transportation", monthlyBudget: 800.00, currentSpent: 350.00, percentageUsed: 43.75, daysRemaining: 12, status: "on_track" },
  { id: "goal_004", category: "Dining", monthlyBudget: 600.00, currentSpent: 580.00, percentageUsed: 96.67, daysRemaining: 12, status: "warning" }
];

export const mockFilters = {
  categories: [
    { name: "Groceries", color: "#FF6B6B", icon: "shopping-cart" },
    { name: "Entertainment", color: "#4ECDC4", icon: "film" },
    { name: "Transportation", color: "#45B7D1", icon: "car" },
    { name: "Dining", color: "#F7DC6F", icon: "utensils" },
    { name: "Shopping", color: "#BB8FCE", icon: "shopping-bag" },
    { name: "Utilities", color: "#85C1E9", icon: "zap" }
  ],
  dateRangePresets: [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Last year", value: "1y" }
  ]
};