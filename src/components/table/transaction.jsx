import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import * as Data from '../../pages/data';
import Loader from '../loader';
import styles from './styles.module.css';
import {getStatusByReturnCode, getTransactionTypeByHash} from "../../pages/data";

export const TransactionTable = ({ columns, data, isLoading }) => {
  React.useMemo(() => columns, [columns]);
  const rowData = React.useMemo(() => data, [data]);

  function TableHeader() {
    return (
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((headCell) => (
                <TableCell
                    key={headCell.accessor}
                    align="center"
                >
                  {headCell.header}
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
    );
  }

  function Row({ row }) {
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.header_height}
        >
          <TableCell/>
          <TableCell align="center">
            <Link
                target="_blank"
                underline="hover"
                href={`${window.location.origin}?block=${row.header_height}`}
                className={styles.link}
            >
              {row.header_height}
            </Link>
          </TableCell>
          <TableCell align="center">
            <Link
                target="_blank"
                underline="hover"
                href={`${window.location.origin}?transaction=${row.hash}`}
                className={styles.link}
            >
              {Data.formatHashString(row.hash)}
            </Link>
          </TableCell>
          <TableCell align="center">{row.tx_type}</TableCell>
          <TableCell align="center">{getTransactionTypeByHash(row.code)}</TableCell>
          <TableCell align="center">
            {Data.formatTimeToText(
                Data.convertTimeStringToMilisecond(row.header_time)
            )}
          </TableCell>
          <TableCell align="center">{getStatusByReturnCode(row.return_code)}</TableCell>
        </TableRow>
    );
  }

  return (
      <>
        {isLoading || rowData.length === 0 ? (
            <Loader />
        ) : (
            <Box>
              <Paper style={{ borderRadius: '10px' }}>
                <TableContainer style={{ borderRadius: 9 }}>
                  <Table
                      className={styles.table}
                      sx={{ minWidth: 850 }}
                      aria-labelledby="tableTitle"
                      size="small"
                  >
                    <TableHeader />
                    <TableBody>
                      {rowData.map((row, index) => (
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

export default TransactionTable;
