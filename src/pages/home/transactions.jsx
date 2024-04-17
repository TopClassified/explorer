import React, { useState, useEffect } from 'react';
import * as Data from '../data';
import styles from './styles.module.css';
import TransactionTable from '../../components/table/transaction';
import * as Const from '../../utils/Cons';
import SearchBar from './searchBar';

const TransactionsPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    Data.getTransactions().then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
    });

    const intervalCall = setInterval(() => {
      Data.getTransactions().then((info) => {
        setPageData({
          rowData: info,
          isLoading: false,
        });
      });
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginBottom:'20px'
      }}>
        <h1
            style={{
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 600,
            }}
        >
          {pageData.rowData?.length} Latest Transactions
        </h1>
        <SearchBar/>
      </div>
      <div className={styles.table_content}>
        <TransactionTable
            columns={Data.transaction_columns}
            data={pageData.rowData}
            isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
