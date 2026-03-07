# CLAUDE.md

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- Pour energy into the plan so Claude can 1-shot the implementation
- For high-stakes plans: write the plan, then review it as a staff engineer before executing

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution
- Spin up 3–5 parallel sessions across git worktrees for maximum throughput

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project
- When corrected, end with: "Update CLAUDE.md so you don't make that mistake again"

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how
- Point Claude at docker logs, error traces, or Slack threads and just say "fix"

## Task Management

1. **Plan First:** Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to `tasks/todo.md`
6. **Capture Lessons:** Update `tasks/lessons.md` after corrections

## Architecture & Code Quality

### Clean Architecture
- Follow clean architecture patterns with clear separation between layers
- Domain logic should be independent of frameworks, UI, and external concerns
- Dependencies should point inward toward the domain

### Separation of Concerns
- Each module/class should have a single, well-defined responsibility
- Avoid mixing business logic with presentation or data access concerns
- Keep related functionality together, unrelated functionality apart

### Dependency Injection & Inversion of Control
- Depend on abstractions, not concretions
- Use dependency injection to provide dependencies rather than creating them
- Make dependencies explicit through constructor parameters or function arguments
- Favor composition over inheritance

### Code Readability & Maintainability
- **NO COMMENTS ALLOWED** — Code should be self-documenting
- If logic seems complex enough to need a comment, extract it into a well-named function
- Use descriptive variable and function names that clearly express intent
- Avoid magic numbers — use named constants with clear purpose
- Functions should do one thing and do it well
- Keep functions small and focused

### Naming Conventions
- Variables and functions should clearly express their purpose and behavior
- Prefer longer, descriptive names over short, cryptic ones
- Function names should describe what they do, not how they do it
- Boolean variables should be clearly questions (isValid, hasPermission, canAccess)

### Code Organization
- Group related functionality together
- Use consistent file and folder structure
- Keep public interfaces minimal and well-defined
- Hide implementation details behind clear abstractions

## Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Changes should only touch what's necessary. Avoid introducing bugs.

## Implementation Guidelines

### When Writing New Code
1. Identify the core business logic and keep it pure
2. Define clear interfaces for external dependencies
3. Use dependency injection for all external services
4. Write self-documenting code with clear naming
5. Extract complex logic into well-named functions
6. Avoid direct coupling between unrelated modules

### When Refactoring
1. Identify violations of single responsibility principle
2. Extract mixed concerns into separate modules
3. Replace magic numbers with named constants
4. Rename unclear variables and functions
5. Remove any existing comments by making code self-explanatory
6. Introduce abstractions for external dependencies

## Skills & Automation

- If you do something more than once a day, turn it into a skill or command
- Build reusable skills and commit them to git — reuse across every project
- Run a `/techdebt` pass at the end of every session to find and kill duplicated code
