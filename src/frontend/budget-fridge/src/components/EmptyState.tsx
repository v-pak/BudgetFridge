import { useNavigate } from 'react-router-dom';
import PillButton from './PillButton';

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[340px] gap-4 text-center">
      <p className="font-heading text-[28px] font-light text-text-light">
        No recipes saved yet
      </p>
      <p className="font-body text-[14px] text-text-light font-light">
        Generate some recipes and save your favourites.
      </p>
      <PillButton variant="outlined" onClick={() => navigate('/')} className="mt-2">
        ← Go Home
      </PillButton>
    </div>
  );
}