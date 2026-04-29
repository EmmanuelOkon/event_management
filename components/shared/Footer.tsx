import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white mt-20">
      <div className="wrapper py-12 flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-4">
          <Link href="/">
            <span className="text-3xl font-bold tracking-tighter uppercase">
              Evoria.
            </span>
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Premium Event Curation <br /> System &copy; {currentYear} <br /> All
            Rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900 border-b border-black pb-2">
              Platform
            </p>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Discover
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Organize
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Members
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900 border-b border-black pb-2">
              Company
            </p>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Contact
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Privacy
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900 border-b border-black pb-2">
              Social
            </p>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/eo-udo/"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Linkedin
            </Link>
            <Link
              target="_blank"
              href="https://x.com/EO_Udo"
              className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
