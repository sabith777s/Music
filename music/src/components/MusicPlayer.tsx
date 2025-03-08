import React, { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, AlertTriangle } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

const MusicPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume,
    currentTime,
    duration,
    togglePlay, 
    nextSong, 
    prevSong,
    setVolume,
    seekTo,
    playSong
  } = usePlayer();
  
  // Add a click-to-play message for mobile browsers
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (currentSong && !isPlaying) {
        playSong(currentSong);
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [currentSong, isPlaying, playSong]);
  
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(parseInt(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  // Calculate progress percentage for styling the progress bar
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 px-4 flex items-center">
      {/* Current song info */}
      <div className="w-1/4 flex items-center">
        {currentSong ? (
          <>
            <img 
              src={currentSong.coverUrl} 
              alt={currentSong.title} 
              className="h-14 w-14 mr-3"
            />
            <div className="truncate">
              <div className="text-sm font-medium truncate">{currentSong.title}</div>
              <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-sm">No song selected</div>
        )}
      </div>

      {/* Player controls */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center mb-2">
          <button 
            className="text-gray-400 hover:text-white mx-2"
            onClick={prevSong}
            disabled={!currentSong}
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            className="bg-white rounded-full p-2 mx-2 text-black hover:scale-105 transition-transform"
            onClick={togglePlay}
            disabled={!currentSong}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="black" />}
          </button>
          
          <button 
            className="text-gray-400 hover:text-white mx-2"
            onClick={nextSong}
            disabled={!currentSong}
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="w-full max-w-xl flex items-center">
          <span className="text-xs text-gray-400 w-10 text-right mr-2">
            {formatTime(currentTime)}
          </span>
          
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer z-10 relative opacity-0"
              style={{ position: 'absolute', top: 0, left: 0, height: '16px' }}
            />
            <div className="h-1 bg-gray-700 rounded-lg w-full">
              <div 
                className="h-full bg-green-500 rounded-lg" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <span className="text-xs text-gray-400 w-10 ml-2">
            {duration ? formatTime(duration) : currentSong?.duration || '0:00'}
          </span>
        </div>
      </div>

      {/* Volume control */}
      <div className="w-1/4 flex justify-end items-center">
        <div className="flex items-center">
          <button className="text-gray-400 mr-2">
            {getVolumeIcon()}
          </button>
          
          <div className="relative w-24">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer z-10 relative opacity-0"
              style={{ position: 'absolute', top: 0, left: 0, height: '16px' }}
            />
            <div className="h-1 bg-gray-700 rounded-lg w-full">
              <div 
                className="h-full bg-white rounded-lg" 
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;