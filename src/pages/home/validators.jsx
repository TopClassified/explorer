import React, { useState, useEffect } from 'react';
import * as Data from '../data';
import styles from './styles.module.css';
import ValidatorTable from '../../components/table/validator';
import * as Const from '../../utils/Cons';
import SearchBar from './searchBar';

const ValidatorPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    pageNumber: 1,
    totalPassengers: 0,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    Data.getValidators().then((info) => {
      const totalPassengers = info.length;
      setPageData({
        isLoading: false,
        rowData: info,
        totalPassengers: totalPassengers,
      });
    });

    const intervalCall = setInterval(() => {
      Data.getValidators().then((info) => {
        const totalPassengers = info.length;
        setPageData({
          isLoading: false,
          rowData: info,
          totalPassengers: totalPassengers,
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
            {pageData.rowData?.length} Active Validators
          </h1>
          <SearchBar/>
        </div>
        <div className={styles.table_content}>
          <ValidatorTable
              columns={Data.validator_columns}
              data={pageData.rowData}
              isLoading={pageData.isLoading}
          />
        </div>
      </div>
  );
};

export default ValidatorPage;
