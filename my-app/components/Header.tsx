import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-100 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo graphic - abstract blue and yellow shapes */}
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full bg-blue-500 opacity-60"></div>
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-yellow-400 opacity-80"></div>
              <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-blue-600 opacity-40"></div>
            </div>
            {/* ADNH Text */}
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-blue-900 uppercase tracking-tight">
                ADNH
              </span>
              <span className="text-xs font-serif text-blue-900 uppercase tracking-wide">
                CATERING
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold uppercase text-blue-900 hover:text-blue-700 transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/about-us"
            className="text-sm font-semibold uppercase text-gray-800 hover:text-blue-900 transition-colors"
          >
            ABOUT US
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold uppercase text-gray-800 hover:text-blue-900 transition-colors"
          >
            SERVICES
          </Link>
          <Link
            href="/sectors"
            className="text-sm font-semibold uppercase text-gray-800 hover:text-blue-900 transition-colors"
          >
            SECTORS
          </Link>
          <Link
            href="/contact-us"
            className="text-sm font-semibold uppercase text-gray-800 hover:text-blue-900 transition-colors"
          >
            CONTACT US
          </Link>
        </nav>

        {/* Investor Relations Button */}
        <button className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          Investor Relations
        </button>
      </div>
    </header>
  );
}

