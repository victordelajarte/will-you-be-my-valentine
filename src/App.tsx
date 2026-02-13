import { For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import './App.css';
import Heart from './components/heart';
import Emoji, {
  allowedEmojis,
  badEmojis,
  type EmojiInterface,
} from './components/emoji';

function App() {
  const [emojis, setEmojis] = createStore<EmojiInterface[]>([]);

  const creationInterval = setInterval(() => {
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

    const fallenBadEmoji = emojis.find(
      (e) =>
        e.y > windowHeight &&
        (badEmojis as unknown as typeof allowedEmojis).includes(e.emoji),
    );

    if (fallenBadEmoji) {
      gameOver(fallenBadEmoji);
      return;
    }

    setEmojis([...emojis.filter((e) => e.y > 0), newEmoji]);
  }, 1_000);

  const movementInterval = setInterval(() => {
    setEmojis(
      produce((emojis) => {
        for (const emoji of emojis) {
          emoji.y += emoji.vy;
        }
      }),
    );
  }, 10);

  const gameOver = (emoji: EmojiInterface) => {
    alert(`Game Over! ${emoji.emoji}`);
    clearInterval(creationInterval);
    clearInterval(movementInterval);
    setEmojis([]);
  };

  return (
    <>
      <h1>Will you be my Valentine?</h1>

      <Heart />

      <div class="emoji-container">
        <For each={emojis}>
          {(emoji) => (
            <Emoji
              emoji={emoji}
              onClick={() => {
                setEmojis((prev) => prev.filter((e) => e.id !== emoji.id));
                // TODO: fade the emoji
              }}
            />
          )}
        </For>
      </div>
    </>
  );
}

export default App;
