import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.css';
import * as Utils from '../../utils/utils';

export default function SearchBar() {
  const [searchInput, setSearchInput] = React.useState('');
  const [isSearch, setIsSearch] = React.useState(false);

  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value.trim().length == 0) {
      setIsSearch(false);
    }
  };

  const submitSearch = () => {
    if (searchInput.length > 0) {
      setIsSearch(true);
      let url = Utils.getDomain() + '/search';
      // search block
      if (Utils.isNumeric(searchInput)) {
        // window.open(Utils.getDomain() + "?block=" + searchInput);
        url += '?block=' + searchInput;
      } else if (searchInput.length > 60) {
        url += '?transaction=' + searchInput;
        // window.open(Utils.getDomain() + "?transaction=" + searchInput);
      } else if (searchInput.length >= 40 && searchInput.length < 60) {
        url += '?validator=' + searchInput;
        // window.open(Utils.getDomain() + "?validator=" + searchInput);
      }

      window.location.href = url;
    }
  };
  return (
    <div className={styles.search}>
      <TextField
        className="qqq"
        label={
          <span style={{ color: '#808080' }}>
            height / transaction / validator
          </span>
        }
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={handleChangeSearchInput}
        onKeyUp={(event) => {
          if (event.key === 'Enter') submitSearch();
        }}
        InputProps={{
          style: { color: '#fff', borderRadius: 12 },
          endAdornment: (
            <IconButton onClick={() => submitSearch()}>
              <SearchIcon style={{ color: '#fff' }} />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
