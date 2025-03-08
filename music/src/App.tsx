import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import MainContent from './components/MainContent';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <PlaylistProvider>
      <PlayerProvider>
        <div className="flex flex-col h-screen bg-black text-white">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <MainContent setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          <MusicPlayer />
        </div>
      </PlayerProvider>
    </PlaylistProvider>
  );
}

export default App;