import SectionTitle from '../utils/SectionTitle';

interface Props {
  steps: string[];
}

export default function RecipeStepsList({ steps }: Props) {
  return (
    <>
      <SectionTitle>Steps</SectionTitle>
      <ol className="list-none mb-12">
        {steps.map((step, i) => (
          <li
            key={i}
            className="relative pl-10 py-4 border-b border-border text-[14px] leading-[1.7] font-light"
          >
            <span className="absolute left-0 top-4 text-[12px] text-accent font-medium tracking-[0.05em]">
              {String(i + 1).padStart(2, '0')}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </>
  );
}
