import { cardGradient } from '../utils/cardGradient';

interface PopupImageProps {
  recipeName: string;
}

export default function PopupImage({ recipeName }: PopupImageProps) {
  return (
    <div
      className="w-full aspect-video rounded-t-[20px] relative"
      style={{ background: cardGradient(recipeName) }}
    >
      <div className="absolute inset-2 border border-white/25" />
    </div>
  );
}