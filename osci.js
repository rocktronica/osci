var Osci = (function(){
    var context = new webkitAudioContext();

    var oscillator = context.createOscillator();
    oscillator.start(0);

    window.oscillator = oscillator;

    var klass = function() {
        console.log("init", this);
        this.isConnected = false;

        this.setWaveType("square");
    }

    klass.fn = klass.prototype;
    klass.fn.setWaveType = function(waveType) {
        oscillator.type = {
            sine: 0,
            square: 1,
            triangle: 2
        }[waveType.toLowerCase()] || oscillator.type;
        return this;
    };
    klass.fn.getWaveType = function() {
        return [
            "sine",
            "square",
            "triangle"
        ][oscillator.type];
    };

    klass.fn.playFrequency = function(frequency) {
        if (!frequency) { return this; }
        this.play();
        oscillator.frequency.value = frequency;
        console.log("frequency", frequency);
        return this;
    };
    klass.fn.getFrequency = function() {
        return oscillator.frequency.value;
    };

    klass.fn.play = function() {
        if (!this.isConnected) {
            oscillator.connect(context.destination);
            this.isConnected = true;
        }
        return this;
    };
    klass.fn.stop = function() {
        if (this.isConnected) {
            oscillator.disconnect(context.destination);
            this.isConnected = false;
        }
        return this;
    };

    return klass;
}());
