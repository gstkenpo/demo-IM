const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	userNames: {
		type: Array,
		required: [true, 'userNames is required.']
	}
});

const Chat = mongoose.model('Chat', ChatSchema);
exports.Chat = Chat;