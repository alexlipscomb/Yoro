var SLOT_COUNT = 0;
var SLOT_POOL_ID = "_SLOT_POOL";
var SLOT_POOL = new Dict(SLOT_POOL_ID);
SLOT_POOL.quiet = true;

function add(channel) {
  if (channel === undefined) {
    error("No channel specified\n");
    return;
  }

  var id = SLOT_COUNT.toString();
  var ch = channel.toString();

  SLOT_POOL.append(ch, id);

  outlet(0, "load", "slot.maxpat", ch, id);

  SLOT_COUNT++;
}

function remove() {
  if (arguments.length < 1) {
    error("Must provide the channel and optional slot IDs");
    return;
  }

  var channel = arguments[0];

  if (!SLOT_POOL.contains(channel)) {
    return;
  }

  var slots = SLOT_POOL.get(channel);

  if (slots === null) {
    return;
  }

  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var newSlots = [];

  for (var i = 0; i < slots.length; i++) {
    for (var j = 0; j < args.length; j++) {
      if (slots[i] == args[j]) {
        outlet(0, "remove", slots[i]);
      } else {
        newSlots.push(slots[i]);
      }
    }
  }

  SLOT_POOL.set(channel, newSlots);
}
