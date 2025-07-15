#!/usr/bin/env node

/**
 * Test script pre RPO MCP Server
 * Umožňuje testovanie servera bez MCP klienta
 */

import { RPOClient } from '../dist/rpo-client.js';

async function testRPOClient() {
  console.log('🧪 Testovanie RPO MCP Server...\n');
  
  const client = new RPOClient();
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Testovanie pripojenia...');
    const isHealthy = await client.healthCheck();
    console.log(`   Pripojenie: ${isHealthy ? '✅ OK' : '❌ CHYBA'}\n`);
    
    if (!isHealthy) {
      console.log('❌ Server nie je dostupný. Ukončujem testy.');
      process.exit(1);
    }
    
    // Test 2: Vyhľadávanie
    console.log('2️⃣ Testovanie vyhľadávania...');
    try {
      const searchResult = await client.search({
        fullName: 'Tesco',
        onlyActive: true
      });
      
      console.log(`   Nájdených záznamov: ${searchResult.results.length}`);
      if (searchResult.results.length > 0) {
        const first = searchResult.results[0];
        console.log(`   Prvý výsledok: ${first.fullNames?.[0]?.value || 'N/A'} (ID: ${first.id})`);
      }
      console.log('   Vyhľadávanie: ✅ OK\n');
    } catch (error) {
      console.log(`   Vyhľadávanie: ❌ CHYBA - ${error.message}\n`);
    }
    
    // Test 3: Detail (ak máme výsledky z vyhľadávania)
    console.log('3️⃣ Testovanie detailu...');
    try {
      // Použijeme známe IČO pre test
      const searchForDetail = await client.search({
        identifier: '00151700', // Tesco Stores SR
        onlyActive: true
      });
      
      if (searchForDetail.results.length > 0) {
        const entityId = searchForDetail.results[0].id.toString();
        const detail = await client.getDetail({
          id: entityId,
          showHistoricalData: false
        });
        
        console.log(`   Detail pre ID ${entityId}: ✅ OK`);
        console.log(`   Názov: ${detail.fullNames?.[0]?.value || 'N/A'}`);
        console.log(`   IČO: ${detail.identifiers?.[0]?.value || 'N/A'}`);
      } else {
        console.log('   Detail: ⚠️  Žiadne záznamy na testovanie');
      }
      console.log();
    } catch (error) {
      console.log(`   Detail: ❌ CHYBA - ${error.message}\n`);
    }
    
    // Test 4: Chybové stavy
    console.log('4️⃣ Testovanie chybových stavov...');
    try {
      await client.search({});
      console.log('   Chybové stavy: ❌ CHYBA - Mal by hodiť chybu pre prázdne parametre');
    } catch (error) {
      console.log('   Chybové stavy: ✅ OK - Správne zachytáva chyby');
    }
    console.log();
    
    console.log('🎉 Všetky testy dokončené!');
    
  } catch (error) {
    console.error('❌ Kritická chyba pri testovaní:', error.message);
    process.exit(1);
  }
}

// Spustenie testov
testRPOClient().catch(console.error);
