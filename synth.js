var Synth = (function() {
    var klass = function() {
        this.octave = 4;
        this.waveType = Osci.defaultWaveType;

        this.setMode("POLYPHONIC");
        this.polyphonicGlissando = false;
        this.oscis = new OscisCollection();
    };

    klass.fn = klass.prototype;

    klass.fn.nextWaveType = function() {
        var allPossibleWaveTypes = Osci.fn.getAllPossibleWaveTypes(),
            next = allPossibleWaveTypes[allPossibleWaveTypes.indexOf(this.waveType) + 1],
            first = allPossibleWaveTypes[0];

        this.waveType = next || first;
        this.oscis.setWaveType(this.waveType);
        console.log(this.waveType);

        return this;
    }

    klass.fn.MODES = ["POLYPHONIC", "MONOPHONIC"];

    klass.fn.setMode = function(mode) {
        mode = mode.toUpperCase();

        if (klass.fn.MODES.indexOf(mode) === -1) {
            throw "Unknown mode: " + mode;
        }

        this.mode = mode;
        this.polyphonic = this.mode === "POLYPHONIC"; // temp

        return this;
    };

    klass.fn.getMode = function() {
        return this.mode;
    };

    klass.fn.nextMode = function() {
        var next = this.MODES[this.MODES.indexOf(this.getMode()) + 1],
            first = this.MODES[0];
        return this.setMode(next || first);
    };

    var duplicateOscisCollectionMethods = [
        "setWaveType",
        "changeOctave",
        "clear"
    ];

    duplicateOscisCollectionMethods.forEach(function(duplicateOscisCollectionMethod) {
        klass.fn[duplicateOscisCollectionMethod] = function() {
            this.oscis[duplicateOscisCollectionMethod].apply(this.oscis, arguments);
        }
        return this;
    }.bind(this));

    return klass;
}());

