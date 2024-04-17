import React, { useState, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';
import Loader from '../loader';
import styles from './styles.module.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const capitalizeFirstLetter = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

const ProposalTable = ({ columns, data, isLoading }) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('proposal_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [expandedCells, setExpandedCells] = useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    } else if (b[orderBy] > a[orderBy]) {
      return 1;
    } else {
      return 0;
    }
  };

  const getComparator = () => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const sortedData = useMemo(() => stableSort(data, getComparator()), [data, order, orderBy]);

  const EnhancedTableHead = () => (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
              <TableCell
                  key={column.accessor}
                  align="center"
                  sortDirection={orderBy === column.accessor ? order : false}
                  style={{ color: 'white', fontSize: '16px' }}
              >
                <TableSortLabel
                    active={orderBy === column.accessor}
                    direction={orderBy === column.accessor ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, column.accessor)}
                    style={{ color: 'white' }}
                    IconComponent={(props) => <ArrowDownwardIcon style={{ color: orderBy === column.accessor ? '#fff' : 'inherit' }} {...props} />}
                >
                  {column.header}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );

  return (
      <>
        {isLoading ? <Loader /> : (
            <Box>
              <Paper sx={{ width: '100%', overflowX: 'auto', borderRadius: '10px', background: '#0b0118' }}>
                <TableContainer>
                  <Table className={styles.table} sx={{ minWidth: 1600 }} aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead />
                    <TableBody>
                      {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                          <TableRow hover key={row.proposal_id}>
                            {columns.map((column, columnIndex) => {
                              let cellContent = row[column.accessor] || '--';
                              const isExpanded = !!expandedCells[`${rowIndex}_${columnIndex}`];
                              let cellStyle = {
                                cursor: 'pointer',
                                whiteSpace: isExpanded ? 'normal' : 'nowrap',
                                overflow: isExpanded ? 'visible' : 'hidden',
                                textOverflow: isExpanded ? 'clip' : 'ellipsis',
                                maxWidth: isExpanded ? 'none' : '200px',
                              };
                              if (['yay', 'nay', 'abstain'].includes(column.accessor)) {
                                const totalVotes = parseFloat(row.yay || 0) + parseFloat(row.nay || 0) + parseFloat(row.abstain || 0);
                                cellContent = totalVotes > 0 ? `${((parseFloat(row[column.accessor] || 0) / totalVotes) * 100).toFixed(2)}%` : '--';
                              } else if (column.accessor === 'epoch') {
                                cellContent = `${row.start_epoch}/${row.end_epoch}/${row.grace_epoch}`;
                              } else if (column.accessor === 'status') {
                                cellContent = capitalizeFirstLetter(row[column.accessor] || '--');
                              }
                              else if (column.accessor === 'result') {
                                switch(cellContent) {
                                    case 'Pending':
                                      cellStyle.color = '#709cef';
                                      cellStyle.fontWeight = 'bold';
                                      break;
                                    case 'Rejected':
                                      cellStyle.color = '#f16e6e';
                                      cellStyle.fontWeight = 'bold';
                                      break;
                                    case 'Passed':
                                      cellStyle.color = '#00adb2';
                                      cellStyle.fontWeight = 'bold';
                                      break;
                                  default:
                                    cellStyle.color = 'white';
                                }
                              }

                              return (
                                  <TableCell
                                      key={`${column.accessor}_${columnIndex}`}
                                      align="center"
                                      style={cellStyle}
                                      onClick={() => {
                                        const newExpandedCells = {...expandedCells, [`${rowIndex}_${columnIndex}`]: !isExpanded};
                                        setExpandedCells(newExpandedCells);
                                      }}
                                  >
                                    {cellContent}
                                  </TableCell>
                              );
                            })}
                          </TableRow>
                      ))}
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
                    style={{ color: 'lightgray', fontSize: '14px' }}
                />
              </Paper>
            </Box>
        )}
      </>
  );
};

export default ProposalTable;
