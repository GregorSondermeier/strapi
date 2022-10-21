import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Select, Option } from '@strapi/design-system/Select';

import getTrad from '../../../../utils/getTrad';

const Settings = ({ pageSize = '', onChange }) => {
  const { formatMessage } = useIntl();

  return (
    <Grid gap={4}>
      <GridItem s={12} col={6}>
        <Select
          label={formatMessage({
            id: getTrad('config.entries.title'),
            defaultMessage: 'Entries per page',
          })}
          hint={formatMessage({
            id: getTrad('config.entries.note'),
            defaultMessage: 'Note: You can override this value in the media library.',
          })}
          onChange={(value) => onChange({ target: { name: 'pageSize', value } })}
          name="pageSize"
          value={pageSize}
        >
          {[10, 20, 50, 100].map((pageSize) => (
            <Option key={pageSize} value={pageSize}>
              {pageSize}
            </Option>
          ))}
        </Select>
      </GridItem>
    </Grid>
  );
};

Settings.propTypes = {
  pageSize: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(Settings);
