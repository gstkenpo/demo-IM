const { Chat } = require('../model/chat');

/**
 * 
 * @param userName 
 * @Return all chat records related to login user
 */
const findChat = async(userName) => {
	if (!userName) return Promise.reject();
	return await Chat.findOne({userNames: userName});
};

const createChat = async(senderUserName, receiverUserName) => {
	if (!senderUserName || !receiverUserName) return Promise.reject();
	let chat = await Chat.findOne({userNames: {$all: [senderUserName, receiverUserName]}});
	console.log('createChat: ' + chat);
	if (chat) return chat;
	else {
		chat = new Chat({userNames: [senderUserName, receiverUserName]});
		return await chat.save();
	}
};

module.exports.findChat = findChat;
module.exports.createChat = createChat;