export const sideMenu = [
  {
    link_text: 'legal.tou_heading',
    link_href: '#term',
  },
  {
    link_text: 'legal.vop_heading',
    link_href: '#VenuePolicy',
  },
  {
    link_text: 'legal.pp_heading',
    link_href: '#PrivacyPolicy',
  },
];

export const termsOfUse = {
  id: 'term',
  heading: 'legal.tou_heading',
  subheading: 'legal.tou_subheading',
  sections: [
    {
      section_heading: 'legal.tou_intro_heading',
      section_body: ['legal.tou_intro_text'],
    },
    {
      section_heading: 'legal.tou_your_account_heading',
      section_body: [
        'legal.tou_your_account_text_1',
        'legal.tou_your_account_text_2',
        [
          'legal.tou_your_account_bullet_1',
          'legal.tou_your_account_bullet_2',
          'legal.tou_your_account_bullet_3',
          'legal.tou_your_account_bullet_4',
        ],
      ],
    },
    {
      section_heading: 'legal.tou_workspace_owners_heading',
      section_body: [
        'legal.tou_workspace_owners_text',
        {
          a: '#VenuePolicy',
          text: 'legal.tou_workspace_owners_link',
        },
      ],
    },
    {
      section_heading: 'legal.tou_transactions_heading',
      section_body: [
        'legal.tou_transactions_text_1',
        [
          'legal.tou_transactions_bullet_1',
          'legal.tou_transactions_bullet_2',
          'legal.tou_transactions_bullet_3',
          'legal.tou_transactions_bullet_4',
        ],
        'legal.tou_transactions_text_2',
        'legal.tou_transactions_text_3',
      ],
    },
    {
      section_heading: 'legal.tou_payments_heading',
      section_body: [
        'legal.tou_payments_text_1',
        'legal.tou_payments_text_2',
        'legal.tou_payments_text_3',
        'legal.tou_payments_text_4',
        'legal.tou_payments_text_5',
      ],
    },
    {
      section_heading: 'legal.tou_privacy_heading',
      section_body: [
        'legal.tou_privacy_text',
        {
          a: '#PrivacyPolicy',
          text: 'legal.tou_privacy_link',
        },
      ],
    },
    {
      section_heading: 'legal.tou_ownership_heading',
      section_body: [
        'legal.tou_ownership_text_1',
        'legal.tou_ownership_text_2',
      ],
    },
    {
      section_heading: 'legal.tou_member_content_heading',
      section_body: [
        'legal.tou_member_content_text_1',
        'legal.tou_member_content_text_2',
        'legal.tou_member_content_text_3',
        'legal.tou_member_content_text_4',
      ],
    },
    {
      section_heading: 'legal.tou_trademarks_heading',
      section_body: ['legal.tou_trademarks_text'],
    },
    {
      section_heading: 'legal.tou_conduct_heading',
      section_body: [
        'legal.tou_conduct_text_1',
        [
          'legal.tou_conduct_bullet_1_1',
          'legal.tou_conduct_bullet_1_2',
          'legal.tou_conduct_bullet_1_3',
          'legal.tou_conduct_bullet_1_4',
          'legal.tou_conduct_bullet_1_5',
          'legal.tou_conduct_bullet_1_6',
          'legal.tou_conduct_bullet_1_7',
          'legal.tou_conduct_bullet_1_8',
          'legal.tou_conduct_bullet_1_9',
          'legal.tou_conduct_bullet_1_10',
          'legal.tou_conduct_bullet_1_11',
          'legal.tou_conduct_bullet_1_12',
        ],
        'legal.tou_conduct_text_2',
        [
          'legal.tou_conduct_bullet_2_1',
          'legal.tou_conduct_bullet_2_2',
          'legal.tou_conduct_bullet_2_3',
        ],
      ],
    },
    {
      section_heading: 'legal.tou_third_party_heading',
      section_body: ['legal.tou_third_party_text'],
    },
    {
      section_heading: 'legal.tou_eligibility_heading',
      section_body: ['legal.tou_eligibility_text'],
    },
    {
      section_heading: 'legal.tou_disclaimers_heading',
      section_body: [
        'legal.tou_disclaimers_text_1',
        'legal.tou_disclaimers_text_2',
        'legal.tou_disclaimers_text_3',
        'legal.tou_disclaimers_text_4',
        'legal.tou_disclaimers_text_5',
        'legal.tou_disclaimers_text_6',
        'legal.tou_disclaimers_text_7',
        'legal.tou_disclaimers_text_8',
        [
          'legal.tou_disclaimers_bullet_1',
          'legal.tou_disclaimers_bullet_2',
          'legal.tou_disclaimers_bullet_3',
          'legal.tou_disclaimers_bullet_4',
        ],
        'legal.tou_disclaimers_text_9',
        'legal.tou_disclaimers_text_10',
      ],
    },
    {
      section_heading: 'legal.tou_liability_heading',
      section_body: [
        'legal.tou_liability_text_1',
        'legal.tou_liability_text_2',
      ],
    },
    {
      section_heading: 'legal.tou_termination_heading',
      section_body: [
        'legal.tou_termination_text_1',
        [
          'legal.tou_termination_bullet_1',
          'legal.tou_termination_bullet_2',
          'legal.tou_termination_bullet_3',
          'legal.tou_termination_bullet_4',
        ],
        'legal.tou_termination_text_2',
        'legal.tou_termination_text_3',
      ],
    },
    {
      section_heading: 'legal.tou_indemnity_heading',
      section_body: ['legal.tou_indemnity_text'],
    },
    {
      section_heading: 'legal.tou_misc_heading',
      section_body: [
        'legal.tou_misc_text_1',
        'legal.tou_misc_text_2',
      ],
    },
    {
      section_heading: 'legal.tou_governing_heading',
      section_body: ['legal.tou_governing_text'],
    },
  ],
};

