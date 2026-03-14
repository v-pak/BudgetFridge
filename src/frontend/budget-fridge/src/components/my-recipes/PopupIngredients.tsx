import SectionTitle from '../utils/SectionTitle';

interface PopupIngredientsProps {
  ingredients: { item: string; amount: string }[];
}

export default function PopupIngredients({ ingredients }: PopupIngredientsProps) {
  return (
    <>
      <SectionTitle>Ingredients</SectionTitle>
      <ul className="list-none mb-6">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex justify-between text-[13px] py-[7px] border-b border-border font-light font-body"
          >
            <span className="text-text">{ing.item}</span>
            <span className="text-text-light text-[12px]">{ing.amount}</span>
          </li>
        ))}
      </ul>
    </>
  );
}