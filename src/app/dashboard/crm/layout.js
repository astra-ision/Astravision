export const metadata = {
  title: 'CRM | Astravision Dashboard',
  description: 'Manage your customer relationships and interactions',
};

export default function CRMLayout({ children }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 