var octave = 4;
var currentKeyIndex;
var oscis = [];

var keydown = function(e) {
    if (e.repeat) { return; }
    console.warn("keydown e.which", e.which);

    if (e.which >= 48 && e.which <= 57) {
        octave = e.which - 48;
        console.log("octave", octave);
    }

    if (KEY_TO_INDEX[e.which] !== undefined) {
        oscis[e.which] = oscis[e.which] || new Osci();
        currentKeyIndex = KEY_TO_INDEX[e.which];
        oscis[e.which].playFrequency(notes[octave * 12 + currentKeyIndex]);
    }
};

var keyup = function(e) {
    console.warn("keyup e.which", e.which);

    if (!!oscis[e.which]) {
        oscis[e.which].stop();
    }
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
