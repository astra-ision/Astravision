export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        {title}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
} 