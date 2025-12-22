/**
 * Footer Component - Redesigned to match mockup
 * Dark theme with 4 columns and newsletter signup
 */

import { Link } from 'react-router-dom';
import { Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  /**
   * Handle newsletter subscription
   */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About ShopHub */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                About ShopHub
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Your one-stop destination for quality products at amazing
                prices. We deliver excellence with every order.
              </p>
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-indigo-500"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-indigo-500"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-indigo-500"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/electronics"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/clothing"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sm transition hover:text-indigo-500"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Newsletter
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Subscribe to get special offers and updates
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Payment Methods and Legal */}
      <div className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} ShopHub. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">We accept:</span>
              <div className="flex gap-2">
                <div className="rounded bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-300">
                  VISA
                </div>
                <div className="rounded bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-300">
                  MC
                </div>
                <div className="rounded bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-300">
                  AMEX
                </div>
                <div className="rounded bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-300">
                  PayPal
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-gray-500 transition hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-500 transition hover:text-indigo-500"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
