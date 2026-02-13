import { For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import './App.css';
import Heart from './components/heart';

const goodEmojis = ['❤️', '💔', '💕', '💖', '💝', '😍', '🥰', '😘'] as const;
const badEmojis = ['😬', '💩', '🤡'] as const;
const allowedEmojis = [...goodEmojis, ...badEmojis] as const;
interface EmojiInterface {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  vy: number;
  emoji: (typeof allowedEmojis)[number];
}

function App() {
  const [emojis, setEmojis] = createStore<EmojiInterface[]>([]);

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
      startX: x,
      startY: y,
      x,
      y,
      vy: Math.random() * 0.5 + 0.5,
      emoji: allowedEmojis[Math.floor(Math.random() * allowedEmojis.length)],
    };

    setEmojis([...emojis.filter((e) => e.y > 0), newEmoji]);
  }, 1_000);

  setInterval(() => {
    setEmojis(
      produce((emojis) => {
        for (const emoji of emojis) {
          emoji.y += emoji.vy;
        }
      }),
    );
  }, 10);

  return (
    <>
      <h1>Will you be my Valentine?</h1>

      <Heart />

      <div class="emoji-container">
        <For each={emojis}>
          {(emoji) => (
            <div
              class="emoji"
              data-x={emoji.x}
              data-y={emoji.y}
              on:click={() => {
                setEmojis((prev) => prev.filter((e) => e.id !== emoji.id));
              }}
            >
              {emoji.emoji}
            </div>
          )}
        </For>
      </div>
    </>
  );
}

export default App;
