import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from '@mui/material/Link';
import Loader from '../../components/loader';
import * as Data from '../data';
import SearchBar from './searchBar';
import styles from './styles.module.css';
import './global.css'

function BlockDetail({ blockDetail, signatures }) {
  const [value, setValue] = useState('1');
  function handleChange(_event, newValue) {
    setValue(newValue);
  }
  return (
      <Box sx={{ width: '80%', backgroundColor:'#ffffff' ,margin: '20px auto' ,borderRadius:'8px'}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Block data tabs"
                     className="tab_style"
                     sx={{
                       margin: 'auto',
                       '.MuiTab-root': {
                         color: '#848181',
                         fontSize: 18,
                         marginLeft: '25px',
                       },
                     }}
            >
              <Tab
                  sx={{
                    marginLeft: '25px'
                  }}
                  label="Overview" value="1" />
              <Tab label="Transactions" value="2" />
              <Tab label="Validators" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {Overview(blockDetail)}
          </TabPanel>
          <TabPanel value="2">
            {Transactions(blockDetail)}
          </TabPanel>
          <TabPanel value="3">
            {Signatures(signatures)}
          </TabPanel>
        </TabContext>
      </Box>
  );
}

function Overview(blockDetail ) {
  if (!blockDetail) {
    return <div>No Data Available</div>;
  }

  return (
      <Card variant="outlined" className={styles.overviewCard}>
        <table className={styles.overviewTable}>
            <tbody>
            <tr>
                <th>Block Height</th>
                <td>{blockDetail.header.height}</td>
            </tr>
            <tr>
                <th>Block ID</th>
                <td>{blockDetail.block_id}</td>
            </tr>
            <tr>
                <th>Block Time</th>
                <td>{blockDetail.header.time.replace("T", " ").split(".")[0]}</td>
            </tr>
            <tr>
                <th>TX Count</th>
                <td>{blockDetail.tx_hashes.length}</td>
            </tr>
            <tr>
                <th>Consensus Hash</th>
                <td >{blockDetail.header.consensus_hash}</td>
            </tr>
            <tr>
                <th>Data Hash</th>
                <td >{blockDetail.header.data_hash}</td>
            </tr>
            <tr>
                <th>Evidence Hash</th>
                <td >{blockDetail.header.evidence_hash}</td>
            </tr>
            <tr>
                <th>Validators Hash</th>
                <td >{blockDetail.header.validators_hash}</td>
            </tr>
            <tr>
                <th>Next Validators Hash</th>
                <td >
                    {blockDetail.header.next_validators_hash}
                </td>
            </tr>
            <tr>
                <th>Proposer Address</th>
                <td >{blockDetail.header.proposer_address}</td>
            </tr>
            <tr>
                <th>Last Results Hash</th>
                <td >
                    {blockDetail.header.last_results_hash}
                </td>
            </tr>
            <tr>
                <th>Last Block Id</th>
                <td>
                    {blockDetail.header.last_block_id.hash}
                </td>
            </tr>
            <tr>
                <th>Last Commit Hash</th>
                <td>{blockDetail.header.last_commit_hash}</td>
            </tr>
            </tbody>
        </table>
      </Card>
  );
}


function Transactions(rowData ) {
  if (!rowData || !rowData.tx_hashes) {
    return <div>No Transactions Found</div>;
  }

  return (
      <div>
        {rowData.tx_hashes.map((transaction, index) => (
            <div key={index} className={styles.transactionItem}>
              <Link href={`/?transaction=${transaction.hash_id}`} target="_blank">
                {transaction.hash_id} - {transaction.tx_type}
              </Link>
            </div>
        ))}
      </div>
  );
}

function Signatures(signatures) {
    return (
        <div>
            {signatures.map((signature, index) => (
                <div key={index} className={styles.signatureListItem}>
                    <Link href={`/?validator=${signature.validator_address}`} underline="hover">
                        {signature.validator_address}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default function BlockDetailPage() {
  const [blockData, setBlockData] = useState({ isLoading: true, data: null });

  useEffect(() => {
    const blockId = new URLSearchParams(window.location.search).get('block');
    Promise.all([
      Data.getBlockDetail(blockId),
      Data.getBlockSignatures(blockId)
    ]).then(([blockDetail, signatures]) => {
      setBlockData({ isLoading: false, data: { blockDetail, signatures } });
    });
  }, []);

  if (blockData.isLoading) {
      return (
          <div className={styles.loaderContainer}>
              <Loader />
          </div>
      );
  }

  return (
      <div className={styles.pageContainer}>
        <SearchBar />
        <BlockDetail {...blockData.data} />
      </div>
  );
}
