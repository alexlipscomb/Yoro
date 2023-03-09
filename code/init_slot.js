var PATCHER = this.patcher;


function init(channel, slot) {
	PATCHER.setattr("globalpatchername", "slot_" + slot);
	_updateTitle(channel, slot);
}

function _updateTitle(channel, slot) {
	PATCHER.setattr("title", "(Channel " + channel + ") " + "Slot " + slot);
}