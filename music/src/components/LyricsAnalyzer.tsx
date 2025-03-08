import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { FileText, Loader2, AlertCircle } from 'lucide-react';

const LyricsAnalyzer: React.FC = () => {
  const [lyrics, setLyrics] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeLyrics = async () => {
    if (!lyrics.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.analyzeLyrics(lyrics);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing lyrics:', error);
      setError("Failed to analyze lyrics. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sample Tamil lyrics for quick testing
  const sampleTamilLyrics = `Munbae vaa en anbae vaa
Ennai thedumbothu en nizhalai pol
Unnai parthaen unnai therinthaen
Ennai maranthaen unnai ninainthean`;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FileText size={24} className="text-blue-400 mr-2" />
        <h2 className="text-xl font-bold">Lyrics Analyzer</h2>
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

      <div className="mb-6">
        <label htmlFor="lyrics" className="block text-sm font-medium text-gray-300 mb-2">
          Paste song lyrics to analyze
        </label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Paste song lyrics here..."
          rows={6}
          className="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Sample lyrics button */}
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => setLyrics(sampleTamilLyrics)}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Try with sample Tamil lyrics
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAnalyzeLyrics}
          disabled={loading || !lyrics.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin mr-2" />
          ) : (
            <FileText size={18} className="mr-2" />
          )}
          Analyze Lyrics
        </button>
      </div>

      {analysis && (
        <div className="bg-gray-800 rounded-md p-4">
          <h3 className="text-lg font-medium text-white mb-2">Analysis</h3>
          <p className="text-gray-300">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default LyricsAnalyzer;