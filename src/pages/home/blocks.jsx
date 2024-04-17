import { useEffect, useState } from 'react';
import BlockTable from '../../components/table/block';
import * as Const from '../../utils/Cons';
import * as Data from '../data';
import SearchBar from './searchBar';
import styles from './styles.module.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function NetStatus({ title, content, is_end }) {
  return (
      <div
          style={{
            borderRight: is_end ? 'none' : '1px solid #ddd',
            margin: '10px 0',
            textAlign: 'center',
            fontSize: '20px'
          }}
      >
        <div>{title}</div>
        <div>{content}</div>
      </div>
  )
}

const Blocks = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    pageNumber: 1,
    totalPassengers: 0,
  });

  const [network, setNetwork] = useState({
    network: '',
    latestBlockHeight: 0,
    latestBlockTime: '',
  });

  const [activeValidator, setActiveValidator] = useState(0);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    loadBlock();
    const intervalCall = setInterval(() => {
      loadBlock();
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    Data.getNetworkStatus().then((info) => {
      setNetwork(info);
    });

    const intervalCall = setInterval(() => {
      Data.getNetworkStatus().then((info) => {
        setNetwork(info);
      });
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  useEffect(() => {
    Data.getActiveValidator().then((info) => {
      setActiveValidator(info);
    });
    const intervalCall = setInterval(() => {
      Data.getActiveValidator().then((info) => {
        setActiveValidator(info);
      });
    }, Const.TIME_RELOAD);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  function loadBlock() {
    Data.getBlocks().then((info) => {
      const totalPassengers = info.length;
      setPageData({
        isLoading: false,
        rowData: info,
        totalPassengers: totalPassengers,
      });
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center' }}>
        <h1
          style={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 600,
          }}
        >
          Namada Blockchain Explorer
        </h1>
        <SearchBar />
      </div>

      <div className={styles.page_header}>
        <Card
          style={{
            width: '100%',
            borderRadius: 8,
            marginBottom: 30,
            marginTop: 30,
            background: 'rgb(49, 49, 49)',
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <NetStatus
                  is_end={false}
                  title={<div className={styles.status_type}>Chain Id</div>}
                  content={
                    <div
                      className={styles.status_info}
                    >
                      {network.network}
                    </div>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NetStatus
                  is_end={false}
                  title={
                    <div className={styles.status_type}>
                      Block Height
                    </div>
                  }
                  content={
                    <div className={styles.status_info}>
                      {network.latestBlockHeight}
                    </div>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NetStatus
                  is_end={false}
                  title={
                    <div className={styles.status_type}>
                      Block Time
                    </div>
                  }
                  content={
                    <div className={styles.status_info}>
                      {network.latestBlockTime.replace("T"," ").split(".")[0]}
                    </div>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NetStatus
                  is_end={true}
                  title={
                    <div className={styles.status_type}>Active Validators</div>
                  }
                  content={
                    <div className={styles.status_info}>{activeValidator}</div>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <div className={styles.table_content}>
        <BlockTable
          columns={Data.blocks_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default Blocks;
