import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Loader from '../../components/loader';
import * as Data from '../data';
import styles from './styles.module.css';
import SearchBar from './searchBar';

function ValidatorDetail({ validatorDetail }) {
  return (
    <Box sx={{ width: '100%' }}>
      {Overview(validatorDetail)}
    </Box>
  );
}

function Overview(validatorInfo) {
  return (
    <div className={styles.validator_overview}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ background: 'rgb(49, 49, 49)', borderRadius: 8, padding: 20,width:'80%',margin: 'auto',marginTop:'20px' }}>
            <table className={styles.validator_overview_table}>
              <tbody>
              <tr>
                <th>Tendermint Address</th>
                <td style={{color: '#00adb2'}}>{validatorInfo.tendermint_address}</td>
              </tr>
              <tr>
                <th>Operator Address</th>
                <td style={{color: '#00adb2'}}>{validatorInfo.operator_address}</td>
              </tr>
              <tr>
                <th>Current State</th>
                <td>{validatorInfo.state}</td>
              </tr>
              <tr>
                <th>Voting Power</th>
                <td>{Data.formatWeiDecimalNoSurplus(validatorInfo.voting_power)}</td>
              </tr>
              <tr>
                <th>Commission Rate</th>
                <td>{validatorInfo.commission_rate}</td>
              </tr>
              <tr>
                <th>Max Commission Change</th>
                <td>{validatorInfo.max_commission_change}</td>
              </tr>
              <tr>
                <th>Operator Email</th>
                <td>{validatorInfo.email}</td>
              </tr>
              {validatorInfo.description && (
                  <tr>
                    <th>Description</th>
                    <td>{validatorInfo.description}</td>
                  </tr>
              )}
              {validatorInfo.website && (
                  <tr>
                    <th>Website</th>
                    <td>
                      <a href={validatorInfo.website} target="_blank" rel="noopener noreferrer"
                         style={{color: '#00adb2'}}>
                        {validatorInfo.website}
                      </a>
                    </td>
                  </tr>
              )}
              {validatorInfo.discord_handle && (
                  <tr>
                    <th>Discord</th>
                    <td>{validatorInfo.discord_handle}</td>
                  </tr>
              )}
              </tbody>
            </table>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const ValidatorDetailPage = () => {
  const [validatorDetail, setValidatorDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const validator = query.get('validator');
    loadValidatorDetail(validator);
  }, []);

  const loadValidatorDetail = async (validator) => {
    setIsLoading(true);
    try {
      const info = await Data.getValidatorDetail(validator);
      setValidatorDetail(info);
    } catch (error) {
      console.error('Failed to fetch validator details', error);
    }
    setIsLoading(false);
  };

  return (
      <>
      {isLoading ? (
          <div style={{textAlign: 'center'}}>
            <Loader/>
          </div>
      ) : (
          <div style={{margin: 'auto'}}>
            <div className={styles.pageContainer}>
              <SearchBar/>
              <ValidatorDetail validatorDetail={validatorDetail}/>
            </div>
          </div>
  )
}
</>
)
  ;
};

export default ValidatorDetailPage;
