import SectionTitle from '../utils/SectionTitle';

interface Props {
  ingredients: { item: string; amount: string }[];
}

export default function RecipeIngredientsList({ ingredients }: Props) {
  return (
    <>
      <SectionTitle>Ingredients</SectionTitle>
      <ul className="list-none mb-9">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex justify-between text-[14px] py-2 border-b border-border font-light"
          >
            <span>{ing.item}</span>
            <span className="text-text-light text-[13px]">{ing.amount}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
