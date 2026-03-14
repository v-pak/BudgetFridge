import { Link, useNavigate, useLocation } from 'react-router-dom';
import PillButton from './PillButton';

/**
 * NavBar
 *
 * Fixed top navigation bar used on every page of BudgetFridge.
 *
 * Layout:
 *  - Left:  Logo in Averia Serif Libre, links to /
 *  - Right: Context-aware action button
 *    • On /my-recipes → "← Back" (navigates to previous page or /)
 *    • All other pages → "My Recipes" (links to /my-recipes)
 *
 * Design spec (Section 4.6, BF-001):
 *  - Fixed top bar, full width
 *  - Logo: Averia Serif Libre, 26px, font-weight 600
 *  - Button: PillButton (outlined variant), 24px border-radius
 *  - Bottom border: 1px solid var(--border)
 *  - Background: var(--bg) — same warm off-white as the page
 */
export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMyRecipes = location.pathname === '/my-recipes';

  function handleBack() {
    navigate(-1);
  }

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-12 py-5
        bg-bg border-b border-border
      "
      aria-label="Main navigation"
    >
      {/* ── Logo ── */}
      <Link
        to="/"
        className="
          font-heading text-[26px] font-semibold tracking-[-0.5px]
          text-text no-underline
          transition-opacity duration-200 hover:opacity-70
        "
        aria-label="BudgetFridge — go to home"
      >
        BudgetFridge
      </Link>

      {/* ── Right action ── */}
      {isMyRecipes ? (
        <PillButton
          variant="outlined"
          onClick={handleBack}
          aria-label="Go back to previous page"
        >
          ← Back
        </PillButton>
      ) : (
        <PillButton
          variant="outlined"
          onClick={() => navigate('/my-recipes')}
          aria-label="View your saved recipes"
        >
          My Recipes
        </PillButton>
      )}
    </nav>
  );
}