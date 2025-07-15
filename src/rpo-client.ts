import axios, { AxiosInstance } from 'axios';
import { SearchParams, DetailParams, SearchResponse, LegalEntity, searchResponseSchema, legalEntitySchema } from './schemas.js';

export class RPOClient {
  private client: AxiosInstance;
  private readonly baseURL = 'https://api.statistics.sk/rpo/v1';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RPO-MCP-Server/1.0.0',
      },
    });

    // Pridanie interceptora pre logovanie chýb
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('RPO API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
        });
        throw error;
      }
    );
  }

  /**
   * Vyhľadávanie právnických osôb
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    // Validácia - aspoň jeden parameter musí byť zadaný
    const hasSearchParam = Object.values(params).some(value => value !== undefined && value !== '');
    if (!hasSearchParam) {
      throw new Error('Aspoň jeden vyhľadávací parameter musí byť zadaný / At least one search parameter must be provided');
    }

    // Filtrovanie undefined hodnôt
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    );

    try {
      const response = await this.client.get('/search', {
        params: cleanParams,
      });

      // Validácia odpovede
      const validatedResponse = searchResponseSchema.parse(response.data);
      return validatedResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Neplatné parametre vyhľadávania / Invalid search parameters');
        }
        if (error.response?.status === 404) {
          throw new Error('Nenašli sa žiadne záznamy / No records found');
        }
        throw new Error(`RPO API chyba: ${error.response?.status} ${error.response?.statusText}`);
      }
      throw error;
    }
  }

  /**
   * Získanie detailov právnickej osoby
   */
  async getDetail(params: DetailParams): Promise<LegalEntity> {
    try {
      const queryParams: Record<string, string> = {};
      
      if (params.showHistoricalData) {
        queryParams.showHistoricalData = 'true';
      }
      
      if (params.showOrganizationUnits) {
        queryParams.showOrganizationUnits = 'true';
      }

      const response = await this.client.get(`/entity/${params.id}`, {
        params: queryParams,
      });

      // Validácia odpovede
      const validatedResponse = legalEntitySchema.parse(response.data);
      return validatedResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Záznam s ID ${params.id} nebol nájdený / Record with ID ${params.id} not found`);
        }
        throw new Error(`RPO API chyba: ${error.response?.status} ${error.response?.statusText}`);
      }
      throw error;
    }
  }

  /**
   * Získanie zoznamu číselníkov (pomocná metóda)
   */
  async getCodelist(codelistCode: string): Promise<any> {
    try {
      const response = await this.client.get(`/codelists/${codelistCode}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chyba pri získavaní číselníka ${codelistCode}: ${error.response?.status} ${error.response?.statusText}`);
      }
      throw error;
    }
  }

  /**
   * Testovanie pripojenia k API
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Jednoduchý test - vyhľadanie s minimálnymi parametrami
      await this.search({ onlyActive: true });
      return true;
    } catch (error) {
      console.error('RPO API health check failed:', error);
      return false;
    }
  }
}
