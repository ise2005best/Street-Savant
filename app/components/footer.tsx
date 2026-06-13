const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-8xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-primary font-black uppercase tracking-widest text-lg mb-3">
              Str33t Savant
            </p>
          </div>


          {/* Socials */}
          <div>
            <p className="font-primary font-black uppercase tracking-widest text-xs mb-4 text-gray-400">
              Follow
            </p>
            <ul className="space-y-2">
              {[
                { label: "Instagram", href: "https://www.instagram.com/str33tsavant" },
                { label: "TikTok", href: "https://www.tiktok.com/@str33tsavant?_r=1&_t=ZT-97BO7nUvMOk" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wide hover:text-gray-300 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-gray-500 text-xs uppercase tracking-widest">
          <p>&copy; {year} Str33t Savant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
