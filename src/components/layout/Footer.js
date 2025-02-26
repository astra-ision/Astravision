export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Astravision
            </h3>
            <p className="text-gray-300">
              Leading AI, Blockchain, and SaaS solutions provider transforming businesses across Dubai and Bangalore.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AI & ML Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blockchain & Web3</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">SaaS Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile Apps</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
              Technologies
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blockchain</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cloud Computing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">IoT & Smart Tech</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Locations
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-white">Dubai</p>
                <p className="text-gray-300">Dubai Silicon Oasis</p>
              </div>
              <div>
                <p className="font-semibold text-white">Bangalore</p>
                <p className="text-gray-300">Electronic City</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Astravision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
