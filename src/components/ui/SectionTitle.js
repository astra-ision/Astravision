export default function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1a1a] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
} 