var Keys = (function() {
    var klass = function() {
        this.pressed = [];
    };

    klass.fn = klass.prototype;

    klass.fn.TILDE = 192;
    // klass.fn.BACKTICK = 192; shifted
    klass.fn.TAB = 9;
    klass.fn.UP = 38;
    klass.fn.DOWN = 40;
    klass.fn.SHIFT = 16;
    klass.fn.Z = 90;
    klass.fn.S = 83;
    klass.fn.X = 88;
    klass.fn.D = 68;
    klass.fn.C = 67;
    klass.fn.V = 86;
    klass.fn.G = 71;
    klass.fn.B = 66;
    klass.fn.H = 72;
    klass.fn.N = 78;
    klass.fn.J = 74;
    klass.fn.M = 77;
    klass.fn.COMMA = 188;
    klass.fn.L = 76;
    klass.fn.PERIOD = 190;
    klass.fn.SEMICOLON = 186;
    klass.fn.SLASH = 191;
    klass.fn.Q = 81;
    klass.fn.TWO = 50;
    klass.fn.W = 87;
    klass.fn.THREE = 51;
    klass.fn.E = 69;
    klass.fn.R = 82;
    klass.fn.FIVE = 53;
    klass.fn.T = 84;
    klass.fn.SIX = 54;
    klass.fn.Y = 89;
    klass.fn.SEVEN = 55;
    klass.fn.U = 85;
    klass.fn.I = 73;
    klass.fn.NINE = 57;
    klass.fn.O = 79;
    klass.fn.ZERO = 48;
    klass.fn.P = 80;
    klass.fn.OPEN_BRACKET = 219;
    klass.fn.EQUALS = 187;
    klass.fn.CLOSE_BRACKET = 221;

    var KEY_TO_INDEX = {};

    // Low row
    [
        // Octave 0
        klass.fn.Z, klass.fn.S, klass.fn.X, klass.fn.D, klass.fn.C, klass.fn.V, klass.fn.G,
        klass.fn.B, klass.fn.H, klass.fn.N, klass.fn.J, klass.fn.M,

        // Octave 1
        klass.fn.COMMA, klass.fn.L, klass.fn.PERIOD, klass.fn.SEMICOLON, klass.fn.SLASH,
    ].forEach(function(key, i) {
        KEY_TO_INDEX[key] = i;
    });

    // High row
    [
        // Octave 1
        klass.fn.Q, klass.fn.TWO, klass.fn.W, klass.fn.THREE, klass.fn.E, klass.fn.R,
        klass.fn.FIVE, klass.fn.T, klass.fn.SIX, klass.fn.Y, klass.fn.SEVEN, klass.fn.U,

        // Octave 2
        klass.fn.I, klass.fn.NINE, klass.fn.O, klass.fn.ZERO, klass.fn.P,
        klass.fn.OPEN_BRACKET, klass.fn.EQUALS, klass.fn.CLOSE_BRACKET
    ].forEach(function(key, i) {
        KEY_TO_INDEX[key] = i + 12;
    })

    klass.fn.noteIndexAtKey = function(which) {
        return KEY_TO_INDEX[which]
    }

    klass.fn.down = function(which) {
        this.lastPressed = which;
        if (!this.isPressed(which)) {
            this.pressed.push(which);
        }
        return this;
    }

    klass.fn.up = function(which) {
        this.pressed.splice(this.pressed.indexOf(which), 1);
        return this;
    }

    klass.fn.isPressed = function(which) {
        return this.pressed.indexOf(which) !== -1;
    }

    klass.fn.lastStillPressed = function() {
        return this.pressed[this.pressed.length - 1];
    }

    klass.fn.getLastPressed = function() {
        return this.lastPressed;
    }

    return klass;
}());
