import React, { FC } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ROUTE_SCHEMA } from 'constants/routes';

import styles from './SubjectsList.module.scss';
import type { IListProps } from './types';

const SubjectsList: FC<IListProps> = ({ subjects }) => {
  return (
    <List sx={{ overflowY: 'auto' }}>
      {subjects.length ? (
        subjects.map((subject) => {
          return (
            <li key={subject}>
              <ListItem
                disablePadding
                component={NavLink}
                to={`${ROUTE_SCHEMA}/${subject}`}
                className={styles.list__link}
              >
                <ListItemButton key={subject}>
                  <ListItemText
                    primary={subject}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={subject}
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

export default SubjectsList;
