var Osci = (function(){
    var context = new webkitAudioContext();

    var klass = function(options) {
        options = options || {};

        this.isConnected = false;
        this.value; // oscillator.frequency.value may round

        this.oscillator = context.createOscillator();
        this.oscillator.start(0);

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

    klass.fn.play = function() {
        if (!this.isConnected) {
            this.oscillator.connect(context.destination);
            this.isConnected = true;
        }
        return this;
    };
    klass.fn.stop = function() {
        if (this.isConnected) {
            this.oscillator.disconnect(context.destination);
            this.isConnected = false;
        }
        return this;
    };

    return klass;
}());
