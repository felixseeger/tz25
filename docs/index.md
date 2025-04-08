# TAKTZEIT Website Documentation

Welcome to the documentation for the TAKTZEIT website. This documentation provides comprehensive information about the project structure, components, styling, and development processes.

## Table of Contents

- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)

## Getting Started

To get started with the TAKTZEIT website project, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/felixseeger/tz25.git
cd tz25-vue3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal).

## Documentation

The documentation is organized into the following sections:

- [Component Documentation](./components.md): Detailed information about all components used in the project.
- [Style Guide](./style-guide.md): Guidelines for styling and design consistency.
- [API Documentation](./api.md): Information about API endpoints and data structures.
- [Build and Deployment Guide](./deployment.md): Instructions for building and deploying the application.

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch for integrating features
- `feature/*`: Feature branches for new features
- `bugfix/*`: Bugfix branches for fixing issues

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

### Pull Requests

1. Create a feature or bugfix branch from `develop`
2. Make your changes
3. Submit a pull request to `develop`
4. Ensure all tests pass
5. Get approval from at least one reviewer
6. Merge your changes

## Contributing

We welcome contributions to the TAKTZEIT website project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow the coding standards and conventions outlined in the [Style Guide](./style-guide.md).
