export const notifications = [
  {
    content: [
      {
        checkboxes: [
          {
            addCheckbox: false,
            name: 'reservation_calls',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'reservation_email',
          },
          {
            addCheckbox: false,
            name: 'reservation_SMS',
          },
        ],
        description: 'business.notification_reservation_text',
        title: '',
      },
    ],
    header: [
      'common.notification_call_column',
      'common.notification_email_column',
      'common.notification_sms_column',
    ],
    name: 'business.notification_reservation_title',
  },
  {
    content: [
      {
        checkboxes: [
          {
            addCheckbox: false,
            name: 'price_alert_calls',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'price_alert_email',
          },
          {
            addCheckbox: false,
            name: 'price_alert_SMS',
          },
        ],
        description: 'business.notification_budget_text',
        title: '',
      },
    ],
    header: [
      'common.notification_call_column',
      'common.notification_email_column',
      'common.notification_sms_column',
    ],
    name: 'business.notification_budget_title',
  },
];
