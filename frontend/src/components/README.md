# Frontend Components

Reusable React components for the application.

## Available Components

### Button
Reusable button component with variants (primary, secondary, danger)

```jsx
import { Button } from './Button'

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

### Input
Reusable form input component with validation

```jsx
import { Input } from './Input'

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### Card
Reusable card component for content containers

```jsx
import { Card } from './Card'

<Card className="p-4">
  Card content here
</Card>
```

### ProtectedRoute
Route wrapper for authentication-protected pages

```jsx
import { ProtectedRoute } from './ProtectedRoute'

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## Adding New Components

1. Create a new `.jsx` file in this directory
2. Export the component as a named export
3. Add documentation in this README
4. Use in pages or other components
