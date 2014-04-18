var Frequencies = (function() {
    var originalFrequncies = [
        16.35,      // c0
        17.32,      // c#0/db0
        18.35,      // d0
        19.45,      // d#0/eb0
        20.60,      // e0
        21.83,      // f0
        23.12,      // f#0/gb0
        24.50,      // g0
        25.96,      // g#0/ab0
        27.50,      // a0
        29.14,      // a#0/bb0
        30.87,      // b0
        32.70,      // c1
        34.65,      // c#1/db1
        36.71,      // d1
        38.89,      // d#1/eb1
        41.20,      // e1
        43.65,      // f1
        46.25,      // f#1/gb1
        49.00,      // g1
        51.91,      // g#1/ab1
        55.00,      // a1
        58.27,      // a#1/bb1
        61.74,      // b1
        65.41,      // c2
        69.30,      // c#2/db2
        73.42,      // d2
        77.78,      // d#2/eb2
        82.41,      // e2
        87.31,      // f2
        92.50,      // f#2/gb2
        98.00,      // g2
        103.83,     // g#2/ab2
        110.00,     // a2
        116.54,     // a#2/bb2
        123.47,     // b2
        130.81,     // c3
        138.59,     // c#3/db3
        146.83,     // d3
        155.56,     // d#3/eb3
        164.81,     // e3
        174.61,     // f3
        185.00,     // f#3/gb3
        196.00,     // g3
        207.65,     // g#3/ab3
        220.00,     // a3
        233.08,     // a#3/bb3
        246.94,     // b3
        261.63,     // c4
        277.18,     // c#4/db4
        293.66,     // d4
        311.13,     // d#4/eb4
        329.63,     // e4
        349.23,     // f4
        369.99,     // f#4/gb4
        392.00,     // g4
        415.30,     // g#4/ab4
        440.00,     // a4
        466.16,     // a#4/bb4
        493.88,     // b4
        523.25,     // c5
        554.37,     // c#5/db5
        587.33,     // d5
        622.25,     // d#5/eb5
        659.25,     // e5
        698.46,     // f5
        739.99,     // f#5/gb5
        783.99,     // g5
        830.61,     // g#5/ab5
        880.00,     // a5
        932.33,     // a#5/bb5
        987.77,     // b5
        1046.50,    // c6
        1108.73,    // c#6/db6
        1174.66,    // d6
        1244.51,    // d#6/eb6
        1318.51,    // e6
        1396.91,    // f6
        1479.98,    // f#6/gb6
        1567.98,    // g6
        1661.22,    // g#6/ab6
        1760.00,    // a6
        1864.66,    // a#6/bb6
        1975.53,    // b6
        2093.00,    // c7
        2217.46,    // c#7/db7
        2349.32,    // d7
        2489.02,    // d#7/eb7
        2637.02,    // e7
        2793.83,    // f7
        2959.96,    // f#7/gb7
        3135.96,    // g7
        3322.44,    // g#7/ab7
        3520.00,    // a7
        3729.31,    // a#7/bb7
        3951.07,    // b7
        4186.01,    // c8
        4434.92,    // c#8/db8
        4698.63,    // d8
        4978.03,    // d#8/eb8
        5274.04,    // e8
        5587.65,    // f8
        5919.91,    // f#8/gb8
        6271.93,    // g8
        6644.88,    // g#8/ab8
        7040.00,    // a8
        7458.62,    // a#8/bb8
        7902.13     // b8
    ];

    var maxFrequncies = 200;
    var jump = 1.05945945945946; // accurate?

    var values = [16.35];  // c0

    var i = 0;
    while (i++ <= maxFrequncies) {
        values.push(values[i-1] * jump);
    }

    var klass = function() {

    };

    klass.fn = klass.prototype;

    klass.fn.at = function(i) {
        console.log(values[i], originalFrequncies[i]);
        return values[i];
    }

    klass.fn.indexOf = function(value) {
        return values.indexOf(value);
    }

    return klass;
}());
