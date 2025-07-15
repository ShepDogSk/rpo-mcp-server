# Contributing to RPO MCP Server

Ďakujeme za váš záujem prispieť k RPO MCP Server projektu! / Thank you for your interest in contributing to the RPO MCP Server project!

## Slovensky

### Ako prispieť

1. **Fork** tohto repozitára
2. Vytvorte **feature branch** (`git checkout -b feature/nova-funkcionalita`)
3. **Commit** vaše zmeny (`git commit -am 'Pridanie novej funkcionality'`)
4. **Push** do branch (`git push origin feature/nova-funkcionalita`)
5. Vytvorte **Merge Request**

### Štandardy kódu

- Používajte TypeScript pre všetok nový kód
- Dodržiavajte ESLint pravidlá (`npm run lint`)
- Pridajte testy pre novú funkcionalitu
- Aktualizujte dokumentáciu podľa potreby
- Používajte zmysluplné commit správy

### Testovanie

```bash
npm run test        # Spustenie testov
npm run lint        # Kontrola kódu
npm run build       # Build projektu
```

### Hlásenie chýb

Pri hlásení chýb prosím uveďte:
- Verziu Node.js
- Verziu balíka
- Kroky na reprodukciu
- Očakávané vs. skutočné správanie
- Logy chýb

---

## English

### How to Contribute

1. **Fork** this repository
2. Create a **feature branch** (`git checkout -b feature/new-feature`)
3. **Commit** your changes (`git commit -am 'Add new feature'`)
4. **Push** to the branch (`git push origin feature/new-feature`)
5. Create a **Merge Request**

### Code Standards

- Use TypeScript for all new code
- Follow ESLint rules (`npm run lint`)
- Add tests for new functionality
- Update documentation as needed
- Use meaningful commit messages

### Testing

```bash
npm run test        # Run tests
npm run lint        # Check code quality
npm run build       # Build project
```

### Bug Reports

When reporting bugs, please include:
- Node.js version
- Package version
- Steps to reproduce
- Expected vs. actual behavior
- Error logs

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run tests: `npm run test`

## Code Style

We use ESLint with TypeScript rules. Please ensure your code passes linting:

```bash
npm run lint:fix
```

## Commit Messages

Use clear and descriptive commit messages:

- `feat: add new search parameter`
- `fix: handle API timeout errors`
- `docs: update README examples`
- `test: add unit tests for client`

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add changelog entry for significant changes
4. Request review from maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
