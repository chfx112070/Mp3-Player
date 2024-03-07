const playlist = [
    { title: "禁じられた恋", artist: "DEPAPEPE", src: "media/DEPAPEPE - 禁じられた恋.mp3" },
    { title: "Do For Love", artist: "2Pac", src: "media/2Pac - Do For Love.mp3" },
    { title: "Viva la Vida", artist: "Coldplay", src: "media/Coldplay - Viva la Vida.mp3" },
    { title: "Sunsetz", artist: "Cigarettes After Sex", src: "media/Cigarettes After Sex - Sunsetz.mp3" },
];

const musicPlayer = document.getElementById('music-player');
let currentSongIndex = 0;

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
            // Enlarge the button
            control.style.transform = 'scale(5)';

            // Revert to original size after a delay
            setTimeout(function() {
                control.style.transform = 'scale(1)';
            }, 200); // Adjust the delay as needed (200 milliseconds in this case)
        });
    });
});
