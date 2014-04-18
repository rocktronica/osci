var Keys = (function() {
    var KEY_TO_INDEX = {
        '90': 0,
        '83': 1,
        '88': 2,
        '68': 3,
        '67': 4,
        '86': 5,
        '71': 6,
        '66': 7,
        '72': 8,
        '78': 9,
        '74': 10,
        '77': 11,
        '188': 12,
        '76': 13,
        '190': 14,
        '186': 15,

        '81': 0 + 12,
        '50': 1 + 12,
        '87': 2 + 12,
        '51': 3 + 12,
        '69': 4 + 12,
        '82': 5 + 12,
        '53': 6 + 12,
        '84': 7 + 12,
        '54': 8 + 12,
        '89': 9 + 12,
        '55': 10 + 12,
        '85': 11 + 12,
        '73': 12 + 12,
        '57': 13 + 12,
        '79': 14 + 12,
        '48': 15 + 12,
        '80': 16 + 12,
        '219': 17 + 12,
        '187': 18 + 12,
        '221': 19 + 12
    };

    var klass = function() {

    };

    klass.fn = klass.prototype;
    klass.fn.noteIndexAtKey = function(noteIndexAtKey) {
        return KEY_TO_INDEX[noteIndexAtKey]
    }

    return klass;
}());
