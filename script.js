function addEventListeners() {
    // Add an event listener to the element with the class 'speaker'
    document.querySelector('.speaker').addEventListener('click', function() {
        // Get the audio element by its ID
        var audio = document.getElementById('neptunSound');
        // Check if the audio is currently paused
        if (audio.paused) {
            // If paused, play the audio
            audio.play();
        } else {
            // If playing, pause the audio
            audio.pause();
        }
    });

    // Add an event listener to the element with the class 'anden'
    document.querySelector('.anden').addEventListener('click', function() {
        // Get the audio element by its ID 'sound'
        var audio = document.getElementById('sound');
        // Toggle between play and pause based on the current state of the audio
        if (audio.paused) {
            // If the audio is paused, play it
            audio.play();
        } else {
            // If the audio is playing, pause it
            audio.pause();
        }
    });
}

// Call the function after the DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
});
