## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Modern web browser

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd bridge
```

## Install Dependencies and Run Developer Server

-Install dependences :- pnpm install

-Run developer server :- pnpm dev

## Build for Production and Run

- pmpm build
- pnpm preview

## Folder Structure Explanation

```
src/
├── api/ # API layer functions and url are bundled in object for specific contents such as user (CRUD)
│ ├── functions/ # API function implementations
│ │ ├── auth/ # Authentication API calls
│ │ └── user/ # User CRUD API calls
│ ├── hooks/ # React Query custom hooks
│ │ ├── auth/ # Auth mutation hooks
│ │ └── user/ # User query/mutation (CRUD) hooks
│ └── urls/ # API endpoint definitions
│   ├── auth/
│   └── user/
├── components/ # React components
│ ├── commons/ # Reusable components
│ │ ├── custom-button/ # Button variants (From Submit with disable and loading, Pagination)
│ │ ├── custom-modal/ # Modal wrapper component
│ │ ├── delete-dailog/ # Delete confirmation dialog
│ │ ├── formik/ # Formik input components contains Input and Password Input
│ │ ├── search-input/ # Search input with debounce
│ │ └── tool-tip/ # Tooltip component
│ ├── data-table/ # Table components
│ │ ├── render-row.tsx # Table rendering logic
│ │ └── view-options.tsx # Column visibility controls
│ ├── form/ # Form components
│ │ ├── login-form/ # Login form
│ │ └── user-form/ # User create/edit form handle in single file
│ ├── home/ # Home page specific components
│ │ └── user-table.tsx # Main user table component
│ ├── layout/ # Layout components
│ │ ├── app-sidebar.tsx # Application sidebar
│ │ ├── header.tsx # Header component
│ │ └── layout.tsx # Root layout wrapper
│ ├── not-found/ # 404 page component
│ └── ui/ # shadcn/ui components
│ └── ... # Button, Dialog, Input, Table, etc.
├── config/ # Application configuration
│ └── config.ts # Environment variable validation
├── constants/ # Application constants all imported from single index.ts
│ ├── formError-message.constant.ts
│ ├── general-constant.ts
│ ├── notification-message.constant.ts
│ ├── query-key.constant.ts
│ ├── route.constant.ts
│ └── sidebar-navigation.constant.ts
├── hooks/ # Custom React hooks
│ ├── use-debounce.ts # Debounce hook
│ ├── use-mobile.ts # Mobile detection hook
│ ├── query-params/ # URL query parameter hooks
│ │ ├── use-pagination.ts # Pagination state in URL
│ │ └── use-search.ts # Search state in URL
│ └── table-columns/ # Table column definitions
│ └── use-user-table-column.tsx
├── interface/ # TypeScript interfaces/types all imported from single index.ts
│ ├── error-status-http.enum.ts
│ ├── form-error-message.interface.ts
│ ├── general-constant.interface.ts
│ ├── login-response.interface.ts
│ ├── meta-data.interface.ts
│ ├── navigation.interface.ts
│ ├── response/ # API response types
│ └── user/ # User related types
├── lib/ # Utility libraries
│ └── utils.ts # Helper functions (cn, etc.)
├── pages/ # Page components
│ ├── home/ # Home/Dashboard page
│ └── login/ # Login page
├── providers/ # Context providers or any global providers
│ └── react-query-provider.tsx # TanStack Query setup
├── routes/ # Routing configuration
│ ├── auth-gaurd.tsx # Protected route wrapper
│ └── index.tsx # Route definitions
├── schema/ # Zod validation schemas
│ ├── login-schema.ts
│ └── user-schema.ts
├── services/ # Core services
│ └── api-request.ts # Axios instance with interceptors
├── store/ # Zustand state stores
│ ├── use-auth-store.ts # Authentication state
│ ├── use-dailog-store.ts # Delete dialog state
│ ├── use-delete-user-store.ts # Deleted users tracking
│ ├── use-modal-store.ts # Modal state (content, visibility)
│ └── use-user-store.ts # User list optimistic updates
├── utils/ # Utility functions
│ ├── error-message.ts # Error message formatting
│ ├── filter-user-api.ts # User filtering logic
│ ├── query-params-builder.ts # URL query builder
│ └── toast-notification.ts # Toast notification helpers
├── App.tsx # Root component
├── main.tsx # Application entry point
└── index.css # Global styles

```

### State Management Decisions

# For URL state management nuq is used.

## React Query for server state manegement :-

- All the server state are placed inside api -> hooks. Make use of react query for out of box server states such as isPending, error, caching and
  success state

# useQuery to fetch data

- useQuery hook is being used for fetching data, queryKey gets url params from custom hook like limit, skip and q for refetch when any of these change.
- After data fetching the data gets filtered out to remove deleted user that has been stored in the local storage.
- The data is stored in the zustand store use-user store afterward to perform optimistic UI update since dummy json doesn't actually updates it's server and database.
- From this hook returns users from zustand store and isPending state.

# useMutation to perform patch, delete and create.

- once data is refeched optimistic UI update for create and update is reseted. zustand store is used for this not react optimistic hook.

# Actions performed in onSuccess

- In case of delete use-delete store is being used to store the id of deleted users in local store to mimic the condition have it been the actual database.
- The deleted userId is added to the user store and deleted user store.
- In all the cases of useMutation in onSuccess the zustand store is being update to show optimistic UI update when creating, deleting and editing user.
- The modal that gets open for creation, delete and edit is being closed after the success right here except for create user to allow adding multiple user in single modal open.
- successNotification toast is shown here.

# Actions performed in onError

- errorNotification is being shown and close the opened modal or dailog.

## Zustand Client state management

# use-auth-store

- This store is used to store and persist the user data we get after login.
- Additionally isAuthenticated boolean and logout for removing user data and clearing localStorage.
- allows us to recieve user and isAuthenticated data from any where in app.

# use-dailog-store

- This store is used to open , close and store Id with respect to which dailog is being open mainly used to delete user.
- The store contains the state for open and id
- This store allows us to reduce redundant code as we have dailog set in base of route as soon as the values are set the delete dailog is open
  also allows for same delete dailog to be re-useable for other purpose not just delete user.

# use-delete-store

- This store is used to store userIds and persist this user id's just to mimic the real api case so that when the refetch is done the deleted users
  can be filter out.

# use-modal-store

- This store is used to openModal , close , title, type, userId, content set dynamic content for modal which is type ReactNode allowing the modal to be used for multi-purpose
- The type of modal is set to create or upadate or undefined for multi use case.
- This modal closes when the user is updated onSuccess of update but not for create user to allow multiple addition of user.
- This modal store is used to make custom modal reuseable for any case.

# use-user-store

- This store is used to addUser, updateUser, removeUser, setUser, setTotal , clearUsers and get all users.
- The main purpose of this modal is to show optimisitic UI update for create and edit user.
