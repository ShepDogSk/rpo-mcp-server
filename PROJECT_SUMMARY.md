# RPO MCP Server - Súhrn projektu

## Prehľad

Kompletný GitLab balík pre MCP server poskytujúci prístup k slovenskému Registru právnických osôb (RPO).

## Štruktúra projektu

```
rpo-mcp-server/
├── src/                          # Zdrojový kód
│   ├── index.ts                  # Hlavný MCP server
│   ├── rpo-client.ts            # RPO API klient
│   ├── schemas.ts               # Zod validačné schémy
│   ├── types.ts                 # TypeScript typy
│   └── __tests__/               # Unit testy
├── docs/                        # Dokumentácia
│   ├── API.md                   # API dokumentácia
│   └── EXAMPLES.md              # Príklady použitia
├── examples/                    # Konfiguračné príklady
│   ├── claude-desktop-config.json
│   ├── augment-config.json
│   ├── search-example.json
│   ├── detail-example.json
│   └── docker-compose.yml
├── scripts/                     # Pomocné skripty
│   ├── setup.sh                # Setup skript
│   └── test-server.js          # Test skript
├── .gitlab/                     # GitLab templates
│   ├── issue_templates/
│   └── merge_request_templates/
├── package.json                 # NPM konfigurácia
├── tsconfig.json               # TypeScript konfigurácia
├── .gitlab-ci.yml              # CI/CD pipeline
├── Dockerfile                  # Docker kontajner
├── README.md                   # Hlavná dokumentácia
├── LICENSE                     # MIT licencia
├── SECURITY.md                 # Bezpečnostná politika
├── CONTRIBUTING.md             # Príspevky
└── CHANGELOG.md                # História zmien
```

## Kľúčové funkcie

### MCP Server
- **rpo_search** - Vyhľadávanie právnických osôb
- **rpo_detail** - Detail konkrétnej PO
- Podpora pre všetky RPO API parametre
- Validácia vstupov pomocou Zod
- Chybové hlásenia v slovenčine a angličtine

### Technické vlastnosti
- TypeScript s prísnou typovou kontrolou
- Axios HTTP klient s interceptormi
- Kompletné unit testy s Jest
- ESLint pre kvalitu kódu
- GitLab CI/CD pipeline
- Docker podpora

### Dokumentácia
- Dvojjazyčná dokumentácia (SK/EN)
- API dokumentácia s príkladmi
- Konfiguračné príklady pre Claude Desktop a Augment
- Bezpečnostná politika
- Príspevky guidelines

## Inštalácia a použitie

### Rýchly štart
```bash
git clone <repository-url>
cd rpo-mcp-server
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Konfigurácia pre Claude Desktop
```json
{
  "mcpServers": {
    "rpo-server": {
      "command": "node",
      "args": ["/cesta/k/rpo-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Testovanie
```bash
npm test                    # Unit testy
npm run lint               # Kontrola kódu
node scripts/test-server.js # Test servera
```

## Príklady použitia

### Vyhľadávanie
```
Vyhľadaj spoločnosti s názvom "Tesco" v Bratislave
```

### Detail
```
Zobraz detail spoločnosti s IČO 12345678
```

## Licencia a údaje

- **Kód**: MIT licencia
- **RPO údaje**: Creative Commons Attribution License (CC-BY) 4.0
- **Zdroj údajov**: Štatistický úrad Slovenskej republiky

## Podpora

- GitLab Issues pre hlásenie chýb
- Merge Requests pre príspevky
- Dokumentácia v docs/ priečinku
- Príklady v examples/ priečinku

## Bezpečnosť

- Validácia všetkých vstupov
- Timeout ochrana
- Dependency scanning
- Responsible disclosure policy

## CI/CD Pipeline

- Automatické testovanie
- Kontrola kvality kódu
- Security scanning
- Automatické releases
- Docker build

Tento projekt poskytuje kompletné riešenie pre integráciu slovenského RPO registra do MCP ekosystému s dôrazom na kvalitu, bezpečnosť a použiteľnosť.
