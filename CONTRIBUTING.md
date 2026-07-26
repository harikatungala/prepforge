# 🤝 Contributing to PrepForge

## Development Workflow

PrepForge is built incrementally in **phases**. Each phase is a complete, testable milestone.

### Phase-Based Development

1. **One Phase at a Time** - Complete, test, and understand the current phase before moving to the next
2. **Clear Checkpoints** - Each phase has a checklist to verify everything works
3. **Learning First** - Understanding > Speed
4. **Small Tasks** - Each task takes 20-60 minutes

## Git Workflow

### Branch Naming Convention

```
main                    # Production-ready code
└── phase-1             # Feature branch for Phase 1
    └── phase-1-task-1  # Sub-branch for specific task
```

### Commit Message Convention

Follow conventional commits:

```
type(scope): subject

feat(auth): add JWT token generation
fix(resume): handle PDF parsing errors
docs(setup): add installation instructions
chore(deps): update npm packages
refactor(api): simplify user endpoint
test(backend): add authentication tests
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, missing semicolons, etc)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Tests
- `chore` - Maintenance tasks

### Commit Workflow

```bash
# Create feature branch
git checkout -b phase-1

# Make changes
git add .
git commit -m "feat(setup): initialize project structure"

# Push to GitHub
git push origin phase-1

# Create Pull Request on GitHub
# After review, merge to main
```

## Code Style Guide

### Python (Backend)

```python
# Follow PEP 8
# - 4 spaces for indentation
# - max line length 88 characters
# - snake_case for functions and variables
# - PascalCase for classes

def get_user_by_id(user_id: int) -> User:
    """Get a user by their ID."""
    return db.query(User).filter(User.id == user_id).first()


class UserRepository:
    """Handles all user database operations."""
    
    def create(self, user: UserSchema) -> User:
        """Create a new user."""
        pass
```

### JavaScript/React (Frontend)

```javascript
// Follow standard React conventions
// - camelCase for variables and functions
// - PascalCase for components
// - Meaningful component names

function UserProfile({ userId }) {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
    </div>
  );
}
```

## Project Structure

```
prepforge/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── database/
│   ├── init.sql
│   └── README.md
│
├── docs/
│   ├── PHASES.md
│   ├── ARCHITECTURE.md
│   └── SETUP.md
│
└── README.md
```

## Phase Checklist Template

Each phase should have a checklist like this:

### Phase X Checklist

- [ ] All code written
- [ ] All tests passing
- [ ] No console errors
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Ready for next phase

## Testing

### Before Committing

1. **No console errors** - Check browser console and terminal
2. **Functionality works** - Test all features manually
3. **No broken links** - Verify all routes and endpoints
4. **Code quality** - Review your own code first

## Documentation

Each phase should include:

1. **README.md** - In the feature folder (frontend, backend, etc)
2. **Code comments** - For complex logic
3. **Docstrings** - For functions and classes
4. **API documentation** - For backend endpoints

## Reporting Issues

When you encounter bugs or problems:

1. **Describe the issue clearly**
2. **Include error messages or screenshots**
3. **List steps to reproduce**
4. **Mention your environment** (OS, browser, versions)

## Questions?

- Check existing documentation first
- Review phase instructions
- Check previous phases for similar patterns
- Ask in discussions or issues

---

**Happy contributing! 🚀**
