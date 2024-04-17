import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import * as Data from '../data';
import SearchBar from './searchBar';
import styles from './styles.module.css';
import {getStatusByReturnCode,getTransactionTypeByHash} from "../data";


function formatData(data) {
  const style = {
    color: '#00adb2',
    fontWeight: 600,
    maxWidth: '700px',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    hyphens: 'auto'
  };

  const replacer = (key, value) => {
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return value;
  };

  if (typeof data === 'object' && data !== null) {
    const formattedJson = JSON.stringify(data, replacer, 2);
    const cleanJson = formattedJson.replace(/"\[/g, '[').replace(/\]"/g, ']').replace(/\\\"/g, '\"');
    return <pre style={style}><code>{cleanJson}</code></pre>;
  } else {
    return <span style={style}>{data}</span>;
  }
}

function Overview({ txDetail }) {
  if (!txDetail) {
    return <div>No Data Available</div>;
  }

  return (
      <Card variant="outlined" className={styles.overviewCard}>
        <table className={styles.overviewTable}>
          <tbody>
          <tr>
            <th>Block Id</th>
            <td>{txDetail.rowData.block_id}</td>
          </tr>
          <tr>
            <th>Wrapper Id</th>
            <td>{txDetail.rowData.wrapper_id || '--'}</td>
          </tr>
          <tr>
            <th>TX Type</th>
            <td>{txDetail.rowData.tx_type}</td>
          </tr>
          <tr>
            <th>Fee Amount</th>
            <td>{txDetail.rowData.fee_amount_per_gas_unit || '--'}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{getStatusByReturnCode(txDetail.rowData.return_code)}</td>
          </tr>
          <tr>
            <th>Code</th>
            <td>{getTransactionTypeByHash(txDetail.rowData.code)}</td>
          </tr>
          <tr>
            <th>Data</th>
            <td>{formatData(txDetail.rowData.data)}</td>
          </tr>
          </tbody>
        </table>
      </Card>
  );
}


const TxDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: {},
    isLoading: true,
  });
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = query.get('transaction');
    setTransaction(hash);

    Data.getTransactionsDetail(hash).then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
    });
  }, []);

  return (
    <>
      {pageData.isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Loader />
        </div>
      ) : (
          <div style={{margin: 'auto'}}>
            <div className={styles.pageContainer}>
              <SearchBar/>
              <Overview txDetail={pageData}/>
            </div>
          </div>
      )}
    </>
  );
};

export default TxDetailPage;
