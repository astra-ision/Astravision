import Container from '@/components/ui/Container';

export default function GlobalPresence() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Global Innovation Centers</h2>
          <p className="text-gray-300 dark:text-gray-900 max-w-2xl mx-auto">
            Strategically located in two of the world's fastest-growing tech hubs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h3 className="text-2xl font-bold mb-4">Dubai</h3>
            <p className="mb-4">UAE's Leading Tech Innovation Hub</p>
            <ul className="text-left space-y-2">
              <li>• AI & Blockchain Research Center</li>
              <li>• Enterprise Solutions Hub</li>
              <li>• MENA Region Headquarters</li>
            </ul>
          </div>

          <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <h3 className="text-2xl font-bold mb-4">Bangalore</h3>
            <p className="mb-4">Silicon Valley of India</p>
            <ul className="text-left space-y-2">
              <li>• R&D Excellence Center</li>
              <li>• Tech Talent Hub</li>
              <li>• Asia-Pacific Operations</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
} 