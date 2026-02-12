import { createSignal } from 'solid-js';
import './App.css';
import Heart from './components/heart';

const goodEmojis = ['❤️', '💔', '💕', '💖', '💝', '😍', '🥰', '😘'] as const;
const badEmojis = ['😬', '💩', '🤡'] as const;
const allowedEmojis = [...goodEmojis, ...badEmojis] as const;
interface EmojiInterface {
  id: number;
  x: number;
  y: number;
  vy: number;
  emoji: (typeof allowedEmojis)[number];
}

function App() {
  const [emojis, setEmojis] = createSignal<EmojiInterface[]>([]);

  setInterval(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const horizontalMargin = 0.2;
    const verticalMargin = 0.2;
    const x =
      Math.random() * windowWidth * (1 - horizontalMargin * 2) +
      windowWidth * horizontalMargin;
    const y =
      Math.random() * windowHeight * (1 - verticalMargin * 2) +
      windowHeight * verticalMargin;
    const newEmoji: EmojiInterface = {
      id: Math.random(),
      x,
      y,
      vy: Math.random() * 50,
      emoji: allowedEmojis[Math.floor(Math.random() * allowedEmojis.length)],
    };

    // We add the new emoji, but we also remove the ones that fell under the screen
    setEmojis((prev) => [...prev, newEmoji].filter((e) => e.y > 0));
  }, 1_000);

  return (
    <>
      <h1>Will you be my Valentine?</h1>

      <Heart />

      <div class="emoji-container">
        {emojis().map((emoji) => (
          <div
            class="emoji"
            style={{
              position: 'absolute',
              'font-size': '2rem',
              left: `${emoji.x}px`,
              top: `${emoji.y}px`,
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
