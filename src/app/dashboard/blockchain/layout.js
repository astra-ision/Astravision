export const metadata = {
  title: 'Blockchain Services | Astravision Dashboard',
  description: 'Manage your blockchain wallet, verify documents, and view transaction history',
};

export default function BlockchainLayout({ children }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 