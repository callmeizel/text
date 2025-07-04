    const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰",
                  "😘","😙","😋","😜","🤑","🤗","🤔","😎","🥳","😐","🤧","😖","😲","😤","😔","🥴"];
    const layer = document.getElementById('emojiLayer');
    for(let i=0; i<50; i++) {
      const e = document.createElement('div');
      e.className = 'emoji';
      e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      e.style.left = Math.random() * 100 + 'vw';
      e.style.top = Math.random() * 100 + 'vh';
      e.style.animationDuration = (10 + Math.random() * 20) + 's';
      e.style.fontSize = (18 + Math.random() * 8) + 'px';
      layer.appendChild(e);
    }


    function toggleMenu() {
      document.getElementById("sideMenu").classList.toggle("open");
      document.getElementById("navMenu").classList.toggle("hidden-slide");
    }

  const submitBtn = document.querySelector('.submit-btn');
  const inputField = document.querySelector('.input-text');
  const warningPopup = document.getElementById('warningPopup');
  const loadingPopup = document.getElementById('loadingPopup');

  function closeWarning() {
    const box = warningPopup.querySelector('.popup-box');
    box.classList.remove('animate-in');
    box.classList.add('animate-out');
    setTimeout(() => {
      warningPopup.classList.add('hidden');
      box.classList.remove('animate-out');
    }, 250);
  }

document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.querySelector('.submit-btn');
  const inputField = document.querySelector('.input-text');
  const displayBox = document.querySelector('.display-box');
  const warningPopup = document.getElementById('warningPopup');
  const loadingPopup = document.getElementById('loadingPopup');

  function closeWarning() {
    const box = warningPopup.querySelector('.popup-box');
    box.classList.remove('animate-in');
    box.classList.add('animate-out');
    setTimeout(() => {
      warningPopup.classList.add('hidden');
      box.classList.remove('animate-out');
    }, 250);
  }

  // ENTER key handler
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const isWarningVisible = !warningPopup.classList.contains('hidden');
      const isInputFocused = document.activeElement === inputField;

      if (isWarningVisible) {
        event.preventDefault();
        closeWarning();
      } else if (isInputFocused) {
        event.preventDefault();
        submitBtn.click();
      }
    }
  });

  // Main submission
  submitBtn.addEventListener('click', () => {
    const text = inputField.value.trim();

    if (text.length < 3) {
      const warningBox = warningPopup.querySelector('.popup-box');
      warningPopup.classList.remove('hidden');
      warningBox.classList.remove('animate-out');
      warningBox.classList.add('animate-in');
    } else {
      const loadingBox = loadingPopup.querySelector('.popup-box');
      const fill = loadingPopup.querySelector('.loading-fill');

      loadingPopup.classList.remove('hidden');
      loadingBox.classList.remove('animate-out');
      loadingBox.classList.add('animate-in');
      fill.style.animation = 'fillBar 5s linear forwards';

      setTimeout(() => {
        fetch("https://0c54-2409-4090-3007-a606-90e5-963d-623a-ab73.ngrok-free.app/BaggingML", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: text })
        })
        .then(res => res.json())
        .then(data => {
          const emotion = data.emotion.trim().toLowerCase();
          document.getElementById('outputText').innerText = emotion;

          const emojiMap = {
            "joy": "😄",
            "neutral": "😐",
            "sadness": "🤧",
            "love": "❤️",
            "surprise": "😲",
            "anger": "😤",
            "fear": "😨",
          };

          const emoji = emojiMap[emotion] || "";
          document.getElementById('outputEmoji').innerText = emoji;
        })
        .catch(err => {
          document.getElementById('outputText').innerText = "Error 😓";
          document.getElementById('outputEmoji').innerText = "";

          console.error(err);
        })
        .finally(() => {
          loadingBox.classList.remove('animate-in');
          loadingBox.classList.add('animate-out');
          setTimeout(() => {
            loadingPopup.classList.add('hidden');
            loadingBox.classList.remove('animate-out');
            fill.style.animation = 'none';
          }, 250);
        });
      }, 5000);
    }
  });
});

document.addEventListener('click', function (e) {
    const bubble = document.createElement('div');
    bubble.className = 'click-bubble';
    bubble.style.left = `${e.clientX}px`;
    bubble.style.top = `${e.clientY}px`;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 400);
  });
