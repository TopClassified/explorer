import { useEffect, useState } from 'react';
import ProposalTable  from '../../components/table/proposal';
import * as Data from '../data';
import styles from './styles.module.css';
import * as Const from '../../utils/Cons';
import SearchBar from './searchBar';

const ProposalsPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    Data.getProposals().then((info) => {
      setPageData({
        rowData: info,
        isLoading: false,
      });
    });

    const intervalCall = setInterval(() => {
      Data.getProposals().then((info) => {
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
            {pageData.rowData?.length} Proposals
          </h1>
          <SearchBar/>
        </div>

      <div className={styles.table_content}>
        <ProposalTable
            columns={Data.proposal_columns}
            data={pageData.rowData}
            isLoading={pageData.isLoading}
        />
      </div>
    </div>
  );
};

export default ProposalsPage;
