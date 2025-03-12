export const metadata = {
  title: 'Settings | Astravision Dashboard',
  description: 'Manage your account settings and preferences',
};

export default function SettingsLayout({ children }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 