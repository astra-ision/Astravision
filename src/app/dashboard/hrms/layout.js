export const metadata = {
  title: 'HRMS | Astravision Dashboard',
  description: 'Manage your human resources and employee information',
};

export default function HRMSLayout({ children }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 