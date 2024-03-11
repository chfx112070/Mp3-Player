const playlist = [
    { title: "禁じられた恋", artist: "DEPAPEPE", src: "media/DEPAPEPE - 禁じられた恋.mp3" },
    { title: "Do For Love", artist: "2Pac", src: "media/2Pac - Do For Love.mp3" },
    { title: "Viva la Vida", artist: "Coldplay", src: "media/Coldplay - Viva la Vida.mp3" },
    { title: "Sunsetz", artist: "Cigarettes After Sex", src: "media/Cigarettes After Sex - Sunsetz.mp3" },
];

const musicPlayer = document.getElementById('music-player');
let currentSongIndex = 0;

const images = [
    'media/saltwater7996_Embark_on_a_journey_through_the_intersection_of_a_997f01c7-55b8-4336-808a-dbe6bfee94ad.png',
    'media/saltwater7996_Poster_Vibrant_Energy_Pulsation_Enigmatic_Darknes_cd94074c-19be-433e-a799-7c021ac15168.png',
    'media/saltwater7996_Poster_Vibrant_Energy_Pulsation_Enigmatic_Darknes_d6b3e44e-cd3f-42c0-9030-eff5f1f188c8.png',
    'media/saltwater7996_Step_into_a_world_where_art_and_technology_conver_40b40d14-421d-441e-8547-d44ee49ed40e.png',
];


const featuredContent = document.getElementById('featured-content');
let currentImageIndex = 0;
let slideshowInterval;

function switchToPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateFeaturedContent();
}

function switchToNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateFeaturedContent();
}

function startSlideshow() {
    if (!slideshowInterval) {
        slideshowInterval = setInterval(() => {
            switchToNextImage();
        }, 5000); 
        document.getElementById('play-pause-btn').textContent = '⏸️'; 
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null; 
    document.getElementById('play-pause-btn').textContent = '▶️'; 
}

function updateFeaturedContent() {
    featuredContent.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

function createMusicPlayer() {
    const player = document.createElement('audio');
    player.controls = true;
    musicPlayer.appendChild(player);

    const playlistContainer = document.createElement('div');
    playlistContainer.classList.add('playlist');
    musicPlayer.appendChild(playlistContainer);

    playlist.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.textContent = `${index + 1}. ${song.title} - ${song.artist}`;
        songElement.addEventListener('click', () => {
            currentSongIndex = index;
            playSong(song.src);
            updateNowPlayingDisplay();
        });
        playlistContainer.appendChild(songElement);
    });

    player.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        playSong(playlist[currentSongIndex].src);
        updateNowPlayingDisplay();
    });

    updateNowPlayingDisplay();

    playSong(playlist[3].src);
    currentSongIndex = 3; 
    updateNowPlayingDisplay(); 
}

function playSong(src) {
    const player = document.querySelector('audio');
    player.src = src;
    player.play();
}

function updateNowPlayingDisplay() {
    const songs = document.querySelectorAll('.song');
    songs.forEach((song, index) => {
        if (index === currentSongIndex) {
            song.classList.add('playing');
        } else {
            song.classList.remove('playing');
        }
    });
}

document.addEventListener('DOMContentLoaded', createMusicPlayer);

document.addEventListener('DOMContentLoaded', function() {
    const playerControls = document.querySelectorAll('.control-btn');

    playerControls.forEach(control => {
        control.addEventListener('click', function() {

            control.style.transform = 'scale(5)';

            setTimeout(function() {
                control.style.transform = 'scale(1)';
            }, 200); 
        });
    });
});

document.getElementById('prev-btn').addEventListener('click', switchToPrevImage);
document.getElementById('next-btn').addEventListener('click', switchToNextImage);
document.getElementById('play-pause-btn').addEventListener('click', function() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});

