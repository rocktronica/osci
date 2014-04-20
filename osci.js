var Osci = (function(){
    var context = new webkitAudioContext();

    var klass = function(options) {
        options = options || {};

        this.isAudible = false;
        this.value; // oscillator.frequency.value may round

        this.oscillator = context.createOscillator();
        this.oscillator.start(0);

        this.gainNode = context.createGain();

        // Oscillator -> Gain
        this.oscillator.connect(this.gainNode);
        // Gain -> Speakers
        this.gainNode.connect(context.destination);

        this.mute();
        this.setWaveType(options.waveType || klass.fn.defaultWaveType);

        if (options.setFrequency) {
            this.setFrequency(options.setFrequency);
        }
    }

    var possibleWaveTypes = ["sine", "square", "sawtooth", "triangle"];

    klass.fn = klass.prototype;
    klass.fn.defaultWaveType = "square";
    klass.fn.setWaveType = function(waveType) {
        // this.oscillator.type takes an int but turns into a string...
        this.oscillator.type = possibleWaveTypes.indexOf(waveType.toLowerCase())
            || this.oscillator.type;
        return this;
    };
    klass.fn.getWaveType = function() {
        return this.oscillator.type;
    };
    klass.fn.getAllPossibleWaveTypes = function() {
        return possibleWaveTypes;
    }

    klass.fn.playFrequency = function(frequency) {
        if (!frequency) { return this; }
        this.play();
        this.setFrequency(frequency);
        return this;
    };
    klass.fn.setFrequency = function(frequency, delay) {
        delay = delay || 0;

        if (delay) {
            setTimeout(function() {
                this.setFrequency(frequency);
            }.bind(this), delay);
            return this;
        }

        this.value = this.oscillator.frequency.value = frequency;
        return this;
    }
    klass.fn.getFrequency = function() {
        return this.value;
    };

    klass.fn.changeOctave = function(change) {
        if (change > 0) {
            while (change--) {
                this.setFrequency(this.getFrequency() * 2);
            }
        } else {
            change *= -1;
            while (change--) {
                this.setFrequency(this.getFrequency() / 2);
            }
        }
        return this;
    }

    klass.fn.setGain = function(gain) {
        this.gainNode.gain.value = gain;
    }

    klass.fn.mute = function() {
        this.setGain(0);
    }

    klass.fn.play = function() {
        if (!this.isAudible) {
            this.setGain(1);
            this.isAudible = true;
        }
        return this;
    };
    klass.fn.stop = function() {
        if (this.isAudible) {
            this.setGain(0);
            this.isAudible = false;
        }
        return this;
    };

    return klass;
}());

var OscisCollection = (function() {
    var klass = function() {
        this.oscis = {};
    }

    klass.fn = klass.prototype;

    klass.fn.at = function(key) {
        return this.oscis[key];
    }

    klass.fn.setAt = function(key, osci) {
        this.oscis[key] = osci;
        return this;
    };

    klass.fn.deleteAt = function(key) {
        this.at(key).stop();
        delete this.oscis[key];
    }

    klass.fn.forEach = function(fn) {
        for (key in this.oscis) {
            fn.apply(this, [this.oscis[key], key]);
        }
        return this;
    };

    klass.fn.clear = function() {
        this.forEach(function(osci, key) {
            this.deleteAt(key);
        }.bind(this));
        return this;
    }

    var duplicateMethods = [
        "setWaveType",
        "changeOctave"
    ];

    duplicateMethods.forEach(function(duplicateMethod) {
        klass.fn[duplicateMethod] = function() {
            var args = arguments;
            this.forEach(function(osci) {
                osci[duplicateMethod].apply(osci, args);
            });
            return this;
        };
        return this;
    })

    return klass;
}());
