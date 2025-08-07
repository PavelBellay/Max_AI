const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('You', userText);
  input.value = '';
  appendMessage('Max AI', 'Thinking...');

  try {
   const res = await fetch('https://pbellay.hf.space/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: userText })
});



    const data = await res.json();
    updateLastMessage(data.reply);
  } catch (err) {
    updateLastMessage("Oops! Something went wrong.");
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateLastMessage(text) {
  const msgs = chatWindow.querySelectorAll('.message');
  if (msgs.length > 0) {
    msgs[msgs.length - 1].innerHTML = `<strong>Max AI:</strong> ${text}`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}
