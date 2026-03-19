import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-12 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Info Area */}
        <div className="space-y-4">
          <div className="flex items-center group mb-6">
            <div className="w-10 h-10 bg-sage-evergreen rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-emerald-900 group-hover:scale-110 transition">
              <span className="text-white font-black text-xl italic">J</span>
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">Jaggy</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Curating the finest Ayurvedic treasures for your holistic well-being. Sourced directly from nature, delivered with ancient wisdom.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-sage-hint uppercase tracking-widest border-none">Shop</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-sage-hint transition cursor-pointer">Organic Honey</li>
            <li className="hover:text-sage-hint transition cursor-pointer">A2 Gir Ghee</li>
            <li className="hover:text-sage-hint transition cursor-pointer">Ayurvedic Herbs</li>
            <li className="hover:text-sage-hint transition cursor-pointer">Traditional Wellness</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-sage-hint uppercase tracking-widest border-none">Company</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-sage-hint transition cursor-pointer">Our Wisdom</li>
            <li className="hover:text-sage-hint transition cursor-pointer">Quality Promise</li>
            <li className="hover:text-sage-hint transition cursor-pointer">Dosha Guide</li>
            <li className="hover:text-sage-hint transition cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-sage-hint uppercase tracking-widest border-none">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Email: support@jaggy.test</li>
            <li>Hours: Mon - Sat, 9am - 7pm</li>
            <li>Location: Pure Ayurveda Hub, India</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Jaggy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
