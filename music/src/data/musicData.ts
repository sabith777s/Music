// Sample audio URLs with MP3 format for better browser compatibility
// Using reliable free audio sources that work across browsers
const audioUrls = {
  // General songs - using reliable free music from mixkit
  general: [
    'https://storage.googleapis.com/media-session/sintel/snow-fight.mp3',
    'https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-audio.mp3',
    'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
    'https://storage.googleapis.com/media-session/caminandes/original-score.mp3',
    'https://storage.googleapis.com/media-session/big-buck-bunny/prelude.mp3'
  ],
  // Tamil/Indian style music - using reliable free music
  tamil: [
    'https://mobcup.vip/snehithane-snehithane-bgm-alaipayuthey-ringtone-download-WA826Pmd',
    'https://storage.googleapis.com/media-session/caminandes/original-score.mp3',
    'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
    'https://storage.googleapis.com/media-session/sintel/snow-fight.mp3',
    'https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-audio.mp3'
  ]
};

// Function to get a consistent audio URL based on song ID and language
const getAudioUrl = (id: number, language?: string) => {
  if (language === 'Tamil') {
    const index = (id % audioUrls.tamil.length);
    return audioUrls.tamil[index];
  } else {
    const index = (id % audioUrls.general.length);
    return audioUrls.general[index];
  }
};

export const playlists = [
  {
    id: 1,
    name: 'Melody Songs',
    coverUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    songIds: [1, 2, 3, 4,5,6,7,8,9,10]
  },
  {
    id: 2,
    name: 'Chill Vibes',
    coverUrl: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    songIds: [11,12,13,14,15,16,17,18,19,20]
  },
  {
    id: 3,
    name: 'Workout Mix',
    coverUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    songIds: [21,22,23,24,25,26,27,28,29,30]
  },
  {
    id: 5,
    name: 'Tamil Hits',
    coverUrl: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    songIds: [31,32,33,34,35,36,37,38,39,40]
  },
];

