'use client';

import TransactionHistory from '@/components/blockchain/TransactionHistory';

export default function TransactionHistoryPage() {
  // Create a dummy account value to bypass the connection check
  const dummyAccount = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  
  return (
    <div className="container mx-auto py-8">
      <TransactionHistory account={dummyAccount} />
    </div>
  );
}
