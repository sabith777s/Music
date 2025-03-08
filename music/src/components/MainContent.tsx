import React, { useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import { usePlayer } from '../contexts/PlayerContext';
import { Play, Clock, Sparkles, FileText, Filter } from 'lucide-react';
import AIRecommendations from './AIRecommendations';
import LyricsAnalyzer from './LyricsAnalyzer';

interface MainContentProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({ setIsMobileMenuOpen }) => {
  const { currentPlaylist, getSongsForPlaylist } = usePlaylist();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query
  
  if (!currentPlaylist) return <div>Loading...</div>;
  
  const playlistSongs = getSongsForPlaylist(currentPlaylist.id);
  
  // Filter songs by language and search query
  const filteredSongs = playlistSongs.filter(song => {
    const matchesLanguage = languageFilter ? song.language === languageFilter : true;
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-900 to-black p-8">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        {/* AI Features Toggle */}
        <button 
          onClick={() => setShowAIFeatures(!showAIFeatures)}
          className="flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors"
        >
          <Sparkles size={16} className="mr-2" />
          {showAIFeatures ? 'Hide AI Features' : 'Show AI Features'}
        </button>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search songs..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="px-4 py-2 rounded-full bg-gray-800 text-white"
        />

        {/* Language Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-sm flex items-center">
            <Filter size={14} className="mr-1" />
            Filter:
          </span>
          <button 
            onClick={() => setLanguageFilter(null)}
            className={`px-3 py-1 text-sm rounded-full ${!languageFilter ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setLanguageFilter('Tamil')}
            className={`px-3 py-1 text-sm rounded-full ${languageFilter === 'Tamil' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Tamil
          </button>
        </div>
      </div>

      {/* AI Features Section */}
      {showAIFeatures && (
        <div className="mb-8">
          <AIRecommendations />
          <LyricsAnalyzer />
        </div>
      )}

      {/* Playlist header */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <img 
          src={currentPlaylist.coverUrl} 
          alt={currentPlaylist.name} 
          className="w-48 h-48 shadow-lg mb-4 md:mb-0 md:mr-6"
        />
        <div>
          <p className="uppercase text-xs font-semibold text-gray-300 mb-1">Playlist</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Tamil Songs</h1>
          <p className="text-gray-300 text-sm">
            {filteredSongs.length} songs
            {languageFilter && ` • Filtered by: ${languageFilter}`}
            {searchQuery && ` • Searching for: ${searchQuery}`}
          </p>
        </div>
      </div>

      {/* Play button */}
      <div className="mb-8">
        <button 
          className="bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full px-8 py-3 flex items-center transition-colors"
          onClick={() => filteredSongs.length > 0 && playSong(filteredSongs[0])}
        >
          <Play size={20} fill="black" className="mr-2" />
          Play
        </button>
      </div>

      {/* Songs table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-500 border-b border-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 hidden md:table-cell">Album</th>
              <th className="px-4 py-2 hidden md:table-cell">Language</th>
              <th className="px-4 py-2 text-right">
                <Clock size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song, index) => (
              <tr 
                key={song.id} 
                className={`hover:bg-white/10 ${currentSong?.id === song.id ? 'text-green-500' : ''}`}
                onClick={() => playSong(song)}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img 
                      src={song.coverUrl} 
                      alt={song.title} 
                      className="w-10 h-10 mr-3"
                    />
                    <div>
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-gray-400">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{song.album}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {song.language && (
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      {song.language}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MainContent;
