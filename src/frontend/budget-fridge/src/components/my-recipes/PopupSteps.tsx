import SectionTitle from '../utils/SectionTitle';

interface PopupStepsProps {
  steps: string[];
}

export default function PopupSteps({ steps }: PopupStepsProps) {
  return (
    <>
      <SectionTitle>Steps</SectionTitle>
      <ol className="list-none mb-8">
        {steps.map((step, i) => (
          <li
            key={i}
            className="relative pl-9 py-3 border-b border-border text-[13px] leading-[1.7] font-light font-body text-text"
          >
            <span className="absolute left-0 top-3 text-[11px] text-accent font-medium tracking-[0.05em]">
              {String(i + 1).padStart(2, '0')}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </>
  );
}