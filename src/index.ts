#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RPOClient } from './rpo-client.js';
import { searchParamsSchema, detailParamsSchema } from './schemas.js';

class RPOMCPServer {
  private server: Server;
  private rpoClient: RPOClient;

  constructor() {
    this.server = new Server({
      name: 'rpo-mcp-server',
      version: '1.0.0',
    });

    this.rpoClient = new RPOClient();
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'rpo_search',
            description: 'Vyhľadávanie právnických osôb v slovenskom RPO registri / Search legal entities in Slovak RPO register',
            inputSchema: {
              type: 'object',
              properties: {
                identifier: {
                  type: 'string',
                  description: 'IČO (Company ID)',
                },
                fullName: {
                  type: 'string',
                  description: 'Plný názov PO (fulltextové hľadanie) / Full company name (fulltext search)',
                },
                legalForm: {
                  type: 'string',
                  description: 'Právna forma (fulltextové hľadanie) / Legal form (fulltext search)',
                },
                legalStatus: {
                  type: 'string',
                  description: 'Právny stav / Legal status',
                },
                addressMunicipality: {
                  type: 'string',
                  description: 'Obec (fulltextové hľadanie) / Municipality (fulltext search)',
                },
                addressStreet: {
                  type: 'string',
                  description: 'Ulica (fulltextové hľadanie) / Street (fulltext search)',
                },
                establishmentAfter: {
                  type: 'string',
                  description: 'Dátum vzniku od (YYYY-MM-DD) / Establishment date from',
                },
                establishmentBefore: {
                  type: 'string',
                  description: 'Dátum vzniku do (YYYY-MM-DD) / Establishment date to',
                },
                terminationAfter: {
                  type: 'string',
                  description: 'Dátum zániku od (YYYY-MM-DD) / Termination date from',
                },
                terminationBefore: {
                  type: 'string',
                  description: 'Dátum zániku do (YYYY-MM-DD) / Termination date to',
                },
                onlyActive: {
                  type: 'boolean',
                  description: 'Hľadať iba aktívne záznamy / Search only active records',
                },
                dbModificationDateAfter: {
                  type: 'string',
                  description: 'Dátum poslednej zmeny od (YYYY-MM-DD) / DB modification date from',
                },
                dbModificationDateBefore: {
                  type: 'string',
                  description: 'Dátum poslednej zmeny do (YYYY-MM-DD) / DB modification date to',
                },
                mainActivity: {
                  type: 'string',
                  description: 'Hlavná ekonomická činnosť / Main economic activity',
                },
                esa2010: {
                  type: 'string',
                  description: 'ESA 2010 klasifikácia / ESA 2010 classification',
                },
                sourceRegister: {
                  type: 'string',
                  description: 'Zdrojový register / Source register',
                },
                stakeholderType: {
                  type: 'string',
                  description: 'Typ spoločníka / Stakeholder type',
                },
                stakeholderPersonGivenName: {
                  type: 'string',
                  description: 'Krstné meno spoločníka / Stakeholder given name',
                },
                stakeholderPersonFamilyName: {
                  type: 'string',
                  description: 'Priezvisko spoločníka / Stakeholder family name',
                },
                stakeholderCompanyName: {
                  type: 'string',
                  description: 'Názov spoločníka (PO) / Stakeholder company name',
                },
                statutoryBodyType: {
                  type: 'string',
                  description: 'Typ štatutárneho orgánu / Statutory body type',
                },
                statutoryBodyGivenName: {
                  type: 'string',
                  description: 'Krstné meno štatutárneho orgánu / Statutory body given name',
                },
                statutoryBodyFamilyName: {
                  type: 'string',
                  description: 'Priezvisko štatutárneho orgánu / Statutory body family name',
                },
                statutoryBodyCompanyName: {
                  type: 'string',
                  description: 'Názov štatutárneho orgánu (PO) / Statutory body company name',
                },
                orgUnitsIdentifier: {
                  type: 'string',
                  description: 'IČO organizačnej jednotky / Organization unit identifier',
                },
                orgUnitsFullName: {
                  type: 'string',
                  description: 'Názov organizačnej jednotky / Organization unit name',
                },
                orgUnitsStakeholderPersonGivenName: {
                  type: 'string',
                  description: 'Krstné meno spoločníka org. jednotky / Org unit stakeholder given name',
                },
                orgUnitsStakeholderPersonFamilyName: {
                  type: 'string',
                  description: 'Priezvisko spoločníka org. jednotky / Org unit stakeholder family name',
                },
                orgUnitsStakeholderCompanyName: {
                  type: 'string',
                  description: 'Názov spoločníka org. jednotky (PO) / Org unit stakeholder company name',
                },
              },
              required: [],
            },
          },
          {
            name: 'rpo_detail',
            description: 'Získanie detailných informácií o právnickej osobe / Get detailed information about a legal entity',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Jedinečný identifikátor záznamu / Unique record identifier',
                },
                showHistoricalData: {
                  type: 'boolean',
                  description: 'Zahrnúť historické údaje / Include historical data',
                  default: false,
                },
                showOrganizationUnits: {
                  type: 'boolean',
                  description: 'Zahrnúť organizačné jednotky / Include organization units',
                  default: false,
                },
              },
              required: ['id'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'rpo_search': {
            const params = searchParamsSchema.parse(args);
            const result = await this.rpoClient.search(params);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          case 'rpo_detail': {
            const params = detailParamsSchema.parse(args);
            const result = await this.rpoClient.getDetail(params);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('RPO MCP server running on stdio');
  }
}

const server = new RPOMCPServer();
server.run().catch(console.error);
