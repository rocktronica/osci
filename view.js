var KEY_TO_INDEX = {
    '90': 0,
    '83': 1,
    '88': 2,
    '68': 3,
    '67': 4,
    '86': 5,
    '71': 6,
    '66': 7,
    '72': 8,
    '78': 9,
    '74': 10,
    '77': 11,
    '188': 12,
    '76': 13,
    '190': 14,
    '186': 15,

    '81': 0 + 12,
    '50': 1 + 12,
    '87': 2 + 12,
    '51': 3 + 12,
    '69': 4 + 12,
    '82': 5 + 12,
    '53': 6 + 12,
    '84': 7 + 12,
    '54': 8 + 12,
    '89': 9 + 12,
    '55': 10 + 12,
    '85': 11 + 12,
    '73': 12 + 12,
    '57': 13 + 12,
    '79': 14 + 12,
    '48': 15 + 12,
    '80': 16 + 12,
    '219': 17 + 12,
    '187': 18 + 12,
    '221': 19 + 12
};

var octave = 4;
var currentKeyIndex;
var oscis = [];

var frequencies = new Frequencies();

var keydown = function(e) {
    if (e.repeat) { return; }

    if (KEY_TO_INDEX[e.which] !== undefined) {
        oscis[e.which] = oscis[e.which] || new Osci();
        currentKeyIndex = KEY_TO_INDEX[e.which];

        var frequency = frequencies.at(octave * 12 + currentKeyIndex);
        oscis[e.which].playFrequency(frequency);
    } else if (e.which === 38) {
        octave++;
    } else if (e.which === 40) {
        octave--;
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
