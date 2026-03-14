import { cardGradient } from '../../utils/cardGradient';

interface PopupImageProps {
  recipeName: string;
  imageUrl?: string;
}

export default function PopupImage({ recipeName, imageUrl }: PopupImageProps) {
  return (
    <div
      className="w-full aspect-video rounded-t-[20px] relative overflow-hidden"
      style={{ background: imageUrl ? undefined : cardGradient(recipeName) }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={recipeName}
          className="w-full h-full object-cover"
        />
      ) : null}
      <div className="absolute inset-2 border border-white/25" />
    </div>
  );
}