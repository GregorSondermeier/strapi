import React from 'react';
import { useIntl } from 'react-intl';
import { useAppInfos, SettingsPageTitle, useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { H3, Text, TableLabel } from '@strapi/design-system/Text';

import { Stack } from '@strapi/design-system/Stack';
import { Link } from '@strapi/design-system/Link';
import ExternalLink from '@strapi/icons/ExternalLink';

const ApplicationInfosPage = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  const appInfos = useAppInfos();
  const { shouldUpdateStrapi, latestStrapiReleaseTag, strapiVersion } = appInfos;

  const currentPlan = appInfos.communityEdition
    ? 'app.components.UpgradePlanModal.text-ce'
    : 'app.components.UpgradePlanModal.text-ee';

  return (
    <Layout>
      <SettingsPageTitle name="Application" />
      <Main>
        <HeaderLayout
          title={formatMessage({ id: 'Settings.application.title', defaultMessage: 'Application' })}
          subtitle={formatMessage({
            id: 'Settings.application.description',
            defaultMessage: "See your project's details",
          })}
        />
        <ContentLayout>
          <Box
            hasRadius
            background="neutral0"
            shadow="tableShadow"
            paddingTop={7}
            paddingBottom={7}
            paddingRight={6}
            paddingLeft={6}
          >
            <Stack size={5}>
              <H3>
                {formatMessage({
                  id: 'Settings.application.information',
                  defaultMessage: 'Information',
                })}
              </H3>

              <Grid paddingTop={1}>
                <GridItem col={6} s={12}>
                  <TableLabel textColor="neutral600">
                    {formatMessage({
                      id: 'Settings.application.details',
                      defaultMessage: 'details',
                    })}
                  </TableLabel>
                  <Text as="p">v{strapiVersion}</Text>
                </GridItem>
                <GridItem col={6} s={12}>
                  <TableLabel textColor="neutral600">
                    {formatMessage({
                      id: 'Settings.application.edition-title',
                      defaultMessage: 'current plan',
                    })}
                  </TableLabel>
                  <Text as="p">
                    {formatMessage({
                      id: currentPlan,
                      defaultMessage: `${
                        appInfos.communityEdition ? 'Community Edition' : 'Enterprise Edition'
                      }`,
                    })}
                  </Text>
                </GridItem>
              </Grid>

              <Grid paddingTop={1}>
                <GridItem col={6} s={12}>
                  {shouldUpdateStrapi && (
                    <Link
                      href={`https://github.com/strapi/strapi/releases/tag/${latestStrapiReleaseTag}`}
                      endIcon={<ExternalLink />}
                    >
                      {formatMessage({
                        id: 'Settings.application.link-upgrade',
                        defaultMessage: 'Upgrade your admin panel',
                      })}
                    </Link>
                  )}
                </GridItem>
                <GridItem col={6} s={12}>
                  <Link href="https://strapi.io/pricing-self-hosted" endIcon={<ExternalLink />}>
                    {formatMessage({
                      id: 'Settings.application.link-pricing',
                      defaultMessage: 'See all pricing',
                    })}
                  </Link>
                </GridItem>
              </Grid>

              <Box paddingTop={1}>
                <TableLabel textColor="neutral600">
                  {formatMessage({
                    id: 'Settings.application.node-version',
                    defaultMessage: 'node version',
                  })}
                </TableLabel>
                <Text as="p">{appInfos.nodeVersion}</Text>
              </Box>
            </Stack>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  );
};

export default ApplicationInfosPage;