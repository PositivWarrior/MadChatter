const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', name);

socket.on('chat-message', (data) => {
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', (name) => {
	appendMessage(`${name} connected`);
});

socket.on('user-disconnected', (name) => {
	appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	appendMessage(`You: ${message}`);
	socket.emit('send-chat-message', message);
	const messageElement = document.createElement('div');
	messageElement.classList.add('message', 'sent');
	messageInput.value = '';
	messageInput.focus();
});

function appendMessage(messsage) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('message', 'received');
	messageElement.innerText = messsage;
	messageContainer.append(messageElement);
}
