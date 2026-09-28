# Project: InternArena / LeetArena Frontend

## Tech Stack
- **Framework & Core**: React 19 + Vite 7 (JavaScript / JSX)
- **UI & Components**: Material-UI v7 (MUI) + Emotion
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Tokens
- **Animations**: Motion (Framer Motion v12)
- **Icons**: React Icons (`react-icons/fi`, `react-icons/fa`, etc.) + MUI Icons
- **State & Data Fetching**: TanStack React Query v5
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Auth & Realtime**: Supabase JS Client

## Design System & Theme
- **Base Background**: `#282424` (dark brown-gray)
- **Surface / Cards**: `#383434` (lighter brown-gray)
- **Primary Color**: `#f97316` (vibrant orange)
- **Typography**: Google Font "Outfit"
- **Border Radius**: `14px` for buttons, `18px` for cards & dialogs
- **Aesthetic**: Premium dark mode, fluid micro-animations with Motion, rich interactive states, and modular layouts.

## Project Structure
- `src/assets/`: Static media, logos, gifs, videos, and custom icons.
- `src/components/`: Reusable global UI components across screens (e.g., `Popup.jsx`, `Navbar.jsx`).
- `src/constants/`: Predefined static values, base URLs, fixed options, and lookup dictionaries.
- `src/context/`: Global React Context providers for multi-screen state and user flows.
- `src/hooks/`: Custom hooks wrapping TanStack Query (`useQuery`, `useMutation`) with proper error and edge case handling.
- `src/screens/{ScreenName}/`: Main route page components.
- `src/screens/{ScreenName}/components/`: Modular sub-components dedicated specifically to this screen.
- `src/services/`: API endpoint integrations using Axios with centralized error handling.
- `src/utils/`: Pure helper functions, formatters, validation utilities, and math calculations.
- `src/theme.js`: Centralized Material-UI custom theme configuration.

## Architecture Rules
1. **Separation of Concerns**:
   - Views and components must **never** invoke Axios directly. They must consume custom hooks from `src/hooks/`.
   - Custom hooks consume services from `src/services/`.
   - All API connections and endpoint URLs reside in `src/services/`.
2. **Modularity (200-Line Rule)**:
   - If any Screen or Component exceeds ~200 lines of code, split it into smaller sub-components inside its local `components/` directory.
3. **Global Flows**:
   - Use React Context for data that spans across multiple screens (e.g., Auth, Match session).
4. **UI State Handling**:
   - All asynchronous operations must explicitly manage and display `isLoading` (Skeletons/Spinners), `isError` (feedback banners/toasts), and `isEmpty` (Empty states).

## Naming Conventions
- **Components & Screens**: `PascalCase.jsx` (e.g., `MatchPage.jsx`, `PlayerCard.jsx`).
- **Custom Hooks**: `camelCase.js` prefixed with `use` (e.g., `useMatchLobby.js`, `useAuth.js`).
- **Services**: `camelCase.js` suffixed with `Service` (e.g., `authService.js`, `matchService.js`).
- **Contexts**: `PascalCaseContext.jsx` (e.g., `AuthContext.jsx`, `MatchContext.jsx`).
- **Constants**: `camelCase.js` for filenames; `SCREAMING_SNAKE_CASE` for exported constants.
- **Screen Folders**: `PascalCase` (e.g., `src/screens/MatchConfig/`).

## Strict Prohibitions
- ❌ **Do not write code** until the user explicitly approves the proposed plan.
- ❌ **Do not create monolithic views** exceeding 200 lines without modularizing.
- ❌ **Do not use hardcoded inline styles** when Tailwind utility classes or the MUI theme should be used.
- ❌ **Do not break the dark theme palette** or override the global "Outfit" font styling.
- ❌ **Do not introduce TypeScript** unless explicitly requested by the user (this codebase is JavaScript/JSX).

## Common Commands
- `npm run dev`: Starts the local development server (Vite).
- `npm run build`: Bundles the production-ready application into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code issues and syntax errors.

## Custom Agent Steering Commands
- `/load-project`: Reads `README.md`, `endpoints_reference.md`, and `.AGENTS/WORKLOG.MD`. Summarizes current project status, ongoing tasks, and next steps without writing code.
- `/brainstorm [topic]`: Starts a collaborative brainstorming and UI/UX design session before proceeding with implementation.
- `/review-code`: Reviews newly written code with a strict senior developer mindset: edge cases, modularity (<200 lines), API error handling, accessibility, and visual theme adherence.
- `/new-feature [description]`: Generates a structured implementation plan. Once approved, implements: Services -> Hooks (TanStack Query) -> Modular Components -> Screen Integration.
- `/fix-bug [description]`: Executes systematic debugging: 1) Probable cause, 2) Impacted files, 3) Minimal required fix without touching unrelated code.
- `/update-worklog`: Updates `.AGENTS/WORKLOG.MD` at the end of the session with dates, completed tasks, in-progress items, and blockers.
- `/agent [role]`:
  - `frontend`: Expert in UI/UX, Motion animations, responsiveness, and React 19 modularity.
  - `qa`: Generates test cases, handles edge cases in forms, and tests API responses.
  - `security`: Checks for secure storage of tokens, JWT management, and input sanitization.
