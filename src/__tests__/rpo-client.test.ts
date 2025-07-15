import { RPOClient } from '../rpo-client.js';
import { SearchParams, DetailParams } from '../schemas.js';

describe('RPOClient', () => {
  let client: RPOClient;

  beforeEach(() => {
    client = new RPOClient();
  });

  describe('search', () => {
    it('should throw error when no search parameters provided', async () => {
      await expect(client.search({})).rejects.toThrow(
        'Aspoň jeden vyhľadávací parameter musí byť zadaný'
      );
    });

    it('should accept valid search parameters', async () => {
      const params: SearchParams = {
        fullName: 'Test',
        onlyActive: true,
      };

      // Mock the API call for testing
      jest.spyOn(client as any, 'client').mockImplementation({
        get: jest.fn().mockResolvedValue({
          data: {
            results: [],
            license: 'CC-BY 4.0',
          },
        }),
      });

      const result = await client.search(params);
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('license');
    });
  });

  describe('getDetail', () => {
    it('should require id parameter', async () => {
      const params: DetailParams = {
        id: '123456',
      };

      // Mock the API call for testing
      jest.spyOn(client as any, 'client').mockImplementation({
        get: jest.fn().mockResolvedValue({
          data: {
            id: 123456,
            identifiers: [],
            fullNames: [],
          },
        }),
      });

      const result = await client.getDetail(params);
      expect(result).toHaveProperty('id');
    });
  });

  describe('healthCheck', () => {
    it('should return boolean', async () => {
      // Mock the search method
      jest.spyOn(client, 'search').mockResolvedValue({
        results: [],
        license: 'CC-BY 4.0',
      });

      const result = await client.healthCheck();
      expect(typeof result).toBe('boolean');
    });
  });
});
