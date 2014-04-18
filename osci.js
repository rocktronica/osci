var Osci = (function(){
    var context = new webkitAudioContext();

    var klass = function() {
        this.isConnected = false;
        this.value; // oscillator.frequency.value may round

        this.oscillator = context.createOscillator();
        this.oscillator.start(0);

        this.setWaveType("square");
    }

    klass.fn = klass.prototype;
    klass.fn.setWaveType = function(waveType) {
        this.oscillator.type = {
            sine: 0,
            square: 1,
            triangle: 2
        }[waveType.toLowerCase()] || this.oscillator.type;
        return this;
    };
    klass.fn.getWaveType = function() {
        return [
            "sine",
            "square",
            "triangle"
        ][this.oscillator.type];
    };

    klass.fn.playFrequency = function(frequency) {
        if (!frequency) { return this; }
        this.play();
        this.setFrequency(frequency);
        return this;
    };
    klass.fn.setFrequency = function(frequency) {
        this.value = this.oscillator.frequency.value = frequency;
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
