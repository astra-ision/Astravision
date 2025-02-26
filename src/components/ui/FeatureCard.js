import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, items }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="feature-card"
    >
      <div className="service-icon">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-[#1a1a1a]">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {items && (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="feature-list-item">
              <span className="text-[#5648D1]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
} 