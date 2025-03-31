# Forsaken Site

A modern web application that allows users to interact with and analyze data through SQL queries. The application provides a user-friendly interface for managing data sources, writing SQL queries, and visualizing query results.

## Features

- Import and manage multiple data sources
- Monaco-based SQL editor with syntax highlighting
- Query execution capabilities using mock data
- Save queries and update them
- Tabular display of query results with simple pagination
- Export functionality for results

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Styled Components
- **Code Editor**: Monaco Editor
- **Icons**: React Icons
- **Profiling**: React Scan

## Project Structure

```
src/
├── components/
│   ├── DatasourceSection/    # Data source management UI
│   ├── QueryEditor/         # SQL query editor component
│   ├── QueryResultViewer/   # Query results display
│   └── ui/                  # Reusable UI components
├── stores/
│   ├── datasource.store.ts  # Data source state management
│   └── queries.store.ts     # Query state management
├── utils/
│   ├── dataLoader.ts       # Data loading utilities
│   ├── export.ts          # Export functionality
│   └── query.ts           # Query execution utilities
└── App.tsx                # Main application component
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd forsaken-site
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run scan` - Run development server with profiling tools from react-scan

## Usage

1. **Managing Data Sources**

   - Use the "Add Data Source" button to import or configure your data sources
   - View your datasource in a table view with pagination

2. **Writing Queries**

   - Use the SQL editor to write and execute queries
   - User can save queries for easy access in future using "Save Query" button
   - User can edit saved queries using the same button

3. **Viewing Results**
   - Query results are displayed in a tabular format with pagination
   - Export results to csv file using "Export" button
   - Shows a dummy execution time for query

## Thanks

Thank you for checking out this project!

Happy querying! 🚀
