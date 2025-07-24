# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Elm Quiz application that has been migrated to React + TypeScript while maintaining backward compatibility with Elm. It's an exam/quiz platform that allows candidates to take programming tests with both text answers and code editing capabilities using Monaco Editor.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on the codebase

### Testing
No test framework is currently configured. Tests would need to be set up before implementation.

## Architecture Overview

### Hybrid Elm + React Architecture
- **Main.elm**: Original Elm application code (port module) that communicates with React via ports
- **App.tsx**: Main React application component managing state and UI
- **Integration**: Elm ports communicate with TypeScript controllers for Monaco Editor, syntax highlighting, and local storage

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
- Endpoints: `/getQuiz`, `/submitAnswer`, `/getQuizResult`, `/getQuizList`
- Error handling with user-friendly dialog messages

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
- Question navigation with automatic editor reinitialization

### Error Handling
- API errors caught and displayed via `simpleErrorDialog`
- HTTP error mapping with user-friendly messages
- Graceful fallbacks for missing data

### Component Communication
- Props-based data flow between React components
- Event handlers passed down for state updates
- Monaco Editor events bubble up through callback chain