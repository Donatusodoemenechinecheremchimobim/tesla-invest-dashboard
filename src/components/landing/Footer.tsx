export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h3 className="text-2xl font-bold mb-6">QUANTUM<span className="text-cyan-400">FARG</span></h3>
          <p className="text-gray-500 max-w-sm">
            The automated investment infrastructure for the 22nd century. 
            Regulated by the Galactic Financial Standard.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white">Platform</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-cyan-400">Markets</a></li>
            <li><a href="#" className="hover:text-cyan-400">Intelligence</a></li>
            <li><a href="#" className="hover:text-cyan-400">API Access</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white">Legal</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-cyan-400">Privacy Protocol</a></li>
            <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan-400">Risk Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 font-mono">
        © 2026 QUANTUMFARG INC. SYSTEM ONLINE.
      </div>
    </footer>
  );
}
