(function(exports) {
    var synth = new Synth();
    var keys = new Keys();
    var frequencies = new Frequencies();

    var keydown = function(e) {
        if (e.repeat) { return; }

        if (e.which === keys.TILDE) {
            if (!e.shiftKey) {
                synth.nextMode().clear();
            } else {
                synth.polyphonicGlissando = !synth.polyphonicGlissando;
            }

            return;
        }

        // tab to change wave type
        if (e.which === keys.TAB) {
            synth.nextWaveType();
            e.preventDefault();
        }

        var changeInOctave = 0;
        if (e.which === keys.UP) {
            changeInOctave = 1;
        } else if (e.which === keys.DOWN) {
            changeInOctave = -1;
        }
        synth.octave += changeInOctave;

        var oscisIndex = synth.polyphonic ? e.which : 0;

        if (keys.noteIndexAtKey(e.which) !== undefined) {
            synth.oscis.setAt(
                oscisIndex,
                synth.oscis.at(oscisIndex) || new Osci({waveType: synth.waveType})
            );

            var delay = 0;
            if (synth.polyphonicGlissando && keys.getLastPressed()) {
                synth.oscis.at(oscisIndex).setFrequency(
                    frequencies.at(synth.octave * 12 + keys.noteIndexAtKey(keys.getLastPressed()))
                );
                delay = 10;
            }

            synth.oscis.at(oscisIndex)
                .setFrequency(
                    frequencies.at(synth.octave * 12 + keys.noteIndexAtKey(e.which)),
                    delay
                )
                .play();
        }

        if (e.shiftKey) { changeInOctave = 1; }
        if (changeInOctave) {
            synth.changeOctave(changeInOctave);
        }

        if (e.which === 27) {
            synth.clear();
        }

        keys.down(e.which);
    };

    var keyup = function(e) {
        keys.up(e.which);

        var oscisIndex = synth.polyphonic ? e.which : 0;

        if (!!synth.oscis.at(oscisIndex)) {
            var osci = synth.oscis.at(oscisIndex);

            if (synth.polyphonic) {
                synth.oscis.deleteAt(oscisIndex);
            } else {
                var lastPressedKey = keys.lastStillPressed();

                if (lastPressedKey) {
                    synth.oscis.at(oscisIndex).playFrequency(
                        frequencies.at(synth.octave * 12 + keys.noteIndexAtKey(lastPressedKey))
                    );
                } else {
                    osci.stop();
                }
            }
        }

        // e.shiftKey is apparently unreliable for keyUp
        if (e.which === keys.SHIFT) {
            synth.changeOctave(-1);
        }
    }

    var visibilityChange = function(e) {
        if (document.hidden) {
            synth.clear();
        }
    }

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    document.addEventListener("visibilitychange", visibilityChange);
}(this));
