export const metadata = {
  title: 'ERP | Astravision Dashboard',
  description: 'Manage your enterprise resources and business processes',
};

export default function ERPLayout({ children }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 