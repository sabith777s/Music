import React, { useState } from 'react';
import { geminiService, SongRecommendation, PlaylistSuggestion } from '../services/geminiService';
import { Sparkles, Loader2, Music, ListMusic, AlertCircle } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';

const AIRecommendations: React.FC = () => {
  const [preferences, setPreferences] = useState('');
  const [theme, setTheme] = useState('');
  const [recommendations, setRecommendations] = useState<SongRecommendation[]>([]);
  const [playlistSuggestion, setPlaylistSuggestion] = useState<PlaylistSuggestion | null>(null);
  const [loading, setLoading] = useState({ recommendations: false, playlist: false });
  const [activeTab, setActiveTab] = useState<'recommendations' | 'playlist'>('recommendations');
  const [error, setError] = useState<string | null>(null);
  
  const { allSongs } = usePlaylist();

  const handleGetRecommendations = async () => {
    if (!preferences.trim()) return;
    
    setLoading({ ...loading, recommendations: true });
    setError(null);
    
    try {
      const results = await geminiService.getRecommendations(preferences);
      setRecommendations(results);
      
      if (results.length === 0) {
        setError("No recommendations found. Please try a different query.");
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError("Failed to get recommendations. Please check your API key and try again.");
    } finally {
      setLoading({ ...loading, recommendations: false });
    }
  };

  const handleGeneratePlaylist = async () => {
    if (!theme.trim()) return;
    
    setLoading({ ...loading, playlist: true });
    setError(null);
    
    try {
      const result = await geminiService.generatePlaylist(theme);
      setPlaylistSuggestion(result);
    } catch (error) {
      console.error('Error generating playlist:', error);
      setError("Failed to generate playlist. Please check your API key and try again.");
    } finally {
      setLoading({ ...loading, playlist: false });
    }
  };

  // Preset Tamil music options
  const tamilMusicPresets = [
    "Tamil romantic songs",
    "Tamil classical music",
    "Modern Tamil pop",
    "A.R. Rahman Tamil hits",
    "Tamil movie soundtracks"
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Sparkles size={24} className="text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">AI-Powered Music Discovery</h2>
      </div>

      {/* API Key Notice */}
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-md p-3 mb-6">
        <div className="flex items-start">
          <AlertCircle size={18} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-yellow-300 text-sm font-medium">Gemini API Key Required</p>
            <p className="text-yellow-200/70 text-xs mt-1">
              To use AI features, add your Gemini API key to the <code className="bg-black/30 px-1 py-0.5 rounded">.env</code> file. 
              Get a key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google AI Studio</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'recommendations'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          <div className="flex items-center">
            <Music size={16} className="mr-2" />
            Song Recommendations
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'playlist'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('playlist')}
        >
          <div className="flex items-center">
            <ListMusic size={16} className="mr-2" />
            Playlist Generator
          </div>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-md p-3 mb-6">
          <div className="flex items-center">
            <AlertCircle size={18} className="text-red-500 mr-2" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Song Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div>
          <div className="mb-6">
            <label htmlFor="preferences" className="block text-sm font-medium text-gray-300 mb-2">
              What kind of music are you in the mood for?
            </label>
            <div className="flex">
              <input
                type="text"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g., Upbeat Tamil songs for a party"
                className="flex-1 bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleGetRecommendations}
                disabled={loading.recommendations || !preferences.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading.recommendations ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : (
                  <Sparkles size={18} className="mr-2" />
                )}
                Get Recommendations
              </button>
            </div>
            
            {/* Tamil music quick suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {tamilMusicPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setPreferences(preset)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Recommended Songs</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  // Try to find a matching song in our library for the cover image
                  const matchingSong = allSongs.find(
                    (s) => s.title.toLowerCase().includes(rec.title.toLowerCase()) || 
                           s.artist.toLowerCase().includes(rec.artist.toLowerCase())
                  );
                  
                  return (
                    <div key={index} className="bg-gray-800 rounded-md p-4 flex">
                      <div className="w-16 h-16 flex-shrink-0 mr-4">
                        {matchingSong ? (
                          <img
                            src={matchingSong.coverUrl}
                            alt={rec.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                            <Music size={24} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{rec.title}</h4>
                        <p className="text-sm text-gray-400">{rec.artist} • {rec.album}</p>
                        <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Playlist Generator Tab */}
      {activeTab === 'playlist' && (
        <div>
          <div className="mb-6">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2">
              Enter a theme, mood, or activity for your playlist
            </label>
            <div className="flex">
              <input
                type="text"
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., Tamil wedding celebration"
                className="flex-1 bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleGeneratePlaylist}
                disabled={loading.playlist || !theme.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading.playlist ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : (
                  <ListMusic size={18} className="mr-2" />
                )}
                Generate Playlist
              </button>
            </div>
            
            {/* Tamil playlist quick suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setTheme("Tamil classical ragas")}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
              >
                Tamil classical ragas
              </button>
              <button
                onClick={() => setTheme("Tamil love songs for a romantic evening")}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
              >
                Tamil love songs
              </button>
              <button
                onClick={() => setTheme("Energetic Tamil dance tracks")}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
              >
                Tamil dance tracks
              </button>
            </div>
          </div>

          {playlistSuggestion && (
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">{playlistSuggestion.name}</h3>
              <p className="text-gray-300 mb-4">{playlistSuggestion.description}</p>
              <div className="inline-block bg-black bg-opacity-30 rounded-full px-3 py-1 text-sm text-purple-300">
                Mood: {playlistSuggestion.mood}
              </div>
              <button className="mt-4 bg-white text-purple-900 hover:bg-gray-200 font-medium rounded-full px-4 py-2 flex items-center">
                <ListMusic size={16} className="mr-2" />
                Create This Playlist
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;