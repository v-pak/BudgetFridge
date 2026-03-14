import PillButton from '../utils/PillButton';

interface Props {
  saveLabel: string;
  onSave: () => void;
  onNext: () => void;
}

export default function RecipeActions({ saveLabel, onSave, onNext }: Props) {
  return (
    <div className="flex gap-3">
      <PillButton variant="filled-accent" onClick={onSave} className="flex-1">
        {saveLabel}
      </PillButton>
      <PillButton variant="outlined" trailingArrow onClick={onNext} className="flex-1">
        Show Me Another
      </PillButton>
    </div>
  );
}
