import { HttpApi } from './HttpApi';
import { AmenityMeta } from '@src/core/domain';

type FiltersResponse = {
  data: [
    {
      type: string;
      id: string;
      attributes: {
        name: string;
        allows_price: boolean;
      };
    },
  ];
};
export class AmenityApi extends HttpApi {
  query = async (): Promise<AmenityMeta[]> => {
    try {
      const amenities: AmenityMeta[] = await this.http
        .get('/api/filters')
        .then(x => x.data as FiltersResponse)
        .then(x => x.data.map(i => ({
          id: i.id,
          description: i.attributes.name,
          isPriceable: i.attributes.allows_price,
        })));
      return amenities;
    } catch (e) {
      return [];
    }
  }
}
