var osci = new Osci();

var octave = 4;

var currentKeyIndex;

var keydown = function(e) {
    if (e.which >= 48 && e.which <= 57) {
        octave = e.which - 48;
        console.log("octave", octave);
    }

    if (KEY_TO_INDEX[e.which] !== undefined) {
        currentKeyIndex = KEY_TO_INDEX[e.which];
    }

    osci.playFrequency(notes[octave * 12 + currentKeyIndex]);
};

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", osci.stop.bind(osci));
