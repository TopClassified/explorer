import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import * as Data from '../../pages/data';
import Loader from '../loader';
import styles from './styles.module.css';

export const BlockTable = ({ columns, data, isLoading }) => {

  function TableHeadComponent() {
    return (
        <TableHead>
          <TableRow>
            {columns.map((headCell) => (
                <TableCell
                    key={headCell.accessor}
                    align={'center'}
                >
                  {headCell.header}
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
    );
  }

  function Row(props) {
    const { row } = props;
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
          <TableCell align="center">
            <Link
                target="_blank"
                underline="hover"
                href={window.location.origin + '?block=' + row.header_height}
                className={styles.link}
            >
              <span style={{ fontSize: '16px' }}>{row.header_height}</span>
            </Link>
          </TableCell>
          <TableCell align="center">
            <span style={{ fontSize: '16px' }}>{Data.formatHashString(row.block_id)}</span>
          </TableCell>
          <TableCell align="center">
            <Link
                target="_blank"
                underline="hover"
                href={window.location.origin + '?validator=' + row.header_proposer_address}
                className={styles.link}
            >
              <span style={{ fontSize: '16px' }}>{row.header_proposer_address}</span>
            </Link>
          </TableCell>
          <TableCell align="center">
            <span style={{ fontSize: '16px' }}>{row.transactions_count}</span>
          </TableCell>
          <TableCell align="center">
          <span style={{ fontSize: '16px' }}>
            {Data.formatTimeToText(
                Data.convertTimeStringToMilisecond(row.header_time)
            )}
          </span>
          </TableCell>
        </TableRow>
    );
  }

  return (
      <>
        {isLoading || data.length === 0 ? (
            <Loader />
        ) : (
            <Box>
              <Paper style={{ borderRadius: '10px' }}>
                <TableContainer style={{ borderRadius: 9 }}>
                  <Table
                      className={styles.table}
                      sx={{ minWidth: 850 }}
                      aria-labelledby="tableTitle"
                  >
                    <TableHeadComponent />
                    <TableBody>
                      {data.map((row, index) => (
                          <Row key={index} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
        )}
      </>
  );
};

export default BlockTable;
