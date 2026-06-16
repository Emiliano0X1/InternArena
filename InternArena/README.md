# InternArena - Frontend (Vite + React)

This is the web frontend repository for **InternArena**, a modern platform for competitive programming practices, matchmaking, and player stats tracking.

The client-side interface is built with **React 19**, bundled using **Vite 7**, and styled with **Material-UI (MUI v7)**, **Tailwind CSS v4**, and **Motion (Framer Motion v12)** for premium micro-animations and responsive dark-mode styling.

---

## 🚀 Getting Started (Development Server)

### Prerequisites

- **Node.js**: Version 18.0 or higher (v20 LTS is recommended).
- **npm** or **yarn** (npm is recommended).

### Installing Dependencies

Run the following command in the root of this frontend project directory:

```bash
npm install
```

### Running the Development Server

To boot the local development environment:

```bash
npm run dev
```

The web application will boot and be accessible at **`http://localhost:5173`** (or the port specified by Vite in the console).

### Other Build Scripts

- **`npm run build`**: Compiles and bundles optimized assets for production in the `dist/` directory.
- **`npm run preview`**: Runs a local web server to preview the production-build assets.
- **`npm run lint`**: Executes ESLint to check for code issues.

---

## 📁 Project Structure

The frontend code and assets are structured inside the `src/` directory:

```text
InternArena/
├── src/
│   ├── assets/                 # Custom images, fonts, and icons
│   ├── components/             # Reusable global UI components (e.g., Popup.jsx)
│   ├── screens/                # Screen-level route components
│   │   ├── LandingPage/        # Main landing page view
│   │   ├── Login/              # User Authentication Login view
│   │   ├── MatchConfig/        # Setup config for competitive matches
│   │   ├── MatchPage/          # Real-time programming arena/match lobby
│   │   ├── Register/           # User Sign Up view
│   │   └── Store/              # Theme / cosmetic purchases store
│   ├── App.jsx                 # Central router file (React Router DOM v7)
│   ├── main.jsx                # Application bootstrapper (wraps MUI Theme & BrowserRouter)
│   ├── theme.js                # Custom MUI v7 Dark Theme configuration
│   └── index.css               # Global stylesheets importing Tailwind CSS v4
├── index.html                  # HTML template entrypoint
├── vite.config.js              # Vite compiler config (Tailwind & React plugins)
├── eslint.config.js            # Linter rules configuration
└── package.json                # Project dependencies and script declarations
```

---

## 🎨 Theme & Design System

The layout follows a curated, premium dark mode aesthetic:
- **Base Background**: `#282424` (soft dark brown-gray).
- **Surface Panels**: `#383434` (lighter brown-gray).
- **Primary Color**: `#f97316` (vibrant primary orange).
- **Typography**: Configured with the **"Outfit"** Google Font for a modern look.
- **UI Styling**: Combines Material-UI elements with customized border-radiuses (`borderRadius: 14px` for buttons, `18px` for modal dialogs) and Tailwind utility classes.
- **Animations**: Uses **Motion (Framer Motion v12)** for interactive micro-animations.

---

## 🛠️ Implementation Example for Developers

To add a new screen (e.g., **Stats view**) to this frontend, follow these guidelines:

### Step 1: Create the Screen Folder and Component
Create a new directory named `Stats` inside `src/screens/` and add the component:
**File path:** `src/screens/Stats/Stats.jsx`

```jsx
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "motion/react"; // Motion v12 import
import { FiChevronLeft, FiBarChart2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function StatsView() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-[#282424] text-white flex flex-col p-6 items-center">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex items-center justify-between mb-8"
      >
        <Button 
          variant="text" 
          startIcon={<FiChevronLeft />} 
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white"
        >
          Back
        </Button>
        <Typography variant="h5" className="font-extrabold flex items-center gap-2">
          <FiBarChart2 className="text-[#f97316]" /> Performance Stats
        </Typography>
        <Box className="w-12" /> {/* Layout balancer */}
      </motion.div>

      {/* Animated Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Paper className="bg-[#383434] p-8 rounded-[18px] border border-zinc-700 flex flex-col gap-4 text-white shadow-xl">
          <Typography variant="h6" className="text-[#f97316] font-bold">
            Player Record
          </Typography>
          <Box className="flex justify-between border-b border-zinc-700 pb-3">
            <Typography className="text-gray-400">Wins</Typography>
            <Typography className="font-bold">42 Matches</Typography>
          </Box>
          <Box className="flex justify-between border-b border-zinc-700 pb-3">
            <Typography className="text-gray-400">Losses</Typography>
            <Typography className="font-bold">18 Matches</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography className="text-gray-400">Win Rate</Typography>
            <Typography className="font-bold text-green-400">70.0%</Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
```

### Step 2: Register the New Route
Open `src/App.jsx` and import your new component, then register its route path:
**File path:** `src/App.jsx`

```diff
 import LandingPage from "./screens/LandingPage/LandingPage"
 import MatchConfig from "./screens/MatchConfig/MatchConfig"
 import Login from "./screens/Login/Login"
 import Register from "./screens/Register/Register"
 import MatchPage from "./screens/MatchPage/MatchPage";
 import StoreView from "./screens/Store/Store";
+import StatsView from "./screens/Stats/Stats";
 
 function App() {
   return (
     <div>
       {/* Routes */}
       <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/match" element={<MatchConfig />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/register" element={<Register/>} />
         <Route path="/matchpage" element={<MatchPage/>} />
         <Route path="/store" element={<StoreView/>}/>
+        <Route path="/stats" element={<StatsView/>}/>
       </Routes>
     </div>
   );
 }
```
