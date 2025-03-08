import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

export interface SongRecommendation {
  title: string;
  artist: string;
  album: string;
  reason: string;
}

export interface PlaylistSuggestion {
  name: string;
  description: string;
  mood: string;
}

export const geminiService = {
  /**
   * Get song recommendations based on user preferences
   */
  async getRecommendations(preferences: string): Promise<SongRecommendation[]> {
    try {
      // Check if API key is valid
      if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Please set your Gemini API key in the .env file");
        return getMockRecommendations(preferences);
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Based on these music preferences: "${preferences}", 
        recommend 5 songs. Focus on Tamil songs if the preferences mention Tamil music.
        Return the response as a JSON array with objects containing:
        title (string), artist (string), album (string), and reason (string explaining why it's recommended).
        Only return the JSON array, no other text.
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse JSON from response:", e);
          return getMockRecommendations(preferences);
        }
      }
      
      throw new Error("Failed to parse recommendations");
    } catch (error) {
      console.error("Error getting recommendations:", error);
      return getMockRecommendations(preferences);
    }
  },

  /**
   * Generate a playlist based on a theme or mood
   */
  async generatePlaylist(theme: string): Promise<PlaylistSuggestion> {
    try {
      // Check if API key is valid
      if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Please set your Gemini API key in the .env file");
        return getMockPlaylistSuggestion(theme);
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Create a music playlist based on this theme or mood: "${theme}".
        If the theme mentions Tamil music, focus on Tamil songs and artists.
        Return the response as a JSON object with:
        name (string - creative name for the playlist),
        description (string - brief description),
        mood (string - the overall mood of the playlist).
        Only return the JSON object, no other text.
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{.*\}/s);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse JSON from response:", e);
          return getMockPlaylistSuggestion(theme);
        }
      }
      
      throw new Error("Failed to parse playlist suggestion");
    } catch (error) {
      console.error("Error generating playlist:", error);
      return getMockPlaylistSuggestion(theme);
    }
  },

  /**
   * Analyze lyrics and provide insights
   */
  async analyzeLyrics(lyrics: string): Promise<string> {
    try {
      // Check if API key is valid
      if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Please set your Gemini API key in the .env file");
        return "This song explores themes of personal growth and resilience. The lyrics suggest a journey through difficult times with an ultimately hopeful outlook.";
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze these song lyrics and provide a brief insight about their meaning and themes:
        "${lyrics}"
        Keep the analysis under 100 words.
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error analyzing lyrics:", error);
      return "Unable to analyze lyrics at this time.";
    }
  }
};

// Mock data for when API key isn't set or API call fails
function getMockRecommendations(preferences: string): SongRecommendation[] {
  // If preferences mention Tamil music, return Tamil song recommendations
  if (preferences.toLowerCase().includes('tamil')) {
    return [
      {
        title: "Kadhal Sadugudu",
        artist: "A.R. Rahman",
        album: "Alaipayuthey",
        reason: "A classic Tamil love song with A.R. Rahman's signature melodic style that perfectly captures romantic emotions."
      },
      {
        title: "Munbe Vaa",
        artist: "Shreya Ghoshal",
        album: "Sillunu Oru Kaadhal",
        reason: "A soulful Tamil melody that beautifully expresses deep longing and love."
      },
      {
        title: "Enna Solla Pogirai",
        artist: "Hariharan",
        album: "Kandukondain Kandukondain",
        reason: "A timeless Tamil romantic song with classical influences and heartfelt lyrics."
      },
      {
        title: "Nenjukkul Peidhidum",
        artist: "Harris Jayaraj",
        album: "Vaaranam Aayiram",
        reason: "A modern Tamil hit with a catchy melody and romantic theme that resonates with listeners."
      },
      {
        title: "Vaseegara",
        artist: "Bombay Jayashri",
        album: "Minnale",
        reason: "A popular Tamil love song known for its soothing melody and poetic lyrics."
      }
    ];
  } else {
    return [
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        reason: "Popular synth-wave track with catchy beats and nostalgic 80s vibes."
      },
      {
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        reason: "Melodic indie pop with emotional lyrics and a memorable chorus."
      },
      {
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        reason: "Upbeat disco-pop track with infectious rhythm and dance elements."
      },
      {
        title: "Good Days",
        artist: "SZA",
        album: "Single",
        reason: "Soulful R&B with dreamy production and introspective lyrics."
      },
      {
        title: "Leave The Door Open",
        artist: "Silk Sonic",
        album: "An Evening With Silk Sonic",
        reason: "Smooth R&B with classic soul influences and stellar vocal performances."
      }
    ];
  }
}

function getMockPlaylistSuggestion(theme: string): PlaylistSuggestion {
  // If theme mentions Tamil music, return a Tamil-themed playlist
  if (theme.toLowerCase().includes('tamil')) {
    return {
      name: "Tamil Melodies Collection",
      description: "A curated selection of beautiful Tamil songs spanning classical ragas to modern film hits.",
      mood: "Nostalgic, emotional, and culturally rich"
    };
  } else {
    return {
      name: "Midnight Melodies",
      description: "A collection of smooth tracks perfect for late-night relaxation or focus sessions.",
      mood: "Calm, introspective, and slightly melancholic"
    };
  }
}