/* global $ */

const mockRoutes = () => {
    $.mockjax({
        url: '/api/v1/recentbookings',
        responseText: {
            userLocale: 'en',
            location: 'London',
        },
    });
};

export default mockRoutes;
