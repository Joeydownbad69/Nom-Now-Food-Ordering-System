import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-nomnow-primary mb-4">NomNow</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
            Delicious food prepared fast—ready for you to pick up and enjoy!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-nomnow-primary transition-colors">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-nomnow-primary transition-colors">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-nomnow-primary transition-colors">
                <Twitter />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-nomnow-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-nomnow-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} NomNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}