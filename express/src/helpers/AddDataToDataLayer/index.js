const addDataToDataLayer = (reservation) => {
  window.dataLayer.push({
    ecommerce: {
      purchase: {
        actionField: {
          id: reservation.booking_id,
          affiliation: '',
          revenue: reservation.total_revenue_rounded,
          tax: '',
          shipping: '',
          coupon: ''
        },
        products: [
          {
            name: reservation.room_name,
            id: reservation.room_id,
            price: reservation.total_revenue_rounded,
            brand: reservation.venue_name,
            category: reservation.usage_superset_desc,
            variant: '',
            quantity: 1,
            coupon: ''
          }
        ]
      }
    },
    event: 'purchase'
  });
  window.dataLayer.push({
    ecommerce: {
      checkout: {
        actionField: {
          step: 3
        },
        products: [
          {
            name: reservation.room_name,
            id: reservation.room_id,
            price: reservation.total_revenue_rounded,
            brand: reservation.venue_name,
            category: reservation.usage_superset_desc,
            variant: '',
            quantity: 1,
            coupon: ''
          }
        ]
      }
    },
    event: 'checkout'
  });
};

export default addDataToDataLayer;


