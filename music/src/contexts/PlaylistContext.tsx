import React, { createContext, useState, useContext } from 'react';
import { playlists, songs } from '../data/musicData';

interface Playlist {
  id: number;
  name: string;
  coverUrl: string;
  songIds: number[];
}

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

interface PlaylistContextType {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  setCurrentPlaylist: (playlist: Playlist) => void;
  getSongsForPlaylist: (playlistId: number) => Song[];
  allSongs: Song[];
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(playlists[0]);
  
  const getSongsForPlaylist = (playlistId: number): Song[] => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.songIds.map(id => songs.find(song => song.id === id)!).filter(Boolean);
  };

  return (
    <PlaylistContext.Provider 
      value={{ 
        playlists, 
        currentPlaylist, 
        setCurrentPlaylist, 
        getSongsForPlaylist,
        allSongs: songs
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};