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
  emoji: (typeof allowedEmojis)[number];
}

function App() {
  const [emojis, _setEmojis] = createSignal<EmojiInterface[]>([]);

  return (
    <>
      <h1>Will you be my Valentine?</h1>

      <Heart />

      {emojis().map((emoji) => (
        <div
          class="emoji"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </>
  );
}

export default App;
