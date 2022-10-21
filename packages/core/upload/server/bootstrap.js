'use strict';

const { getService } = require('./utils');

module.exports = async ({ strapi }) => {
  const CoreSettingsEntries = [
    {
      key: 'settings',
      defaultValue: {
        sizeOptimization: true,
        responsiveDimensions: true,
        autoOrientation: false,
      },
    },
    {
      key: 'config',
      defaultValue: {
        pageSize: 10,
      },
    },
  ];
  for (const setting of CoreSettingsEntries) {
    // set plugin store
    const configurator = strapi.store({ type: 'plugin', name: 'upload', key: setting.key });

    // if provider config does not exist set one by default
    const config = await configurator.get();

    if (!config) {
      await configurator.set({
        value: setting.defaultValue,
      });
    }
  }

  await registerPermissionActions();

  await getService('metrics').registerCron();
};

const registerPermissionActions = async () => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access the Media Library',
      uid: 'read',
      pluginName: 'upload',
    },
    {
      section: 'plugins',
      displayName: 'Create (upload)',
      uid: 'assets.create',
      subCategory: 'assets',
      pluginName: 'upload',
    },
    {
      section: 'plugins',
      displayName: 'Update (crop, details, replace) + delete',
      uid: 'assets.update',
      subCategory: 'assets',
      pluginName: 'upload',
    },
    {
      section: 'plugins',
      displayName: 'Download',
      uid: 'assets.download',
      subCategory: 'assets',
      pluginName: 'upload',
    },
    {
      section: 'plugins',
      displayName: 'Copy link',
      uid: 'assets.copy-link',
      subCategory: 'assets',
      pluginName: 'upload',
    },
    {
      section: 'plugins',
      displayName: 'Configure view',
      uid: 'configure-view',
      pluginName: 'upload',
    },
    {
      section: 'settings',
      displayName: 'Access the Media Library settings page',
      uid: 'settings.read',
      category: 'media library',
      pluginName: 'upload',
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
