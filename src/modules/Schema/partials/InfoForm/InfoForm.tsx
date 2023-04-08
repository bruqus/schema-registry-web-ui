import React, { FC, useMemo } from 'react';
import { JSONTree } from 'react-json-tree';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';

import { theme } from './store';
import { parseSchema } from './helpers';
import type { ISchemaInfoProps } from './types';

const InfoForm: FC<ISchemaInfoProps> = ({ schema }) => {
  const parsedSchema: Record<string, unknown> | null = useMemo(
    () => parseSchema(schema?.schema),
    [schema?.schema],
  );

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2} border={1} borderColor="lightgrey">
        {Object.entries(parsedSchema ?? {}).map(([key, value]) => {
          if (key === 'fields') return;
          return (
            <Typography key={key} component="div">
              <Typography fontWeight="bold" component="span">
                {key}:
              </Typography>
              {' ' + String(value)}
            </Typography>
          );
        })}
      </Box>

      {parsedSchema && (
        <TableContainer component={Box} mt={2}>
          <Table aria-label="simple table" size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ minWidth: 150 }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ minWidth: 150 }}>
                  Type
                </TableCell>
                <TableCell align="left" sx={{ minWidth: 100 }}>
                  Default
                </TableCell>
                <TableCell align="left">Documentation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(parsedSchema?.fields as Record<string, string>[])?.map((field) => (
                <TableRow key={field.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{field.name}</TableCell>
                  <TableCell align="left">
                    {typeof field.type === 'string' ? (
                      field.type
                    ) : (
                      <JSONTree data={{ type: field.type }} theme={theme} hideRoot />
                    )}
                  </TableCell>
                  <TableCell align="left">{field.default}</TableCell>
                  <TableCell align="left">{field.doc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default InfoForm;
