import React from "react";

function Footer() {
  return (
    <footer className="bg-[#dbe2ef] py-8 px-20 text-[#09274d]">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex justify-between w-full mb-8 gap-16">
          <div className="w-1/3">
            <h2 className="text-lg font-bold mb-4">Important Links</h2>
            <ul className="space-y-2">
              <li className="hover:text-[#3F72AF]">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-[#3F72AF]">
                <a href="#">Shop</a>
              </li>
              <li className="hover:text-[#3F72AF]">
                <a href="#">Contact</a>
              </li>
              <li className="hover:text-[#3F72AF]">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-[#3F72AF]">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="w-1/3">
            <h2 className="text-lg font-bold mb-4">Subscribe to our Newsletter</h2>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 mb-4 border border-[#3F72AF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3F72AF]"
              />
              <button
                type="submit"
                className="w-full bg-[#09274d] text-[#dae0ef] p-3 rounded-md hover:text-[#09274d] hover:bg-[#dae0ef] hover:border hover:border-[#09274d] duration-500"
              >
                Subscribe Now
              </button>
            </form>
          </div>
          <div className="w-1/3">
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-[#3F72AF]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.827.775 4.943 4.943 0 0 0 2.165-2.724 9.88 9.88 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.384 4.482C7.69 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475 4.922 4.922 0 0 0 2.188 4.097 4.904 4.904 0 0 1-2.23-.616v.061a4.926 4.926 0 0 0 3.95 4.829 4.996 4.996 0 0 1-1.292.172c-.314 0-.615-.03-.916-.088a4.927 4.927 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.397 0-.79-.022-1.174-.068a13.941 13.941 0 0 0 7.548 2.212c9.054 0 14.01-7.496 14.01-13.986 0-.21-.004-.42-.014-.63A9.936 9.936 0 0 0 24 4.557z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3F72AF]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.419 2.163 15.04 2.163 12s.012-3.584.07-4.849c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.265-.058 1.645-.069 4.849-.069M12 0C8.741 0 8.333.015 7.053.073 5.77.13 4.55.375 3.445 1.48 2.34 2.585 2.095 3.805 2.037 5.087 1.98 6.367 1.965 6.775 1.965 12s.015 5.633.073 6.913c.058 1.282.303 2.502 1.408 3.607 1.105 1.105 2.325 1.35 3.607 1.408 1.28.058 1.688.073 6.913.073s5.633-.015 6.913-.073c1.282-.058 2.502-.303 3.607-1.408 1.105-1.105 1.35-2.325 1.408-3.607.058-1.28.073-1.688.073-6.913s-.015-5.633-.073-6.913c-.058-1.282-.303-2.502-1.408-3.607-1.105-1.105-2.325-1.35-3.607-1.408C15.633.015 15.225 0 12 0z" />
                    <path d="M12 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.163a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 0 0 0 2.881z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3F72AF]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.372 0 0 5.373 0 12c0 5.084 3.163 9.367 7.584 10.899-.104-.922-.197-2.338.041-3.344.214-.896 1.387-5.719 1.387-5.719s-.354-.707-.354-1.754c0-1.64.952-2.864 2.135-2.864 1.007 0 1.494.755 1.494 1.66 0 1.012-.645 2.52-.979 3.92-.279 1.179.592 2.141 1.755 2.141 2.106 0 3.727-2.223 3.727-5.428 0-2.831-2.033-4.812-4.931-4.812-3.364 0-5.342 2.522-5.342 5.137 0 1.025.396 2.124.893 2.72.098.117.112.218.083.334-.09.367-.295 1.179-.334 1.34-.051.213-.169.26-.393.157-1.47-.612-2.393-2.527-2.393-4.073 0-3.31 2.402-6.351 6.934-6.351 3.641 0 6.474 2.599 6.474 6.08 0 3.613-2.274 6.518-5.432 6.518-1.06 0-2.056-.551-2.398-1.19l-.652 2.482c-.235.904-.873 2.032-1.306 2.723C9.195 23.795 10.557 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">&copy; 2024 VitalGear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