export const songs = [
  // melody songs
  {
    id: 1,
    title: 'Vennilavu Saaral',
    artist: 'G. V. Prakash Kumar',
    album: 'Amaran',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/35/230x230/thumb_67206178e1534.webp',
    audioUrl: 'src/resource/Vennilavu Saaral - Masstamilan.mp3',
    duration: '3:43'
  },
  {
    id: 2,
    title: 'Oh Shanthi Shanthi',
    artist: ' Harris Jayaraj',
    album: 'Varanam ayaram',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/49/230x230/thumb_672eed4a1b43d.webp',
    audioUrl: 'src/resource/Oh Shanthi Shanthi - Masstamilan.mp3',
    duration: '3:05'
  },
  {
    id: 3,
    title: 'Kaathalae Kaathalae',
    artist: 'Govind Vasantha',
    album: '96',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/96/230x230/thumb_675945b5332eb.webp',
    audioUrl: 'src/resource/Kaathalae Kaathalae - Masstamilan.mp3',
    duration: '3:13'
  },
  {
    id: 4,
    title: 'Yennai Izhukkuthadi',
    artist: 'A. R. Rahman',
    album: 'Kadhalikka Neramillai',
    coverUrl: 'https://masstamilan.sbs/upload_file/folderthumb/156x230/thumb_673ed6a1c6590.webp',
    audioUrl: 'src/resource/Yennai Izhukkuthadi - Masstamilan.mp3',
    duration: '3:48'
  },
  {
    id: 5,
    title: 'En Kadhal Solla',
    artist: 'Yuvan Shankar Raja',
    album: 'paiyaa',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/99/230x230/thumb_675bce11a247d.webp',
    audioUrl: 'src/resource/En Kadhal Solla - Masstamilan.mp3',
    duration: '4:56'
  },
  {
    id: 6,
    title: 'Thangamey',
    artist: 'Anirudh Ravichander',
    album: 'Naanum Rowdy Dhaan',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/84/230x230/thumb_6752a59d3272b.webp',
    audioUrl: 'src/resource/Thangamey - Masstamilan.mp3',
    duration: '4:22'
  },
  {
    id: 7,
    title: 'Nenjukkul Peidhidum',
    artist: 'Harris Jayaraj',
    album: 'Varanam ayaram',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/49/230x230/thumb_672ef288a32ad.webp',
    audioUrl: 'src/resource/Nenjukkul Peidhidum - Masstamilan.mp3',
    duration: '4:28'
  },
  {
    id: 8,
    title: 'Nee Partha Vizhigal',
    artist: ' Anirudh Ravichander',
    album: '3',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/75/230x230/thumb_674ad1394e844.webp',
    audioUrl: 'src/resource/Nee Partha Vizhigal - Masstamilan.mp3',
    duration: '4:24'
  },
  {
    id: 9,
    title: 'Pookal Pookum Tharunam',
    artist: 'G. V. Prakash Kumar',
    album: 'Madrasapattinam',
    coverUrl: 'https://masstamilan.sbs/upload_file/folderthumb/156x230/thumb_675e6c80399eb.webp',
    audioUrl: 'src/resource/Pookal Pookum Tharunam - Masstamilan.mp3',
    duration: '6:36'
  },
  {
    id:  10,
    title: 'Kadhal Sadugudu',
    artist: 'A. R. Rahman',
    album: 'Alaipayuthey',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/102/230x230/thumb_675ffbc971859.webp',
    audioUrl: 'src/resource/Kadhal Sadugudu - Masstamilan.mp3',
    duration: '4:35'
  },
  // chill vibez
  {
    id:  11,
    title: 'Whistle Podu',
    artist: 'Yuvan Shankar Raja',
    album: 'goat',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/32/230x230/thumb_673ebeb2eb57a.webp',
    audioUrl: 'src/resource/Whistle Podu - Masstamilan.mp3',
    duration: '4:47'
  },
  {
    id:  12,
    title: 'Soora Thenga Adra Adra',
    artist: ' Vidyasagar',
    album: 'Ghilli',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/57/230x230/thumb_6736e76aac63e.webp',
    audioUrl: 'src/resource/Soora Thenga Adra Adra - Masstamilan.mp3',
    duration: '4:02'
  },
  {
    id:  13,
    title: 'Arjunaru Villu',
    artist: ' Vidyasagar',
    album: 'Ghilli',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/57/230x230/thumb_6736e76aac63e.webp',
    audioUrl: 'src/resource/Arjunaru Villu - Masstamilan.mp3',
    duration: '4:27'
  },
  {
    id:  14,
    title: 'Why This Kolaveri Di',
    artist: 'Anirudh Ravichander',
    album: '3',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/75/230x230/thumb_674ad38a0f22a.webp',
    audioUrl: 'src/resource/Why This Kolaveri Di - Masstamilan.mp3',
    duration: '4:19'
  },
  {
    id:  15,
    title: 'Thaai Kelavi',
    artist: 'Anirudh Ravichander',
    album: 'Thiruchitrambalam',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/78/230x230/thumb_674d4c62a24b9.webp',
    audioUrl: 'src/resource/Thaai Kelavi - Masstamilan.mp3',
    duration: '4:18'
  },
  // workout mix
  {
    id: 21,
    title: 'once upon a time',
    artist: 'anirudh',
    album: 'vikram',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/77/230x230/thumb_674c06575f237.webp',
    audioUrl: 'src/resource/Once Upon A Time - Masstamilan.mp3',
    duration: '2:23'
  },
  {
    id: 22,
    title: 'thani oruvan',
    artist: 'hip hop tamizha',
    album: 'Thani oruva',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/82/230x230/thumb_675288c0c047b.webp',
    audioUrl: 'src/resource/Thani Oruvan - Masstamilan.mp3',
    duration: '3:49'
  },
  {
    id: 23,
    title: 'Ethir Neechal',
    artist: 'Anirudh',
    album: 'Ethir Neechal',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/101/230x230/thumb_675e8dd827f72.webp',
    audioUrl: 'src/resource/Ethir Neechal - Masstamilan.mp3',
    duration: '4:30'
  },
  // chill vibez
  {
    id: 11,
    title: '',
    artist: 'Study Beats',
    album: 'Concentration',
    coverUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    audioUrl: getAudioUrl(11),
    duration: '5:30'
  },
  {
    id: 12,
    title: 'Coding Session',
    artist: 'Dev Tunes',
    album: 'Algorithm Beats',
    coverUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    audioUrl: getAudioUrl(12),
    duration: '4:25'
  },
  // Tamil hits
  {
    id: 31,
    title: 'Beast',
    artist: 'Anirudh',
    album: 'Beast mode',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/24/230x230/thumb_67187edfd619f.webp',
    audioUrl: 'src/resource/Beast Mode - Masstamilan.mp3',
    duration: '4:55',
    language: 'Tamil'
  },
  {
    id: 32,
    title: 'yethi yethi',
    artist: 'Harris Jayaraj',
    album: 'Vaaranam Aayiram ',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/49/230x230/thumb_672ef021c4237.webp',
    audioUrl: 'src/resource/Yethi Yethi Yeththi - Masstamilan.mp3',
    duration: '4:55',
    language: 'Tamil'
  },
  {
    id: 33,
    title: 'Vazhithunaiye',
    artist: 'Anirudh',
    album: 'Dragon',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/105/230x230/thumb_6785fde486002.webp',
    audioUrl: 'src/resource/Vazhithunaiye - Masstamilan.mp3',
    duration: '3:38',
    language: 'Tamil'
  },
  {
    id: 34,
    title: 'Antha aruvi pol',
    artist: 'Santhosh Narayanan',
    album: 'Chitta',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/97/230x230/thumb_675a82be6521b.webp',
    audioUrl: 'src/resource/Antha Aruvi Pol - Masstamilan.mp3',
    duration: '3:37',
    language: 'Tamil'
  },
  {
    id: 35,
    title: 'Sai palavi intro',
    artist: 'G V Prakash',
    album: ' Amaran',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/35/230x230/thumb_672060cf006c4.webp',
    audioUrl: 'src/resource/Sai Pallavi Intro - Masstamilan.mp3',
    duration: '1:00',
    language: 'Tamil'
  },
  {
    id: 36,
    title: 'Chillanjirukkiye',
    artist: 'Sean Roldan',
    album: 'lubber pandhu',
    coverUrl: 'https://masstamilan.sbs/upload_file/19/41/230x230/thumb_67284b5702992.webp',
    audioUrl: 'src/resource/Chillanjirukkiye - Masstamilan.mp3',
    duration: '4.07',
    language: 'Tamil'
  }

];
