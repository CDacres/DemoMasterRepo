import qs from 'qs';
import snakecaseKeys from 'snakecase-keys';
import { pick } from 'lodash';

// Utils
import { cleanObjectOfUselessFalsyValues, objectify } from '@src/utils';

// Types
import { Store } from '@src/typings/types';

class Vertical {
  protected dataPoints: string[];

  queryStringMunger(params: Store.Search.Params) {
    return qs.stringify(
      cleanObjectOfUselessFalsyValues(
        snakecaseKeys(
          this.dataPoints
            .map(point => ([point, params[point]]))
            .reduce(objectify, pick(params, [
              'lat',
              'location',
              'lon',
              'neLat',
              'neLon',
              'placeId',
              'swLat',
              'swLon',
              'tag',
            ]))
        )
      )
    );
  }
}

export default Vertical;
