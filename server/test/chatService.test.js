const { expect, assert } = require('chai');
const { Chat } = require('../model/chat.js');
const chatService = require('../service/chatService.js');
const prefix = 'chatService.test_';

describe('Create Chat Test', () => {
	it('create chat', async () => {
		try {
			const chat = await chatService.createChat(prefix + 'userName1', prefix + 'userName2');
			expect(chat).to.be.a('object');
			expect(chat.userNames).to.include.members([prefix + 'userName1', prefix + 'userName2']);

		} catch (err) {
			if (err) console.log(err);
			expect(err).to.be.null;
		}
	});

	it ('find chat by userName', async () => {
		const chat = await chatService.findChat(prefix + 'userName1');
		expect(chat).to.be.a('object');
		expect(chat.userNames).to.include.members([prefix + 'userName1', prefix + 'userName2']);
	});

	it ('create two same chats', async () => {
		const chat1 = await chatService.createChat(prefix + 'userName1', prefix + 'userName2');
		const chat2 = await chatService.createChat(prefix + 'userName2', prefix + 'userName1');
		console.log(chat1.id);
		console.log(chat2.id);
		assert.isTrue(chat1.id === chat2.id);
	});

	after(async () => {
		await Chat.deleteMany({userNames: prefix + 'userName1'}).exec();        
	});
});