export const venuePolicy = {
  id: 'VenuePolicy',
  heading: 'legal.vop_heading',
  subheading: 'legal.vop_subheading',
  sections: [
    {
      section_heading: 'legal.vop_intro_heading',
      section_body: [
        'legal.vop_intro_text_1',
        'legal.vop_intro_text_2',
      ],
    },
    {
      section_heading: 'legal.vop_definitions_heading',
      section_body: [
        'legal.vop_definitions_text',
        [
          'legal.vop_definitions_bullet_1',
          'legal.vop_definitions_bullet_2',
          'legal.vop_definitions_bullet_3',
          'legal.vop_definitions_bullet_4',
          'legal.vop_definitions_bullet_5',
          'legal.vop_definitions_bullet_6',
          'legal.vop_definitions_bullet_7',
          'legal.vop_definitions_bullet_8',
          'legal.vop_definitions_bullet_9',
          'legal.vop_definitions_bullet_10',
          'legal.vop_definitions_bullet_11',
          'legal.vop_definitions_bullet_12',
          'legal.vop_definitions_bullet_13',
        ],
      ],
    },
    {
      section_heading: 'legal.vop_rentals_heading',
      section_body: [
        'legal.vop_rentals_text_1',
        [
          'legal.vop_rentals_bullet_1',
          'legal.vop_rentals_bullet_2',
          'legal.vop_rentals_bullet_3',
          'legal.vop_rentals_bullet_4',
        ],
        'legal.vop_rentals_text_2',
      ],
    },
    {
      section_heading: 'legal.vop_payments_heading',
      section_body: [
        'legal.vop_payments_text_1',
        'legal.vop_payments_text_2',
        'legal.vop_payments_text_3',
        'legal.vop_payments_text_4',
        'legal.vop_payments_text_5',
        'legal.vop_payments_text_6',
        'legal.vop_payments_text_7',
        'legal.vop_payments_text_8',
        'legal.vop_payments_text_9',
        'legal.vop_payments_text_10',
        'legal.vop_payments_text_11',
        'legal.vop_payments_text_12',
        'legal.vop_payments_text_13',
        [
          'legal.vop_payments_bullet_1',
          [
            'legal.vop_payments_bullet_1_1',
            'legal.vop_payments_bullet_1_2',
          ],
          'legal.vop_payments_bullet_2',
        ],
      ],
    },
    {
      section_heading: 'legal.vop_use_of_heading',
      section_body: ['legal.vop_use_of_text'],
    },
    {
      section_heading: 'legal.vop_reps_heading',
      section_body: [
        'legal.vop_reps_text',
        [
          'legal.vop_reps_bullet_1',
          'legal.vop_reps_bullet_2',
        ],
      ],
    },
  ],
};

