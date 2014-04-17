var octave = 4;
var currentKeyIndex;
var oscis = [];

var keydown = function(e) {
    if (e.repeat) { return; }

    if (KEY_TO_INDEX[e.which] !== undefined) {
        oscis[e.which] = oscis[e.which] || new Osci();
        currentKeyIndex = KEY_TO_INDEX[e.which];
        oscis[e.which].playFrequency(notes[octave * 12 + currentKeyIndex]);
    } else if (e.which >= 48 && e.which <= 57) {
        octave = e.which - 48;
    }

};

var keyup = function(e) {
    if (!!oscis[e.which]) {
        oscis[e.which].stop();
        delete oscis[e.which];
    }
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
