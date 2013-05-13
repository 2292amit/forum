// No dependencies.
define([], function () {
    // Local reference to `Vyome` namespace.
    var Vyome = window.Vyome;

    // Create `Vyome` namespace only if not already defined.
    if (!Vyome) {
    	Vyome = window.Vyome = {};
    }

    return Vyome;
});