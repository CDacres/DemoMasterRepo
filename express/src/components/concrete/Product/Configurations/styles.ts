import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  configContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: '12px',
    gridRowGap: '8px',
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  configWrapper: {
    whiteSpace: 'nowrap',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  configIcon: {
    width: '25px',
    height: '25px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  configText: {
    verticalAlign: 'middle',
  },
  classroom: {
    background: 'transparent url("/_express/images/room_configs/classroom.png") no-repeat scroll 0 0 / contain',
  },
  boardroom: {
    background: 'transparent url("/_express/images/room_configs/boardroom.png") no-repeat scroll 0 0 / contain',
  },
  banquet: {
    background: 'transparent url("/_express/images/room_configs/banquet.png") no-repeat scroll 0 0 / contain',
  },
  theatre: {
    background: 'transparent url("/_express/images/room_configs/theatre.png") no-repeat scroll 0 0 / contain',
  },
  desk: {
    background: 'transparent url("/_express/images/room_configs/hotdesk.png") no-repeat scroll 0 0 / contain',
  },
  reception: {
    background: 'transparent url("/_express/images/room_configs/reception.png") no-repeat scroll 0 0 / contain',
  },
  cabaret: {
    background: 'transparent url("/_express/images/room_configs/cabaret.png") no-repeat scroll 0 0 / contain',
  },
  'u_shaped': {
    background: 'transparent url("/_express/images/room_configs/u-shaped.png") no-repeat scroll 0 0 / contain',
  },
});
