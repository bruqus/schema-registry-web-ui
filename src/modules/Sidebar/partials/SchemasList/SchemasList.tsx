import React, { FC, memo } from 'react';
import { Badge, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ROUTE_SCHEMA } from 'constants/routes';

import type { IListProps } from './types';

const SchemasList: FC<IListProps> = ({ schemas, isStale = false }) => {
  return (
    <List sx={{ overflowY: 'auto', opacity: isStale && schemas.length ? 0.75 : 1 }}>
      {schemas.length ? (
        schemas.map((schema) => {
          return (
            <li key={schema.subject}>
              <ListItem
                disablePadding
                component={NavLink}
                to={`${ROUTE_SCHEMA}/${schema.subject}/version/${schema.version}`}
                sx={{ '&.active': { color: '#a31515' } }}
              >
                <ListItemButton key={schema.subject}>
                  <ListItemText
                    primary={schema.subject}
                    sx={{
                      marginRight: 2,
                      '& > span': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                    title={schema.subject}
                  />
                  <Badge
                    badgeContent={'v' + schema.version}
                    color={schema.version > 1 ? 'success' : 'info'}
                    sx={{ marginRight: 1 }}
                  />
                </ListItemButton>
              </ListItem>
            </li>
          );
        })
      ) : (
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemText primary="Not found" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
};

export default memo(SchemasList);
