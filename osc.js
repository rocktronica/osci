var Osci = (function(){
    var context = new webkitAudioContext();

    var oscillator = context.createOscillator();
    oscillator.connect(context.destination);

    var klass = function() {
        console.log("init", this);

        this.setWaveType("sine");
    }

    klass.fn = klass.prototype;
    klass.fn.setWaveType = function(waveType) {
        oscillator.type = {
            sine: 0,
            square: 1,
            triangle: 2
        }[waveType.toLowerCase()] || oscillator.type;
        return this;
    }
    klass.fn.getWaveType = function() {
        return [
            "sine",
            "square",
            "triangle"
        ][oscillator.type];
    };

    klass.fn.playFrequency = function(frequency) {
        this.play();
        oscillator.frequency.value = frequency;
        console.log("frequency", frequency);
        return this;
    }
    klass.fn.getFrequency = function() {
        return oscillator.frequency.value;
    }

    klass.fn.play = function() {
        if (oscillator.playbackState !== 2) {
            oscillator.noteOn(0);
        }
        return this;
    };
    klass.fn.stop = function() {

    };

    return klass;
}());
