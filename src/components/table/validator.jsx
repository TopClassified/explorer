import React, { useState, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Link } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Loader from '../loader';
import * as Data from '../../pages/data';
import styles from './styles.module.css';

export const ValidatorTable = ({ columns, data, isLoading }) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('tokens');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (a[orderBy] < b[orderBy]) {
      return 1;
    } else if (a[orderBy] > b[orderBy]) {
      return -1;
    } else {
      return 0;
    }
  };

  const getComparator = () => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = useMemo(() => {
    const stabilizedThis = data.map((el, index) => [el, index]);
    return stabilizedThis.sort((a, b) => {
      const order = getComparator()(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    }).map((el) => el[0]);
  }, [data, getComparator]);

  return (
      <>
        {isLoading ? <Loader /> : (
            <Box>
              <Paper style={{ borderRadius: '10px', background: 'rgb(49, 49, 49)' }}>
                <TableContainer style={{ borderRadius: 9 }}>
                  <Table className={styles.table} aria-labelledby="tableTitle" size="small">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.accessor}
                                align="center"
                                sortDirection={orderBy === column.accessor ? order : false}
                            >
                              <TableSortLabel
                                  active={orderBy === column.accessor}
                                  direction={orderBy === column.accessor ? order : 'asc'}
                                  onClick={(event) => handleRequestSort(event, column.accessor)}
                                  style={{ color: 'white' }}
                                  IconComponent={props => <ArrowDownwardIcon {...props} style={{ color: orderBy === column.accessor ? '#fff' : 'inherit' }} />}
                              >
                                {column.header}
                              </TableSortLabel>
                            </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell align="center">
                              <Link target="_blank" underline="hover" href={`${window.location.origin}?validator=${row.hex_address}`} className={styles.link}>
                                {row.hex_address}
                              </Link>
                            </TableCell>
                            <TableCell align="center">{row.operator_address}</TableCell>
                            <TableCell align="center">{row.moniker}</TableCell>
                            <TableCell align="center">{Data.formatWeiDecimalNoSurplus(row.tokens)}</TableCell>
                          </TableRow>
                      ))}
                      {page > 0 && data.length - page * rowsPerPage < rowsPerPage && (
                          <TableRow style={{ height: 53 * (rowsPerPage - data.length + page * rowsPerPage) }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ color: '#fff' }}
                    className={styles.pagination}
                    rowsPerPageOptions={[25, 50, 100]}
                />
              </Paper>
            </Box>
        )}
      </>
  );
};

export default ValidatorTable;
