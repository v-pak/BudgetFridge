# BudgetFridge
Demo at [https://budget-fridge-seven.vercel.app](https://budget-fridge-seven.vercel.app).

A recipe generation app that takes the ingredients in your fridge and uses the Gemini API to suggest recipes you can cook right now.

![BudgetFridge UI](https://raw.githubusercontent.com/v-pak/BudgetFridge/main/src/frontend/budget-fridge/public/favicon.svg)

---

## What it does

1. Add ingredients and quantities from your fridge on the landing page
2. Select which ingredients to include (with a select-all toggle)
3. Hit **Generate Recipes** — the app calls Gemini and returns 5 recipe suggestions
4. Browse the results, cycle through them, and save the ones you want
5. Revisit saved recipes anytime on the **My Recipes** page

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + TypeScript, Vite, TailwindCSS v4 |
| Backend | Node.js, Express 5, TypeScript, tsx |
| AI | Google Gemini 2.5 Flash via `@google/genai` |
| Schema validation | Zod |
| Routing | React Router v7 |
| Persistence | localStorage |

---

## Project structure

```
BudgetFridge/
├── src/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.ts       # Express server, /api/recipes endpoint
│   │   │   ├── ai.ts           # Gemini API integration
│   │   │   └── interfaces.ts   # Zod schemas for request/response
│   │   ├── config.json
│   │   └── package.json
│   └── frontend/
│       └── budget-fridge/
│           └── src/
│               ├── api/            # fetchRecipes()
│               ├── components/
│               │   ├── home/       # Landing page components
│               │   ├── my-recipes/ # Saved recipes components
│               │   ├── recipe/     # Recipe page components
│               │   └── utils/      # NavBar, PillButton, SectionTitle
│               ├── context/        # RecipeContext + RecipeProvider
│               ├── pages/          # HomePage, LoadingPage, RecipePage, MyRecipesPage
│               └── utils/          # types, storage, cardGradient
```

---

## Getting started

### Prerequisites

- Node.js 20+
- A Gemini API key ([get one here](https://aistudio.google.com/))

---

### Backend

```bash
cd src/backend
npm install
```

Create a `.env` file in `src/backend/`:

```
GEMINI_API_KEY=your_key_here
PORT=3200
```

Start the server:

```bash
npm run dev
```

The server runs at `http://localhost:3200`.

---

### Frontend

```bash
cd src/frontend/budget-fridge
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend at port 3200 (configured in `vite.config.ts`).

---

## API

### `POST /api/recipes`

**Request body:** array of ingredient objects

```json
[
  { "name": "chicken thighs", "quantity": "500g" },
  { "name": "garlic", "quantity": "4 cloves" }
]
```

**Response:** array of 5 recipe objects

```json
[
  {
    "name": "string",
    "imageDescription": "string",
    "description": "string",
    "ingredients": [{ "item": "string", "amount": "string" }],
    "cookTime": "string",
    "serves": "string",
    "steps": ["string"]
  }
]
```

---

## Key features

**Ingredient selection** — checkboxes on each item with a select-all/deselect-all toggle. Only selected ingredients are sent to the API.

**Recipe generation** — navigates to a loading screen immediately while the API call runs in the background, then redirects to the recipe page on success.

**Save & revisit** — recipes are serialised to `localStorage` under `savedRecipes`. Duplicate saves are prevented. The My Recipes page loads from localStorage with a card grid, popup detail view, and delete capability.

**Persistent fridge** — the ingredient list survives page refreshes via `localStorage` under `fridgeItems`.

---

## Design

Fonts: **Averia Serif Libre** (headings) + **Noto Sans** (body)

Colour palette:

| Token | Hex |
|---|---|
| `bg` | `#F5F2ED` |
| `bg-warm` | `#EDE9E1` |
| `text` | `#2C2824` |
| `text-light` | `#8A8279` |
| `accent` | `#C4463A` |
| `border` | `#D6D0C7` |
| `card-bg` | `#FAFAF7` |

Film grain overlay on `body::before`. All buttons use 24px border-radius; inputs use 12px.

---

## Local storage keys

| Key | Contents |
|---|---|
| `fridgeItems` | Current ingredient list |
| `savedRecipes` | Saved recipe objects |

