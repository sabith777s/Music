import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, X, Menu, Globe } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { playlists, setCurrentPlaylist } = usePlaylist();

  // Group playlists by type (Tamil vs others)
  const tamilPlaylists = playlists.filter(p => p.name.includes('Tamil'));
  const otherPlaylists = playlists.filter(p => !p.name.includes('Tamil'));

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-30 text-white p-2"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - hidden on mobile unless menu is open */}
      <div className={`
        fixed md:relative z-20 h-full w-64 bg-gray-900 p-6 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Musicify</h1>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mb-8">
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Home size={20} className="mr-4" />
                Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Search size={20} className="mr-4" />
                Search
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Library size={20} className="mr-4" />
                Your Library
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Globe size={20} className="mr-4" />
                Language Hub
              </a>
            </li>
          </ul>
        </nav>

        <div className="mb-8">
          <div className="flex items-center text-gray-400 hover:text-white transition-colors mb-4 cursor-pointer">
            <PlusSquare size={20} className="mr-4" />
            Create Playlist
          </div>
          <div className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
            <Heart size={20} className="mr-4" />
            Liked Songs
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 flex-1 overflow-y-auto">
          {/* Tamil Playlists Section */}
          <h2 className="text-sm uppercase text-gray-500 mb-4 font-semibold tracking-wider flex items-center">
            <span className="w-4 h-4 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mr-2"></span>
            Tamil Playlists
          </h2>
          <ul className="space-y-3 mb-6">
            {tamilPlaylists.map(playlist => (
              <li key={playlist.id}>
                <button 
                  onClick={() => {
                    setCurrentPlaylist(playlist);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-left w-full truncate"
                >
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Other Playlists Section */}
          <h2 className="text-sm uppercase text-gray-500 mb-4 font-semibold tracking-wider">Other Playlists</h2>
          <ul className="space-y-3">
            {otherPlaylists.map(playlist => (
              <li key={playlist.id}>
                <button 
                  onClick={() => {
                    setCurrentPlaylist(playlist);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-left w-full truncate"
                >
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;