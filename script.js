// JavaScript code for music player interaction

// Sample playlist data
const playlist = [
    { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
    // Add more songs as needed
];

const musicPlayer = document.getElementById('music-player');

// Function to create the music player interface
function createMusicPlayer() {
    const player = document.createElement('audio');
    player.controls = true;
    player.src = playlist[0].src; // Set default song
    musicPlayer.appendChild(player);

    // Display current track information
    const trackInfo = document.createElement('div');
    trackInfo.innerHTML = `Now Playing: ${playlist[0].title} - ${playlist[0].artist}`;
    musicPlayer.appendChild(trackInfo);

    // Event listener for track change
    player.addEventListener('ended', () => {
        const nextTrackIndex = (playlist.findIndex(song => song.src === player.src) + 1) % playlist.length;
        player.src = playlist[nextTrackIndex].src;
        trackInfo.innerHTML = `Now Playing: ${playlist[nextTrackIndex].title} - ${playlist[nextTrackIndex].artist}`;
        player.play();
    });
}

// Create the music player when the page loads
document.addEventListener('DOMContentLoaded', createMusicPlayer);
