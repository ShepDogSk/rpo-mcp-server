# RPO MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server pre prístup k slovenskému Registru právnických osôb (RPO) / MCP server for accessing Slovak Register of Legal Entities (RPO).

## Slovensky

### Popis

Tento MCP server poskytuje prístup k verejnému REST API rozhraniu Registra právnických osôb, podnikateľov a orgánov verejnej moci (RPO) spravovaného Štatistickým úradom Slovenskej republiky.

Server umožňuje integráciu RPO údajov do AI asistentov ako Claude, Augment a ďalších, ktoré podporujú Model Context Protocol (MCP).

### Funkcie

- **Vyhľadávanie právnických osôb** - vyhľadávanie podľa rôznych kritérií (IČO, názov, adresa, atď.)
- **Detail právnickej osoby** - získanie kompletných informácií o konkrétnej PO
- **Historické údaje** - prístup k historickým záznamom
- **Organizačné jednotky** - informácie o organizačných zložkách
- **Fulltextové vyhľadávanie** - pokročilé vyhľadávanie v textových poliach
- **Validácia parametrov** - kontrola správnosti vstupných údajov
- **Chybové hlásenia** - zmysluplné chybové správy v slovenčine a angličtine

### Inštalácia

```bash
git clone https://github.com/ShepDogSk/rpo-mcp-server.git
cd rpo-mcp-server
npm install
npm run build
```

### Konfigurácia pre Claude Desktop

Pridajte do vášho `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rpo-server": {
      "command": "node",
      "args": ["/absolútna/cesta/k/rpo-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Konfigurácia pre Augment

Pridajte do vášho Augment konfiguračného súboru:

```json
{
  "mcpServers": {
    "rpo-server": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/cesta/k/rpo-mcp-server"
    }
  }
}
```

### Použitie

Server poskytuje nasledujúce nástroje:

1. **rpo_search** - Vyhľadávanie právnických osôb
2. **rpo_detail** - Získanie detailov konkrétnej PO

#### Príklad vyhľadávania

```
Vyhľadaj spoločnosti s názvom "Tesco" v Bratislave
```

#### Príklad získania detailov

```
Zobraz detail spoločnosti s IČO 12345678
```

### Licencia

Údaje z RPO sú poskytované pod licenciou Creative Commons Attribution License (CC-BY) 4.0.

---

## English

### Description

This MCP server provides access to the public REST API of the Slovak Register of Legal Entities, Entrepreneurs and Public Authorities (RPO) managed by the Statistical Office of the Slovak Republic.

### Features

- **Legal entity search** - search by various criteria (ID, name, address, etc.)
- **Legal entity details** - get complete information about a specific entity
- **Historical data** - access to historical records
- **Organization units** - information about organizational units

### Installation

```bash
npm install
npm run build
```

### Configuration for Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rpo-server": {
      "command": "node",
      "args": ["/path/to/rpo-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Usage

The server provides the following tools:

1. **rpo_search** - Search for legal entities
2. **rpo_detail** - Get details of a specific entity

#### Search example

```
Search for companies named "Tesco" in Bratislava
```

#### Detail example

```
Show details for company with ID 12345678
```

### License

RPO data is provided under Creative Commons Attribution License (CC-BY) 4.0.

## Development

```bash
npm run dev    # Watch mode
npm run test   # Run tests
npm run lint   # Lint code
```

## API Documentation

The server uses the official RPO API: https://api.statistics.sk/rpo/v1/

### API Endpoints

- **Search**: `https://api.statistics.sk/rpo/v1/search`
- **Detail**: `https://api.statistics.sk/rpo/v1/entity/{id}`

### Supported Search Parameters

- `identifier` - Company ID (IČO)
- `fullName` - Full company name (fulltext search)
- `legalForm` - Legal form (fulltext search)
- `legalStatus` - Legal status
- `addressMunicipality` - Municipality (fulltext search)
- `addressStreet` - Street address (fulltext search)
- `establishmentAfter` - Establishment date from (YYYY-MM-DD)
- `establishmentBefore` - Establishment date to (YYYY-MM-DD)
- `terminationAfter` - Termination date from (YYYY-MM-DD)
- `terminationBefore` - Termination date to (YYYY-MM-DD)
- `onlyActive` - Search only active entities
- `dbModificationDateAfter` - DB modification date from (YYYY-MM-DD)
- `dbModificationDateBefore` - DB modification date to (YYYY-MM-DD)
- `mainActivity` - Main economic activity
- `esa2010` - ESA 2010 classification
- `sourceRegister` - Source register
- `stakeholderType` - Stakeholder type
- `stakeholderPersonGivenName` - Stakeholder given name
- `stakeholderPersonFamilyName` - Stakeholder family name
- `stakeholderCompanyName` - Stakeholder company name
- `statutoryBodyType` - Statutory body type
- `statutoryBodyGivenName` - Statutory body given name
- `statutoryBodyFamilyName` - Statutory body family name
- `statutoryBodyCompanyName` - Statutory body company name
- `orgUnitsIdentifier` - Organization unit identifier
- `orgUnitsFullName` - Organization unit name
- `orgUnitsStakeholderPersonGivenName` - Org unit stakeholder given name
- `orgUnitsStakeholderPersonFamilyName` - Org unit stakeholder family name
- `orgUnitsStakeholderCompanyName` - Org unit stakeholder company name

### Supported Detail Parameters

- `id` - Unique record identifier (required)
- `showHistoricalData` - Include historical data (optional)
- `showOrganizationUnits` - Include organization units (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Support

For issues and questions, please use the GitHub issue tracker.
