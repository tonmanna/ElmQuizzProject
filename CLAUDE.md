# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript quiz application for programming exams. It allows candidates to take tests with both text answers and code editing capabilities using Monaco Editor. The platform supports role-based quizzes (Developer, Tester, Data Engineer, Product Owner) and includes an admin interface for viewing and managing results.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on the codebase

### Testing
- Jest is configured in package.json but no tests are currently implemented
- Test scripts would need to be added to package.json before running tests

## Architecture Overview

### React + TypeScript Architecture
- **App.tsx**: Main React application component managing all state and UI navigation
- **Types System**: Centralized TypeScript interfaces (`MainModel`, `QuestionModel`, `QuizResult`)
- **Controller Integration**: TypeScript controllers handle Monaco Editor, syntax highlighting, and API interactions

### Key Components Structure
- **StartBadge**: Initial exam entry screen with candidate ID input
- **Question**: Individual question display with Monaco Editor integration for code questions
- **FinishBadge**: Exam completion and submission interface
- **QuizList**: Admin interface for viewing quiz results (password protected)
- **DownloadLink**: Resource download section

### Data Flow
1. React App manages main application state (`MainModel`)
2. Questions fetched from remote API (`exam.itopplus.com` or localhost:4000)
3. Monaco Editor integrated for code questions with syntax highlighting
4. Answers stored in component state and submitted via API
5. Local storage used for persistence via helper utilities

### Controller Layer (`src/scripts/controllers/`)
- **monaco.ts**: Monaco Editor initialization and text retrieval
- **code_heighlight.ts**: Prism.js syntax highlighting for code blocks
- **submit_answer.ts**: Answer submission with success/error dialogs
- **change_answer.ts**: Answer change persistence to local storage

## Key Technical Details

### Dependencies
- **React 19** with TypeScript for modern UI
- **Monaco Editor** via `vite-plugin-monaco-editor-esm` for code editing
- **Vite** as build tool with legacy browser support
- **PrismJS** for syntax highlighting in read-only code displays
- **Mermaid** for diagram rendering
- **markdown-it** for markdown content rendering

### API Integration
- Base URL switches between `localhost:4000` (dev) and `https://exam.itopplus.com` (prod)
- Role-based quiz endpoints: `/getQuiz` (Developer), `/getTesterQuiz`, `/getDataEngineerQuiz`, `/getProductOwnerQuiz`
- Additional endpoints: `/submitAnswer`, `/getQuizResult`, `/getQuizList`, `/deleteQuizResult`
- Error handling with user-friendly dialog messages via `simpleErrorDialog`

### Monaco Editor Integration
- Dynamic container creation with unique IDs per question
- Language-specific syntax highlighting
- Text change detection with automatic state updates
- Proper cleanup and disposal between question navigation

### Build Configuration
- Output directory: `./dist`
- Manual chunk splitting for major dependencies (React, Monaco, Mermaid, etc.)
- TypeScript strict configuration with separate app/node configs
- ESLint with React hooks and TypeScript rules

## Development Patterns

### State Management
- Single `MainModel` interface centralizing all application state
- Immutable state updates with spread operator
- Question navigation with automatic editor reinitialization via `updateModel`

### Error Handling
- API errors caught and displayed via `simpleErrorDialog` 
- HTTP error mapping with user-friendly messages
- Graceful fallbacks for missing data

### Component Communication
- Props-based data flow between React components
- Event handlers passed down for state updates
- Monaco Editor events bubble up through callback chain with `onDidChangeContent`

### Key Features
- **Role Selection**: Support for Developer, Tester, Data Engineer, and Product Owner quiz types
- **Admin Functions**: Password-protected quiz list viewing and result deletion
- **Persistence**: Local storage integration for answer persistence
- **Monaco Integration**: Full code editor with syntax highlighting and change detection