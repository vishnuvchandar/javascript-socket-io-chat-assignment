let chList = [];

// adding the channel to data list one by one when a user registers
function addToChannelEmit(socket) {
	if (Array.isArray(chList)) {
		chList.forEach((ch) => {
			// The user will be subscribed to this channel
			socket.join(ch);
			socket.emit('addedToChannel', {
				channel: ch
			});
		});
	} else {
		socket.emit('addedToChannel', {
			channel: chList
		});
	}
}

function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		// When user clicks on register, register event is emitted from client and listend on server.
		socket.on('register', (userInfo) => {
			// This will call onWelcomeMessageREceived method on client, to populate the chatContainer
			// with welcome message  and username.
			socket.emit('welcomeMessage', `Welcome ${userInfo.username} !!`);
			chList = userInfo.channels;
			addToChannelEmit(socket);
			// The join channel emitted from client when clicking join button
			socket.on('joinChannel', (ch) => {
				socket.join(ch);
				socket.emit('addedToChannel', {
					channel: ch.channel
				});
			});
			// Leave channel wmitted from client when leave button is clicked.
			socket.on('leaveChannel', (ch) => {
				// The user will be unsubscribed from that channel
				socket.leave(ch.channel);
				socket.emit('removedFromChannel', {
					channel: ch.channel
				});
			});

			socket.on('message', (data) => {
				// The message is sent to  a particular channel alone
				socket.to(data.channel).emit('newMessage', {
					username: data.username,
					message: data.message,
					channel: data.channel
				});
			});
		});
	});
}

module.exports = bootstrapSocketServer;
