# InternArena
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Emiliano0X1/InternArena)

InternArena is a web application where users can compete in LeetCode-style programming tournaments. It features user authentication, lobby creation, live matches, and a user dashboard to track progress and rankings.

## Features

-   **User Authentication:** Securely register and log in to your account.
-   **Dashboard:** A central hub showing active matches, recent user rankings, and a social feed.
-   **Match Creation:** Create custom match lobbies by configuring:
    -   Problem difficulty (Easy, Medium, Hard)
    -   Match start time
    -   A custom prize for the winner
    -   Specific problem topics (coming soon)
-   **Live Matches:** Join matches and compete against other users in a timed environment. Track your progress on a set of LeetCode problems.
-   **Profile Stats:** Your personal profile displays key metrics like your LeetCode ranking, total match wins, and "Leetcoins" balance.
-   **Cosmetic Shop:** A section to view and select cosmetic items (work in progress).

## Tech Stack

-   **Frontend Framework:** React with Vite
-   **Styling:** Tailwind CSS, Material-UI (MUI), Emotion
-   **Routing:** React Router
-   **Animation:** Motion
-   **Code Quality:** ESLint

## Project Structure

The application's source code is organized as follows:

```
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable components shared across the application (e.g., Popup)
├── screens/        # Top-level components representing application pages
│   ├── LandingPage/
│   ├── Login/
│   ├── MatchConfig/
│   ├── MatchPage/
│   ├── Register/
│   └── Store/
├── App.jsx         # Main application component with routing setup
├── main.jsx        # Entry point of the React application
└── index.css       # Global styles and Tailwind CSS imports
```

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v18 or later)
-   npm

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/emiliano0x1/internarena.git
    ```

2.  Navigate to the project directory:
    ```sh
    cd internarena/InternArena
    ```

3.  Install the required dependencies:
    ```sh
    npm install
    ```

4.  Start the development server:
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode with hot-reloading.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the codebase using ESLint to check for errors and style issues.
-   `npm run preview`: Serves the production build locally to preview the final application.
