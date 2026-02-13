const goodEmojis = ['❤️', '💔', '💕', '💖', '💝', '😍', '🥰', '😘'] as const;
export const badEmojis = ['😬', '💩', '🤡'] as const;
export const allowedEmojis = [...goodEmojis, ...badEmojis] as const;

export interface EmojiInterface {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  vy: number;
  emoji: (typeof allowedEmojis)[number];
}

interface EmojiProps {
  emoji: EmojiInterface;
  onClick: () => void;
}

export default function Emoji(props: EmojiProps) {
  return (
    <div
      class="emoji"
      style={{ left: `${props.emoji.x}px`, top: `${props.emoji.y}px` }}
      on:click={props.onClick}
    >
      {props.emoji.emoji}
    </div>
  );
}
