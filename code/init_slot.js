var PATCHER = this.patcher;


function init(channel, slot) {
	PATCHER.setattr("title", "(Channel " + channel + ") " + "Slot " + slot);
}
