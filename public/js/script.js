// Sets the chat container with the messages that are sent and received.
function setChatContainerDOM(message, messageType) {
	let message_box_div = document.getElementById('chatContainer');
	let message_card_div = document.createElement('div');
	message_card_div.className = 'col-12';
	let message_div = document.createElement('div');
	message_div.classList = `card ${messageType}`;
	let message_text_div = document.createElement('div');
	message_text_div.className = 'card-body';
	let message_text_p = document.createElement('p');
	message_text_p.className = 'card-text';
	message_text_p.innerHTML = message;
	message_text_div.appendChild(message_text_p);
	message_div.appendChild(message_text_div);
	message_card_div.appendChild(message_div);
	message_box_div.insertBefore(message_card_div, message_box_div.firstChild);
}
// Client Side method called from Emitting "newMessage" event from server.js
function sendMessage(event, socket) {
	event.preventDefault();
	let user = document.getElementById('username').value;
	let channelName = document.getElementById('channel').value;
	let messageStr = document.getElementById('message').value;
	let data = {
		username: user,
		channel: channelName,
		message: messageStr
	};
	let text = `Me \: ${messageStr}`;
	setChatContainerDOM(text, 'sent-message');
	socket.emit('message', data);
}


// This is called when user clicks on join button - Emits "joinChannel" event
function joinChannel(event, socket) {
	event.preventDefault();
	let channelName = document.getElementById('newchannel').value;
	socket.emit('joinChannel', {
		channel: channelName
	});
	// resetting the channel in join section to make it list down all channel on next action
	document.getElementById('newchannel').value = '';
}
// Called when user clicks on leave button.
function leaveChannel(event, socket) {
	event.preventDefault();
	let channelName = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', {
		channel: channelName
	});
	// resetting the channel in join section to make it list down all channel on next action
	document.getElementById('newchannel').value = '';
}
// called on registering. client Listens to event welcomeMessage emitted from server.
function onWelcomeMessageReceived(msg) {
	let text = `System : ${msg}`;
	setChatContainerDOM(text, 'received-message');
}

// called on sending message. client Listens to event newmessage emitted from server.
function onNewMessageReceived(messageData) {
	let text = `${messageData.username} : ${messageData.message}`;
	setChatContainerDOM(text, 'received-message');
}

// to set the alertCOntainer ( the alerts when user joins a chennel)
function setAlertDOM(text) {
	let regAlert = document.getElementById('alertContainer');
	regAlert.innerHTML = '';
	let alert = document.createElement('div');
	alert.classList = 'alert alert-success alert-dismissible fade show';
	alert.setAttribute('role', 'alert');
	let button = document.createElement('button');
	button.className = 'close';
	button.setAttribute('data-dismiss', 'alert');
	button.setAttribute('aria-label', 'Close');
	let span = document.createElement('span');
	span.setAttribute('aria-hidden', 'true');
	span.innerHTML = '&times;';
	button.appendChild(span);
	alert.innerHTML = text + button.outerHTML;
	regAlert.appendChild(alert);
}

// setting the channel list to the datalist - channelsList id.
function setTheChannelList(channel) {
	let channelList = document.getElementById('channelsList');
	// Checking if the channel is already joined by the user.
	let isPresent = channelList.innerHTML.includes(`${channel}`);
	if (!isPresent) {
		let channelName = document.createElement('option');
		channelName.innerHTML = `${channel}`;
		channelList.appendChild(channelName);
	}
}

// when the user is added to a channel, or when he joins a new channel this method is called.
// Called when Client listens tp the Even 'addToChannel' emitted by server.
function onAddedToNewChannelReceived(channelObj) {
	setTheChannelList(channelObj.channel);
	let text = `You are added to <strong>${channelObj.channel}</strong> successfully!`;
	setAlertDOM(text);
}

// when the user leaves the channel, the channel has to be removed from the datalist
function removeFromList(ch) {
	let dataList = document.getElementById('channelsList');
	let channels = dataList.getElementsByTagName('option');
	for (let i = 0; i < channels.length; i = i + 1) {
		let channel = channels[i];
		if (channel.innerHTML.includes(`${ch}`)) {
			dataList.removeChild(channel);
			break;
		}
	}
}
// when channel is removed form the list for a user, this method is called.
// Called by client on listening to Event 'removedFromChannel' emitted by server.
function onRemovedFromChannelReceived(channelObj) {
	removeFromList(channelObj.channel);
	let text = `You are removed from <strong>${channelObj.channel}</strong> successfully!`;
	setAlertDOM(text);
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
