import { ConfigurationKind, ConfigurationKindMeta } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: ConfigurationKindMeta[] = [
  {
    description: 'common.seated',
    id: ConfigurationKind.SEATED,
  },
  {
    description: 'common.reception',
    id: ConfigurationKind.RECEPTION,
    thumbUrl: '/_express/images/room_configs/reception-blue.png',
  },
  {
    description: 'common.boardroom',
    id: ConfigurationKind.BOARDROOM,
    thumbUrl: '/_express/images/room_configs/boardroom-blue.png',
  },
  {
    description: 'common.classroom',
    id: ConfigurationKind.CLASSROOM,
    thumbUrl: '/_express/images/room_configs/classroom-blue.png',
  },
  {
    description: 'common.banquet',
    id: ConfigurationKind.BANQUET,
    thumbUrl: '/_express/images/room_configs/banquet-blue.png',
  },
  {
    description: 'common.theatre',
    id: ConfigurationKind.THEATRE,
    thumbUrl: '/_express/images/room_configs/theatre-blue.png',
  },
  {
    description: 'common.u_shaped',
    id: ConfigurationKind.U_SHAPED,
    thumbUrl: '/_express/images/room_configs/u-shaped-blue.png',
  },
  {
    description: 'common.cabaret',
    id: ConfigurationKind.CABARET,
    thumbUrl: '/_express/images/room_configs/cabaret-blue.png',
  },
];

export const configurationKindCatalog = new Catalog<ConfigurationKindMeta>().withItems(_itemsSource);
