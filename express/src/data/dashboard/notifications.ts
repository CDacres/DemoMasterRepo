export const notifications = [
  {
    content: [
      {
        checkboxes: [
          {
            addCheckbox: false,
            name: 'reminders_calls',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'reminders_email',
          },
          {
            addCheckbox: true,
            name: 'reminders_SMS',
          },
        ],
        description: 'dashboard.notification_reminder_text',
        title: 'dashboard.notification_reminder_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: false,
            name: 'messages_calls',
          },
          {
            addCheckbox: true,
            name: 'messages_email',
          },
          {
            addCheckbox: true,
            disabled: true,
            name: 'messages_SMS',
          },
        ],
        description: 'dashboard.notification_message_text',
        title: 'common.messages',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'recommendations_calls',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'recommendations_email',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'recommendations_SMS',
          },
        ],
        description: 'dashboard.notification_recommendation_text',
        title: 'dashboard.notification_recommendation_title',
      },
    ],
    header: [
      'common.notification_call_column',
      'common.notification_email_column',
      'common.notification_sms_column',
    ],
    name: 'dashboard.notification_reservations_title',
  },
  {
    content: [
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'travel_inspiration_calls',
          },
          {
            addCheckbox: true,
            checked: true,
            name: 'travel_inspiration_email',
          },
          {
            addCheckbox: true,
            name: 'travel_inspiration_SMS',
          },
        ],
        description: 'dashboard.notification_travel_text',
        title: 'dashboard.notification_travel_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'things_to_do_calls',
          },
          {
            addCheckbox: true,
            name: 'things_to_do_email',

          },
          {
            addCheckbox: true,
            name: 'things_to_do_SMS',
          },
        ],
        description: 'dashboard.notification_city_text',
        title: 'dashboard.notification_city_title',
      },
    ],
    header: [
      'common.notification_call_column',
      'common.notification_email_column',
      'common.notification_sms_column',
    ],
    name: 'dashboard.notification_local_area_title',
  },
  {
    content: [
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'how_it_works_calls',
          },
          {
            addCheckbox: true,
            name: 'how_it_works_email',
          },
          {
            addCheckbox: true,
            name: 'how_it_works_SMS',
          },
        ],
        description: 'dashboard.notification_how_text',
        title: 'dashboard.notification_how_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'invites_calls',
          },
          {
            addCheckbox: true,
            name: 'invites_email',
          },
          {
            addCheckbox: true,
            name: 'invites_SMS',
          },
        ],
        description: 'dashboard.notification_invite_text',
        title: 'dashboard.notification_invite_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'surveys_calls',
          },
          {
            addCheckbox: true,
            disabled: true,
            name: 'surveys_email',
          },
          {
            addCheckbox: true,
            disabled: true,
            name: 'surveys_SMS',
          },
        ],
        description: 'dashboard.notification_survey_text',
        title: 'dashboard.notification_survey_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'policy_calls',
          },
          {
            addCheckbox: true,
            name: 'policy_email',
          },
          {
            addCheckbox: true,
            name: 'policy_SMS',
          },
        ],
        description: 'dashboard.notification_policy_text',
        title: 'dashboard.notification_policy_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'work_updates_calls',
          },
          {
            addCheckbox: true,
            name: 'work_updates_email',
          },
          {
            addCheckbox: true,
            name: 'work_updates_SMS',
          },
        ],
        description: 'dashboard.notification_work_text',
        title: 'dashboard.notification_work_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'venue_listing_calls',
          },
          {
            addCheckbox: true,
            disabled: true,
            name: 'venue_listing_email',
          },
          {
            addCheckbox: true,
            name: 'venue_listing_SMS',
          },
        ],
        description: 'dashboard.notification_listing_text',
        title: 'dashboard.notification_listing_title',
      },
      {
        checkboxes: [
          {
            addCheckbox: true,
            name: 'experience_hosting_calls',
          },
          {
            addCheckbox: true,
            name: 'experience_hosting_email',
          },
          {
            addCheckbox: true,
            name: 'experience_hosting_SMS',
          },
        ],
        description: 'dashboard.notification_host_text',
        title: 'dashboard.notification_host_title',
      },
    ],
    header: [
      'common.notification_call_column',
      'common.notification_email_column',
      'common.notification_sms_column',
    ],
    name: 'dashboard.notification_feature_title',
  },
];
