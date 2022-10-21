'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/viewConfiguration',
      handler: 'upload-config.getViewConfiguration',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'PUT',
      path: '/viewConfiguration',
      handler: 'upload-config.updateViewConfiguration',
      config: {
        policies: [
          'admin::isAuthenticatedAdmin',
          {
            name: 'admin::hasPermissions',
            config: {
              actions: ['plugin::upload.configure-view'],
            },
          },
        ],
      },
    },
  ],
};
