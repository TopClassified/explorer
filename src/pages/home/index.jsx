import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Blocks from './blocks';

import BlockDetailPage from './blockDetail';
import './global.css';
import ProposalsPage from './proposals';
import TransactionsPage from './transactions';
import TransactionDetailPage from './transactionDetail';
import ValidatorPage from './validators';
import ValidatorDetailPage from './validatorDetail';


const HomePage = () => {
    useHistory();
    const [tab, setTab] = React.useState('1');


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('block')) {
      setTab('blockDetail');
    } else if (query.has('transaction')) {
      setTab('transactionDetail');
    } else if (query.has('validator')) {
      setTab('validatorDetail');
    } else {
      const pathName = window.location.pathname;
      if (pathName.startsWith('/blocks/')) {
        setTab('blocks');
      } else if (pathName.startsWith('/transactions')) {
        setTab('transactions');
      } else if (pathName.startsWith('/validators')) {
        setTab('validators');
      } else if (pathName.startsWith('/proposals')) {
        setTab('proposals');
      } else {
        setTab('blocks');
      }
    }
  }, []);

  function blocks() {
    return (
      <div>
        <Blocks />
      </div>
    );
  }

  function transactions() {
    return (
      <div>
        <TransactionsPage />
      </div>
    );
  }

  function validators() {
    return (
      <div>
        <ValidatorPage />
      </div>
    );
  }

  function proposals() {
    return (
      <div>
        <ProposalsPage />
      </div>
    );
  }

  function blockDetail() {
    return <BlockDetailPage />;
  }

  function transactionDetail() {
    return <TransactionDetailPage />;
  }

  function validatorDetail() {
    return <ValidatorDetailPage />;
  }

  function tabs() {
    const handleChange = (_event, newValue) => {
      setTab(newValue);
    };

    return (
      <Box sx={{ width: '100%', typography: 'body' }}>
        <TabContext value={tab}>
          <Box
            sx={{
              background: '#282828',
              position: 'sticky',
              zIndex: 999,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="tabNav"
              className="tab_style"
              sx={{
                  display: 'flex',
                  maxWidth: 1300,
                  marginTop:'0',
                  margin: 'auto',
                  width: '100%',
              }}
            >
              <Tab
                  sx={{
                      color: '#888',
                      fontSize: 22,
                      marginLeft: '25px'
                  }}
                label="Block"
                value="blocks"
              />
              <Tab
                  sx={{
                      color: '#888',
                      fontSize: 22,
                      marginLeft: '25px'
                  }}
                label="Transaction"
                value="transactions"
              />
              <Tab
                  sx={{
                      color: '#888',
                      fontSize: 22,
                      marginLeft: '25px'
                  }}
                label="Validator"
                value="validators"
              />
              <Tab
                  sx={{
                      color: '#888',
                      fontSize: 22,
                      marginLeft: '25px'
                  }}
                label="Proposal"
                value="proposals"
              />
            </TabList>
          </Box>
          <div className="body-container">
            <div
              style={{
                height: '100%',
                maxWidth: 1300,
                margin: 'auto',
              }}
            >
              <TabPanel value="blocks">{blocks()}</TabPanel>
              <TabPanel value="transactions">{transactions()}</TabPanel>
              <TabPanel value="validators">{validators()}</TabPanel>
              <TabPanel value="proposals">{proposals()}</TabPanel>
              <TabPanel value="blockDetail">{blockDetail()}</TabPanel>
              <TabPanel value="transactionDetail">{transactionDetail()}</TabPanel>
              <TabPanel value="validatorDetail">{validatorDetail()}</TabPanel>
            </div>
          </div>
        </TabContext>
      </Box>
    );
  }

  return <div>{tabs()}</div>;
};

export default HomePage;
