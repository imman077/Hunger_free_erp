# Project Plan: Frontend Module Generator CLI

This plan defines the steps to implement, test, and package the frontend feature scaffolding generator.

## Success Criteria
- [x] Creation of `generator.js` with interactive prompt system.
- [x] Inclusion of both "Listing screen" (like `expenses/`) and "Create/Edit form screen" (like `new_expenses/`) templates.
- [x] Standalone Windows compilation via `pkg` to generate a single `generator.exe` executable.
- [x] Verification of correct name replacement, folder paths, and import directories in generated files.

## Tech Stack
- Node.js (V8 runtime, built-in modules: `fs`, `path`, `readline`)
- Packaging: `pkg` compiler

## Proposed File Structure
- `automation-generator/`
  - `generator.js` - Main CLI generator
  - `compile.bat` - Compilation helper script
- `generator.exe` - Standalone compiled executable (copied/placed in project root)

## Task Breakdown

### Task 1: Setup and Template Extraction
- **Agent**: `project-planner`
- **Description**: Extract template files and construct the template strings mapping within `generator.js`.
- **Verify**: Check that all lines of code from `expenses` and `new_expenses` files are converted into dynamic string templates with placeholder variables.

### Task 2: Core Generator Script Implementation
- **Agent**: `frontend-specialist`
- **Description**: Implement CLI prompt reading and file creation loop using Node `fs`.
- **Verify**: Run `node automation-generator/generator.js` and verify it generates files locally under a test path.

### Task 3: Build Executable (.exe)
- **Agent**: `devops-engineer`
- **Description**: Package the JS script into a single win-x64 binary.
- **Verify**: Execute the resulting `generator.exe` and confirm it works without external runtime dependencies.

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-12
