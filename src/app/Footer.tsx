const footerItems = [
  "Branding",
  "Design",
  "Marketing",
  "Advertisement",
  "About us",
  "Contact",
  "Jobs",
  "Press kit",
  "Terms of use",
  "Privacy policy",
  "Cookie policy",
];

export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <div>
          <span className="footer-title">Services</span>
          {footerItems.slice(0, 4).map((footerItem) => (
            <a key={footerItem} className="link-hover link">
              {footerItem}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Company</span>
          {footerItems.slice(4, 8).map((footerItem) => (
            <a key={footerItem} className="link-hover link">
              {footerItem}
            </a>
          ))}
        </div>
        <div>
          <span className="footer-title">Legal</span>
          {footerItems.slice(8).map((footerItem) => (
            <a key={footerItem} className="link-hover link">
              {footerItem}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
