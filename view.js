var octave = 4;
var waveType = Osci.defaultWaveType;

var polyphonic = true,
    oscis = [];

var frequencies = new Frequencies();
var keys = new Keys();

var keydown = function(e) {
    if (e.repeat) { return; }

    keys.down(e.which);

    // tab to change wave type
    if (e.which === 9) {
        var allPossibleWaveTypes = Osci.fn.getAllPossibleWaveTypes();
        waveType = allPossibleWaveTypes[allPossibleWaveTypes.indexOf(waveType) + 1]
            || allPossibleWaveTypes[0];
        oscis.forEach(function(osci) {
            osci.setWaveType(waveType);
        });
        console.log("waveType", waveType);
        e.preventDefault();
    }

    var changeInOctave = 0;
    if (e.which === 38) {
        changeInOctave = 1;
    } else if (e.which === 40) {
        changeInOctave = -1;
    }
    octave += changeInOctave;

    var oscisIndex = polyphonic ? e.which : 0;

    if (keys.noteIndexAtKey(e.which) !== undefined) {
        oscis[oscisIndex] = oscis[oscisIndex] || new Osci({
            waveType: waveType
        });
        oscis[oscisIndex].playFrequency(
            frequencies.at(octave * 12 + keys.noteIndexAtKey(e.which))
        );
    }

    if (e.shiftKey) { changeInOctave = 1; }
    if (changeInOctave) {
        oscis.forEach(function(osci) { osci.changeOctave(changeInOctave); });
    }
};

var keyup = function(e) {
    keys.up(e.which);

    var oscisIndex = polyphonic ? e.which : 0;

    if (!!oscis[oscisIndex]) {
        var osci = oscis[oscisIndex];

        if (polyphonic) {
            osci.stop();
            delete oscis[oscisIndex];
        } else {
            var lastPressedKey = keys.last();

            if (lastPressedKey) {
                oscis[oscisIndex].playFrequency(
                    frequencies.at(octave * 12 + keys.noteIndexAtKey(lastPressedKey))
                );
            } else {
                osci.stop();
            }
        }
    }

    // e.shiftKey is apparently unreliable for keyUp
    if (e.which === 16) {
        oscis.forEach(function(osci) { osci.changeOctave(-1); });
    }
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
