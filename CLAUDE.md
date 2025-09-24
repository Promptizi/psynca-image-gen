# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React-based image generation application built with Vite and TypeScript, utilizing Supabase as the backend service.

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack React Query for server state
- **Routing**: React Router v6
- **Backend**: Supabase (authentication, database)
- **Forms**: React Hook Form with Zod validation

### Key Directory Structure

- `src/pages/` - Main application pages (Home, Generate, Gallery, Credits, Profile)
- `src/components/ui/` - Reusable UI components from shadcn/ui
- `src/integrations/supabase/` - Supabase client configuration and types
- `src/lib/` - Utility functions and shared logic
- `src/hooks/` - Custom React hooks

### Architecture Patterns

**Page-Based Routing**: The app uses React Router with distinct pages for different features:
- Home (`/`) - Landing page
- Generate (`/generate`) - Image generation interface
- Gallery (`/gallery`) - View generated images
- Credits (`/credits`) - Credit management
- Profile (`/profile`) - User profile management

**Component System**: Built on shadcn/ui components with consistent theming via CSS variables defined in Tailwind config. All UI components follow the shadcn/ui patterns with Radix UI primitives.

**Supabase Integration**: Centralized in `src/integrations/supabase/` with:
- `client.ts` - Supabase client instance with auth configuration
- `types.ts` - Database type definitions

**State Management**: Uses TanStack React Query for server state management, configured globally in App.tsx.

### Styling System

Uses Tailwind CSS with a comprehensive design system including:
- CSS custom properties for colors and theming
- Custom animations (glow-pulse, slide-up, fade-in)
- Gradient backgrounds and glow effects
- Dark mode support via `next-themes`

### Configuration

- **Path Aliases**: `@/*` maps to `src/*` for cleaner imports
- **TypeScript**: Relaxed configuration with disabled strict checks
- **ESLint**: Standard React/TypeScript setup with unused vars disabled
- **Vite**: Configured with React SWC plugin and development tagging

The project appears to be a Lovable.dev generated application with Supabase backend integration for building an image generation platform.