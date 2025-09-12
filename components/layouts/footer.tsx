import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#0f172a] py-12">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <span className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]">GameHive</span>
                        <p className="text-gray-400 mt-4">The ultimate platform for gamers to discover, play, and connect.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#020617] flex items-center justify-center text-gray-400 hover:text-[#ec4899] transition-colors"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#020617] flex items-center justify-center text-gray-400 hover:text-[#ec4899] transition-colors"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#020617] flex items-center justify-center text-gray-400 hover:text-[#ec4899] transition-colors"><i className="fab fa-discord"></i></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#020617] flex items-center justify-center text-gray-400 hover:text-[#ec4899] transition-colors"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-heading font-bold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Games</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Categories</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">New Releases</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Upcoming Games</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Top Sellers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-heading font-bold mb-4">Community</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Forums</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Groups</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Members</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Streams</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Events</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-heading font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Help Center</a></li>
                            <li>
                            <Link href={"/contact"} className="text-gray-400 hover:text-[#ec4899] transition-colors">
                                Contact Us
                            </Link>
                            </li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#ec4899] transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>© 2025 GameHive. All rights reserved. All trademarks are property of their respective owners.</p>
                </div>
            </div>
        </footer>
    );
}
