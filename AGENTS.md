# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Time Tracker is a front-end React web app for tracking time spent on multiple efforts. Built with Create React App, it allows users to manage multiple concurrent stopwatches with persistent state.

## Development Commands

- `npm start` - Run development server at http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build production bundle to `build/` folder
- `npm test -- --testNamePattern="test name"` - Run specific test by name
- `npm test -- formatDuration` - Run tests in specific file

## Architecture

### Component Hierarchy

- **App** (src/App.js) - Root component managing global stopwatch state and routing
  - Maintains stopwatch array in state via `useState`
  - Implements `tick()` function for updating running stopwatches every 100ms
  - Implements `updateStopwatchState()` higher-order function for immutable state updates
  - Restarts in-progress stopwatches from previous session on mount
  - Routes between main tracker and About page using react-router-dom HashRouter

- **StopwatchContainer** (src/StopwatchContainer.js) - Container for stopwatch list and controls
  - Renders list of Stopwatch components
  - Manages add/delete operations (Add button becomes Delete when stopwatches selected)
  - Implements reset all functionality
  - Displays throttled total duration across all stopwatches
  - Handles all stopwatch event callbacks (toggle, select, duration/label changes)

- **Stopwatch** (src/Stopwatch.js) - Individual stopwatch UI component
  - Displays checkbox for selection, editable duration/label inputs, and pause/resume button
  - Duration input only editable when paused
  - Passes all events up to parent via callback props

### State Management

Stopwatch objects contain:
- `id` - Unique identifier
- `startTime` - Timestamp when current session started
- `elapsedTime` - Cumulative milliseconds from all previous sessions
- `displayTime` - Current display value (updated every 100ms when running)
- `durationInputString` - Temporary storage for manual duration edits
- `label` - User-editable name
- `isPaused` - Running state
- `isSelected` - Selection state for deletion
- `timeoutId` - Interval ID for running stopwatches

### Persistence Layer

**src/stopwatchStorage.js** manages localStorage under key `'stopwatches'`:
- `getStopwatches()` - Load from localStorage (returns default single stopwatch if empty)
- `persistStopwatches(stopwatches)` - Save entire array
- `persistStopwatch(updatedStopwatch)` - Update single stopwatch
- `persistNewStopwatch(stopwatch)` - Add new stopwatch
- `removeStopwatch(stopwatch)` - Delete stopwatch

State is persisted after every change. On load, running stopwatches are restarted.

### Utility Functions

**Duration Formatting** (src/formatDuration.js):
- Converts milliseconds to `HH:mm:ss` string format

**Duration Parsing** (src/parseDuration.js):
- Converts `HH:mm:ss` string to milliseconds
- Validates format and throws errors for invalid input

Both utilities have corresponding test files (*.test.js).

## Key Patterns

- State updates use immutable patterns (map/spread operators)
- Callbacks passed down through props rather than context
- Running stopwatches use `setInterval` with cleanup via `clearInterval`
- Higher-order function pattern for state updates: `updateStopwatchState(stopwatch)` returns updater function
- Lodash throttle used for total duration display to reduce re-renders
