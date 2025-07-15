# RPO API Dokumentácia

## Prehľad

RPO MCP Server poskytuje prístup k slovenskému Registru právnických osôb prostredníctvom dvoch hlavných nástrojov.

## Nástroje

### rpo_search

Vyhľadávanie právnických osôb podľa rôznych kritérií.

#### Parametre

| Parameter | Typ | Popis |
|-----------|-----|-------|
| `identifier` | string | IČO spoločnosti |
| `fullName` | string | Plný názov (fulltextové hľadanie) |
| `legalForm` | string | Právna forma (fulltextové hľadanie) |
| `addressMunicipality` | string | Obec (fulltextové hľadanie) |
| `addressStreet` | string | Ulica (fulltextové hľadanie) |
| `onlyActive` | boolean | Iba aktívne záznamy |
| `establishmentAfter` | string | Dátum vzniku od (YYYY-MM-DD) |
| `establishmentBefore` | string | Dátum vzniku do (YYYY-MM-DD) |
| `mainActivity` | string | Hlavná ekonomická činnosť |

#### Príklady použitia

```json
{
  "fullName": "Tesco",
  "addressMunicipality": "Bratislava",
  "onlyActive": true
}
```

```json
{
  "identifier": "12345678"
}
```

```json
{
  "legalForm": "s.r.o.",
  "establishmentAfter": "2020-01-01",
  "onlyActive": true
}
```

### rpo_detail

Získanie detailných informácií o konkrétnej právnickej osobe.

#### Parametre

| Parameter | Typ | Povinný | Popis |
|-----------|-----|---------|-------|
| `id` | string | ✓ | Jedinečný identifikátor záznamu |
| `showHistoricalData` | boolean | | Zahrnúť historické údaje |
| `showOrganizationUnits` | boolean | | Zahrnúť organizačné jednotky |

#### Príklad použitia

```json
{
  "id": "123456",
  "showHistoricalData": true,
  "showOrganizationUnits": false
}
```

## Štruktúra odpovede

### Vyhľadávanie (rpo_search)

```json
{
  "results": [
    {
      "id": 123456,
      "identifiers": [
        {
          "value": "12345678",
          "validFrom": "2020-01-01"
        }
      ],
      "fullNames": [
        {
          "value": "Test s.r.o.",
          "validFrom": "2020-01-01"
        }
      ],
      "addresses": [
        {
          "formatedAddress": "Bratislava, Hlavná 1",
          "municipality": {
            "value": "Bratislava",
            "code": "SK0101"
          }
        }
      ]
    }
  ],
  "license": "Creative Commons Attribution License (CC-BY) 4.0"
}
```

### Detail (rpo_detail)

Rovnaká štruktúra ako jednotlivý záznam vo vyhľadávaní, ale s kompletnejšími údajmi.

## Chybové stavy

### 400 Bad Request
- Žiadny vyhľadávací parameter nebol zadaný
- Neplatný formát dátumu

### 404 Not Found
- Záznam s daným ID neexistuje
- Žiadne výsledky pre vyhľadávanie

### 500 Internal Server Error
- Chyba RPO API
- Sieťová chyba

## Limity

- Maximálne 500 výsledkov na vyhľadávanie
- Fulltextové vyhľadávanie vyžaduje minimálne 3 znaky
- Maximálna dĺžka URL je 2000 znakov
