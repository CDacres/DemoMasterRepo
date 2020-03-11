const setGlobalVars = (reservation) => {
  window.dynx_itemid = reservation.booking_id;
  window.zc_to_zipcube = reservation.total_revenue_rounded;
  window.zc_reservation_id = reservation.id;
  window.zc_currency = reservation.currency;
  window.zc_booking_type = reservation.usage_superset_desc;
  window.zc_room_name = reservation.room_name;
};

export default setGlobalVars;
