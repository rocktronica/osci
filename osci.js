var Osci = (function(){
    var context = new webkitAudioContext();

    var klass = function() {
        this.isConnected = false;

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
        this.oscillator.frequency.value = frequency;
        return this;
    };
    klass.fn.getFrequency = function() {
        return this.oscillator.frequency.value;
    };

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
