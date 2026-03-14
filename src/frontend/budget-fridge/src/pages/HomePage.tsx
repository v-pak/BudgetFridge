import LeftPanel from '../components/home/LeftPanel';
import { RightPanel } from '../components/home/RightPanel';

export default function HomePage() {
  return (
    <div className="grid grid-cols-2 min-h-[calc(100vh-73px)]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
