export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-background p-6 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