export const privacyPolicy = {
  id: 'PrivacyPolicy',
  heading: 'legal.pp_heading',
  subheading: 'legal.pp_subheading',
  sections: [
    {
      section_heading: '',
      section_body: [
        'legal.pp_intro_1',
        'legal.pp_intro_2',
        'legal.pp_intro_3',
      ],
    },
    {
      section_heading: 'legal.pp_data_heading',
      section_body: [
        'legal.pp_data_intro',
        'legal.pp_data_title_1',
        'legal.pp_data_text_1_1',
        [
          'legal.pp_data_bullet_1_1_1',
          'legal.pp_data_bullet_1_1_2',
          'legal.pp_data_bullet_1_1_3',
          'legal.pp_data_bullet_1_1_4',
        ],
        'legal.pp_data_text_1_2',
        [
          'legal.pp_data_bullet_1_2_1',
          'legal.pp_data_bullet_1_2_2',
          'legal.pp_data_bullet_1_2_3',
        ],
        'legal.pp_data_text_1_3',
        [
          'legal.pp_data_bullet_1_3_1',
          'legal.pp_data_bullet_1_3_2',
        ],
        'legal.pp_data_title_2',
        'legal.pp_data_text_2',
        [
          'legal.pp_data_bullet_2_1',
          'legal.pp_data_bullet_2_2',
          'legal.pp_data_bullet_2_3',
          'legal.pp_data_bullet_2_4',
          'legal.pp_data_bullet_2_5',
        ],
        'legal.pp_data_title_3',
        'legal.pp_data_text_3',
        [
          'legal.pp_data_bullet_3_1',
          'legal.pp_data_bullet_3_2',
          'legal.pp_data_bullet_3_3',
        ],
      ],
    },
    {
      section_heading: 'legal.pp_gather_heading',
      section_body: [
        'legal.pp_gather_intro',
        'legal.pp_gather_title_1',
        [
          'legal.pp_gather_bullet_1_1',
          'legal.pp_gather_bullet_1_2',
          'legal.pp_gather_bullet_1_3',
          'legal.pp_gather_bullet_1_4',
          'legal.pp_gather_bullet_1_5',
          'legal.pp_gather_bullet_1_6',
          [
            'legal.pp_gather_bullet_1_6_1',
            'legal.pp_gather_bullet_1_6_2',
            'legal.pp_gather_bullet_1_6_3',
          ],
          'legal.pp_gather_bullet_1_7',
        ],
        'legal.pp_gather_text_1',
        'legal.pp_gather_title_2',
        [
          'legal.pp_gather_bullet_2_1',
          'legal.pp_gather_bullet_2_2',
          'legal.pp_gather_bullet_2_3',
          'legal.pp_gather_bullet_2_4',
          'legal.pp_gather_bullet_2_5',
          'legal.pp_gather_bullet_2_6',
          'legal.pp_gather_bullet_2_7',
          'legal.pp_gather_bullet_2_8',
        ],
        'legal.pp_gather_text_2',
        'legal.pp_gather_title_3',
        [
          'legal.pp_gather_bullet_3_1',
          'legal.pp_gather_bullet_3_2',
          'legal.pp_gather_bullet_3_3',
          'legal.pp_gather_bullet_3_4',
        ],
        'legal.pp_gather_text_3',
        'legal.pp_gather_title_4',
        [
          'legal.pp_gather_bullet_4_1',
          'legal.pp_gather_bullet_4_2',
          'legal.pp_gather_bullet_4_3',
          'legal.pp_gather_bullet_4_4',
          'legal.pp_gather_bullet_4_5',
          'legal.pp_gather_bullet_4_6',
          'legal.pp_gather_bullet_4_7',
        ],
        'legal.pp_gather_text_4',
      ],
    },
    {
      section_heading: 'legal.pp_sharing_heading',
      section_body: [
        'legal.pp_sharing_title_1',
        'legal.pp_sharing_text_1',
        'legal.pp_sharing_title_2',
        'legal.pp_sharing_text_2_1',
        [
          'legal.pp_sharing_bullet_2_1',
          'legal.pp_sharing_bullet_2_2',
          'legal.pp_sharing_bullet_2_3',
        ],
        'legal.pp_sharing_text_2_2',
        'legal.pp_sharing_title_3',
        'legal.pp_sharing_text_3_1',
        [
          'legal.pp_sharing_bullet_3_1',
          'legal.pp_sharing_bullet_3_2',
          'legal.pp_sharing_bullet_3_3',
        ],
        'legal.pp_sharing_text_3_2',
        'legal.pp_sharing_text_3_3',
        'legal.pp_sharing_title_4',
        'legal.pp_sharing_text_4',
        'legal.pp_sharing_title_5',
        'legal.pp_sharing_text_5_1',
        [
          'legal.pp_sharing_bullet_5_1_1',
          'legal.pp_sharing_bullet_5_1_2',
          'legal.pp_sharing_bullet_5_1_3',
          'legal.pp_sharing_bullet_5_1_4',
          'legal.pp_sharing_bullet_5_1_5',
        ],
        'legal.pp_sharing_text_5_2',
        'legal.pp_sharing_text_5_3',
        [
          'legal.pp_sharing_bullet_5_3_1',
          'legal.pp_sharing_bullet_5_3_2',
        ],
        'legal.pp_sharing_title_6',
        'legal.pp_sharing_text_6_1',
        'legal.pp_sharing_text_6_2',
        [
          'legal.pp_sharing_bullet_6_1',
          'legal.pp_sharing_bullet_6_2',
          'legal.pp_sharing_bullet_6_3',
          'legal.pp_sharing_bullet_6_4',
          'legal.pp_sharing_bullet_6_5',
          'legal.pp_sharing_bullet_6_6',
        ],
        'legal.pp_sharing_text_6_3',
        'legal.pp_sharing_title_7',
        'legal.pp_sharing_text_7_1',
        'legal.pp_sharing_text_7_2',
        'legal.pp_sharing_title_8',
        'legal.pp_sharing_text_8_1',
        'legal.pp_sharing_text_8_2',
        'legal.pp_sharing_text_8_3',
        'legal.pp_sharing_title_9',
        'legal.pp_sharing_text_9',
        'legal.pp_sharing_title_10',
        'legal.pp_sharing_text_10',
        'legal.pp_sharing_title_11',
        'legal.pp_sharing_text_11',
      ],
    },
    {
      section_heading: 'legal.pp_other_heading',
      section_body: [
        'legal.pp_other_title_1',
        'legal.pp_other_text_1_1',
        'legal.pp_other_text_1_2',
        'legal.pp_other_title_2',
        'legal.pp_other_text_2_1',
        [
          'legal.pp_other_bullet_2_1',
          'legal.pp_other_bullet_2_2',
          'legal.pp_other_bullet_2_3',
          'legal.pp_other_bullet_2_4',
          'legal.pp_other_bullet_2_5',
          'legal.pp_other_bullet_2_6',
        ],
        'legal.pp_other_text_2_2',
        'legal.pp_other_title_3',
        'legal.pp_other_text_3',
        {
          a: 'legal.pp_other_link_a_3_1',
          text: 'legal.pp_other_link_text_3_1',
        },
        {
          a: 'legal.pp_other_link_a_3_2',
          text: 'legal.pp_other_link_text_3_2',
        },
      ],
    },
    {
      section_heading: 'legal.pp_third_party_heading',
      section_body: ['legal.pp_third_party_text'],
    },
    {
      section_heading: 'legal.pp_rights_heading',
      section_body: [
        'legal.pp_rights_intro',
        'legal.pp_rights_title_1',
        'legal.pp_rights_text_1',
        'legal.pp_rights_title_2',
        'legal.pp_rights_text_2',
        'legal.pp_rights_title_3',
        'legal.pp_rights_text_3',
        'legal.pp_rights_title_4',
        'legal.pp_rights_text_4',
        [
          'legal.pp_rights_bullet_4_1',
          'legal.pp_rights_bullet_4_2',
          'legal.pp_rights_bullet_4_3',
          'legal.pp_rights_bullet_4_4',
        ],
        'legal.pp_rights_title_5',
        'legal.pp_rights_text_5',
        [
          'legal.pp_rights_bullet_5_1',
          'legal.pp_rights_bullet_5_2',
          'legal.pp_rights_bullet_5_3',
          'legal.pp_rights_bullet_5_4',
        ],
        'legal.pp_rights_title_6',
        'legal.pp_rights_text_6_1',
        'legal.pp_rights_text_6_2',
        'legal.pp_rights_title_7',
        'legal.pp_rights_text_7',
      ],
    },
    {
      section_heading: 'legal.pp_international_heading',
      section_body: [
        'legal.pp_international_intro',
        'legal.pp_international_title',
        'legal.pp_international_text',
      ],
    },
    {
      section_heading: 'legal.pp_security_heading',
      section_body: ['legal.pp_security_text'],
    },
    {
      section_heading: 'legal.pp_changes_heading',
      section_body: ['legal.pp_changes_text'],
    },
    {
      section_heading: 'legal.pp_contact_heading',
      section_body: [
        'legal.pp_contact_text',
        {
          a: 'mailto:legal@zipcube.com',
          text: 'legal@zipcube.com',
        },
      ],
    },
  ],
};
