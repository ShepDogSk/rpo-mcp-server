#!/bin/bash

# Setup script pre RPO MCP Server

set -e

echo "🚀 Nastavovanie RPO MCP Server..."

# Kontrola Node.js verzie
echo "📋 Kontrola požiadaviek..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie je nainštalovaný. Prosím nainštalujte Node.js 18 alebo novší."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js verzia $NODE_VERSION je príliš stará. Potrebujete verziu 18 alebo novšiu."
    exit 1
fi

echo "✅ Node.js verzia $(node -v) je v poriadku"

# Kontrola npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm nie je nainštalovaný."
    exit 1
fi

echo "✅ npm verzia $(npm -v) je v poriadku"

# Inštalácia závislostí
echo "📦 Inštalácia závislostí..."
npm ci

# Build projektu
echo "🔨 Build projektu..."
npm run build

# Spustenie testov
echo "🧪 Spustenie testov..."
npm run test

# Kontrola kvality kódu
echo "🔍 Kontrola kvality kódu..."
npm run lint

echo ""
echo "🎉 Setup dokončený úspešne!"
echo ""
echo "📝 Ďalšie kroky:"
echo "1. Skopírujte examples/config.json do vašej Claude Desktop konfigurácie"
echo "2. Upravte cestu k dist/index.js v konfigurácii"
echo "3. Reštartujte Claude Desktop"
echo ""
echo "🧪 Pre testovanie servera spustite:"
echo "   node scripts/test-server.js"
echo ""
echo "📚 Dokumentácia je dostupná v docs/ priečinku"
