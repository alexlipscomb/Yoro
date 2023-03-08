var SLOT_COUNT = 0;
var SLOT_POOL_ID = "_SLOT_POOL";
var SLOT_POOL = new Dict(SLOT_POOL_ID);
SLOT_POOL.quiet = true;

function add() {
  var id = SLOT_COUNT.toString();

  SLOT_POOL.append(id, {
    location: "",
    next: "",
    previous: "",
  });

  outlet(0, "add", id);

  max.openfile(id, "slot.maxpat");

  SLOT_COUNT++;
}

function remove() {
  for (var i = 0; i < arguments.length; i++) {
    var id = arguments[i];

    if (SLOT_POOL.contains(id)) {
      _removeReferences(id);

      max.closefile(id);

      SLOT_POOL.remove(id);

      outlet(0, "remove", id);
    }
  }
}

function _removeReferences(id) {
  var slot = SLOT_POOL.get(id);

  if (slot === undefined) {
    return;
  }

  var keys = SLOT_POOL.getkeys();

  if (keys === null) {
    return;
  }

  for (var i = 0; i < keys.length; i++) {
    var currentSlot = SLOT_POOL.get(id);

    if (currentSlot === undefined) {
      continue;
    }

    if (slot["next"] === id) {
      currentSlot["next"] = "";
    } else {
      currentSlot["next"] = slot["next"];
    }

    if (currentSlot["previous"] === id) {
      currentSlot["previous"] = "";
    } else {
      currentSlot["previous"] = slot["previous"];
    }
  }
}
