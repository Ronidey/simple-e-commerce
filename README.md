# Simple E-Commerce

A modern e-commerce frontend application built with React JS.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ronidey/simple-e-commerce.git
```

### 2. Navigate to the Project Folder

```bash
cd simple-e-commerce
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

---

# Tech Stack

- React JS
- TypeScript
- Vite
- React Context API
- useReducer Hook

---

# Assumptions Made

- `"Price Range"` and `"Brands"` filters are implemented client-side since the API does not provide filtering support for them.

- `"Categories"` is implemented as a server-side filter.

- Categories are treated as a single-select filter based on the API structure and the fact that each product belongs to only one category.

- No need to add Search field in the sidebar because it has no use

- Pagination was not added to the product details page because it was unnecessary for that view.

- CTA buttons in the header are implemented for UI purposes only.

---

# Architectural Decisions

## Why React JS ?

I chose React JS for this project because component reusability and UI flexibility were more important than SEO requirements.

For applications where SEO is critical, I would prefer using Next.js.

---

## State Management

Global state management is handled using:

- React Context API
- useReducer Hook

This setup keeps the architecture lightweight and avoids unnecessary complexity for the current project scope.

For larger-scale applications with more complex async flows, I would consider solutions like:

- Redux Toolkit
- Zustand
- React Query

---

# Project Structure

```bash
src/
  |-- assets
  |-- components
  |-- constants
  |-- layouts
  |-- lib
  |-- navigation
  |-- pages
  |-- services
  |-- store
  |-- types
```

## Folder Responsibilities

### components

Contains reusable UI components shared across the application.

### pages

Contains page-level components and route-based views.

### services

Contains API-related logic and service functions.

### store

Contains global state management logic.

### layouts

Contains reusable layout wrappers.

### constants

Stores reusable constants and configuration values.

### lib

Contains utility/helper functions.

### types

Contains TypeScript type definitions.

---

# Component Organization

Reusable components are stored inside the `components` directory.

Components tightly coupled to a specific page are colocated with that page.

For example:

- `Products`
- `Sidebar`

exist inside the Home page directory because they are only used there.

This keeps the project structure easier to navigate and maintain.

---

# Improvements (If Given More Time)

- Implement the search feature with proper backend/API support.

- Improve sidebar responsiveness by creating dedicated mobile and desktop sidebar variants.

- Add image zoom functionality on the product details page.

- Create a more polished UI for the "Page Not Found" screen.
