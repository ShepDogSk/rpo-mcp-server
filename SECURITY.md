# Security Policy / Bezpečnostná politika

## Slovensky

### Podporované verzie

Aktuálne podporujeme bezpečnostné aktualizácie pre nasledujúce verzie:

| Verzia | Podporovaná |
| ------ | ----------- |
| 1.x.x  | ✅          |

### Hlásenie bezpečnostných zraniteľností

Ak objavíte bezpečnostnú zraniteľnosť, prosím **NEHLASTE** ju cez verejné issue.

Namiesto toho:

1. Pošlite email na [security@yourdomain.com](mailto:security@yourdomain.com)
2. Uveďte detailný popis zraniteľnosti
3. Ak je to možné, uveďte kroky na reprodukciu
4. Uveďte vašu kontaktnú informáciu

Odpovieme do 48 hodín a poskytneme časový plán riešenia.

### Bezpečnostné opatrenia

Tento projekt implementuje nasledujúce bezpečnostné opatrenia:

- **Validácia vstupov** - Všetky vstupy sú validované pomocou Zod schém
- **Chybové hlásenia** - Citlivé informácie nie sú odhalené v chybových hláseniach
- **Dependency scanning** - Pravidelné skenovanie závislostí
- **Timeout ochrana** - API volania majú nastavené timeouty
- **Rate limiting** - Implementované na úrovni HTTP klienta

---

## English

### Supported Versions

We currently support security updates for the following versions:

| Version | Supported |
| ------- | --------- |
| 1.x.x   | ✅        |

### Reporting Security Vulnerabilities

If you discover a security vulnerability, please **DO NOT** report it through public issues.

Instead:

1. Send an email to [security@yourdomain.com](mailto:security@yourdomain.com)
2. Include a detailed description of the vulnerability
3. If possible, include steps to reproduce
4. Include your contact information

We will respond within 48 hours and provide a timeline for resolution.

### Security Measures

This project implements the following security measures:

- **Input validation** - All inputs are validated using Zod schemas
- **Error handling** - Sensitive information is not exposed in error messages
- **Dependency scanning** - Regular dependency vulnerability scanning
- **Timeout protection** - API calls have configured timeouts
- **Rate limiting** - Implemented at HTTP client level

## Data Privacy / Ochrana údajov

### RPO Data

- Všetky údaje pochádzajú z verejného registra RPO
- Údaje sú poskytované pod licenciou CC-BY 4.0
- Žiadne citlivé osobné údaje nie sú spracovávané
- Server neuchováva žiadne údaje lokálne

### All data comes from the public RPO register

- Data is provided under CC-BY 4.0 license
- No sensitive personal data is processed
- Server does not store any data locally

## Responsible Disclosure

We follow responsible disclosure practices:

1. **Report** - Security issues reported privately
2. **Acknowledge** - We acknowledge receipt within 48 hours
3. **Investigate** - We investigate and develop fixes
4. **Coordinate** - We coordinate disclosure timeline
5. **Publish** - We publish security advisories after fixes are available
