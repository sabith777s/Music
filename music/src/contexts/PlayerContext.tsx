import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { songs } from '../data/musicData';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
  language?: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAttemptTimeoutRef = useRef<number | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
      
      // Set initial volume
      audioRef.current.volume = volume / 100;
      
      setIsAudioInitialized(true);
    }
    
    // Clean up on unmount
    return () => {
      if (playAttemptTimeoutRef.current) {
        window.clearTimeout(playAttemptTimeoutRef.current);
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle song changes
  useEffect(() => {
    if (!audioRef.current || !isAudioInitialized || !currentSong) return;
    
    // Clear any pending play attempts
    if (playAttemptTimeoutRef.current) {
      window.clearTimeout(playAttemptTimeoutRef.current);
      playAttemptTimeoutRef.current = null;
    }
    
    const loadAndPlaySong = () => {
      if (!audioRef.current || !currentSong) return;
      
      setAudioError(false);
      
      // Pause any current playback before changing source
      audioRef.current.pause();
      
      // Reset time and duration
      setCurrentTime(0);
      setDuration(0);
      
      // Use the song's audioUrl
      audioRef.current.src = currentSong.audioUrl;
      
      // Load the audio
      try {
        audioRef.current.load();
        
        if (isPlaying) {
          // Small delay to ensure audio is loaded
          setTimeout(() => {
            if (audioRef.current) {
              const playPromise = audioRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise.catch(err => {
                  console.error('Error playing audio:', err);
                  setIsPlaying(false);
                  setAudioError(true);
                  
                  // Try to play the next song if this one fails
                  if (err.name === "NotSupportedError" || err.name === "AbortError") {
                    console.log("Audio playback issue, trying next song...");
                    playAttemptTimeoutRef.current = window.setTimeout(() => nextSong(), 500);
                  }
                });
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        setAudioError(true);
        playAttemptTimeoutRef.current = window.setTimeout(() => nextSong(), 500);
      }
    };
    
    loadAndPlaySong();
    
    // Set up event listeners
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setAudioError(true);
      // Try to play the next song if this one fails
      playAttemptTimeoutRef.current = window.setTimeout(() => nextSong(), 500);
    };
    
    const handleCanPlay = () => {
      if (audioRef.current && isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Error in canplay handler:', err);
          });
        }
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('durationchange', handleDurationChange);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('canplay', handleCanPlay);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('durationchange', handleDurationChange);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [currentSong, isAudioInitialized]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !currentSong || !isAudioInitialized) return;
    
    if (isPlaying) {
      // Only attempt to play if the audio is ready
      if (audioRef.current.readyState >= 2) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Error playing audio:', err);
            setIsPlaying(false);
            
            // If we get a not supported error, try the next song
            if (err.name === "NotSupportedError" || err.name === "AbortError") {
              console.log("Audio playback issue, trying next song...");
              playAttemptTimeoutRef.current = window.setTimeout(() => nextSong(), 500);
            }
          });
        }
      } else {
        // If not ready, wait for the canplay event
        audioRef.current.addEventListener('canplay', function onCanPlay() {
          if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
            audioRef.current.removeEventListener('canplay', onCanPlay);
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong, isAudioInitialized]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const playSong = (song: Song) => {
    // If it's the same song that's already playing, just toggle play/pause
    if (currentSong && currentSong.id === song.id) {
      togglePlay();
      return;
    }
    
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const nextSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };
  
  const prevSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider 
      value={{ 
        currentSong, 
        isPlaying, 
        volume,
        currentTime,
        duration,
        playSong, 
        togglePlay, 
        nextSong, 
        prevSong,
        setVolume,
        seekTo
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};