import * as Const from "../utils/Cons";
import moment from "moment";

export const blocks_columns = [
  {
    header: "Height",
    accessor: "header_height",
    numeric: false,
  },
  {
    header: "Block Hash",
    accessor: "block_id",
    numeric: false,
  },
  {
    header: "Proposer",
    accessor: "header_proposer_address",
    numeric: false,
  },
  {
    header: "TXs",
    accessor: "transactions_count",
    numeric: false,
  },
  {
    header: "Time",
    accessor: "header_time",
    numeric: false,
  },
];

export const transaction_columns = [
    {
    header: "Height",
    accessor: "hash",
    numeric: false,
  },
  {
    header: "Hash",
    accessor: "hash",
    numeric: false,
  },
  {
    header: "Type",
    accessor: "tx_type",
    numeric: false,
  },
  {
    header: "Code",
    accessor: "code",
    numeric: false,
  },
  {
    header: "Time",
    accessor: "header_time",
    numeric: false,
  },
  {
    header: "Status",
    accessor: "return_code",
    numeric: false,
  },
];

export const validator_columns = [
  {
    header: 'Address',
    accessor: 'hex_address',
    numeric: false,
  },
    {
    header: 'Operator',
    accessor: 'operator_address',
    numeric: false,
  },
  {
    header: 'Moniker',
    accessor: 'moniker',
    numeric: true,
  },
  {
    header: 'Tokens',
    accessor: 'tokens',
    numeric: true,
  },
];


export const proposal_columns = [
  {
    header: "Id",
    accessor: "proposal_id",
    numeric: true,
  },
  {
    header: "Type",
    accessor: "type",
    numeric: false,
  },
  {
    header: "Result",
    accessor: "result",
    numeric: false,
  },
  {
    header: "Creator",
    accessor: "creator",
    numeric: false,
  },
  {
    header: "Title",
    accessor: "title",
    numeric: false,
  },
  {
    header: "Epoch",
    accessor: "epoch",
    numeric: false,
  },

  {
    header: "Yes",
    accessor: "yay",
    numeric: false,
  },
  {
    header: "No",
    accessor: "nay",
    numeric: false,
  },
  {
    header: "Abstain",
    accessor: "abstain",
    numeric: false,
  },
  {
    header: "Data",
    accessor: "data",
    numeric: false,
  },
];

const txCodeMap = {
  '0000000000000000000000000000000000000000000000000000000000000000': 'Wrapper',
  '283fd236d971dd0f7ca1a329b508a4039946f40f1c9792863fe6b0fa05d74832': 'Reveal PKey',
  '0faaf9b55c150cdf8b2ea6a05c5fae725735b4fee44aa5da79bcd1881cb43f78': 'Deactivate Validator',
  '40e55cdef50e0771eb2b3cfe78b841d988345113f7fbeaa8b158de04589bb9fc': 'Delegate',
  'f76e025e52c75e34937e76fae43c6ed7544e2268e0bcdafeca0b05f9b7484b36': 'Change Validator Commission',
  '919be890123e9fbe7f85640811f3ca8edfebe94b7314118afbc84ff9c75ec488': 'Change Consensus Key',
  '1f0981a2ff60b5e9619c5464839d8d4e08dac72a8185a21285ae7f0e9498dd8c': 'Change Validator Metadata',
  '7655ed64d1b07900672aee307f679b35af77337c077648adc11914348d1f130f': 'Resign Steward',
  '66412b1b01b6659dc196bef86bdb540181d90c2f984a13597f0aa2a4f9c9c907': 'Bridge Pool',
  'ccdbe81f664ca6c2caa11426927093dc10ed95e75b3f2f45bffd8514fee47cd0': 'Vote Proposal',
  '4af7ca07f6e6f2ad87ffe2c5fca90224544c45cc263e2e4d05775d782cac1f48': 'Claim Rewards',
  '4afaa8c4ea6138a43d465ed09e86aedb16c54f63fd09a752a3aca5a26542e126': 'Redelegate',
  'f99df82e284dcb96a12b409bc43aa7dc77b346ab0b2d3f0a9a39807e749ce8ee': 'IBC',
  '0960374d23acbac1feb27b3888095859217936c900cef54e559d215cec3206ef': 'Transfer',
  'c94c4e6d549c921b9a483675f0e3af45eef79d4489bd35061fd285af6189b20d': 'Reactivate Validator',
  'ed0ccfa4a8c8fa86f9f14c3b53b7f126ce4a86849815dad784b5aa35011a1db6': 'Update Steward Commission',
  '5938c2b9962eb57bf309a604afc9aa6bc55851fd1791346c5c5795abaaa5f295': 'Init Validator',
  '51e79a8f5d39b40db8531610398a8631e27390d48af80c916382779d7b0e7e41': 'Init Account',
  'b0a4e44eb0e8e3a1af49ebd2b0483260c67a17f974c7517904e88897279d1b29': 'Init Proposal',
  '2b1451721dcdd069a19cba1f9b338bb6a45d85d0d56ba7ca952742d3ec5878b3': 'Unjail Validator',
  '70f91d4f778d05d40c5a56490ced906b016e4b7a2a2ef5ff0ac0541ff28c5a22': 'Update Account',
  '69560777e2656b2872a49080c51bb5b1a498a7ffd79dae491d36b301a1b012e6': 'Withdraw',
  'e39415d64bdc3c16f9b21ebee4e9496f8ce5cdd5551d1e611c449d8bfdcffae0': 'Unbond',
};

export const getTransactionTypeByHash = (transactionHash) => {
  const cleanedHash = transactionHash.replace(/\s+/g, '');
  const transactionType = txCodeMap[cleanedHash];
  return transactionType || 'Unknown';
};

const ReturnCodeDescriptions = {
  0: { description: 'Success', color: 'green' },
  1: { description: 'Error_1', color: 'red' },
  2: { description: 'Error_2', color: 'orange' },
  null: { description: '--', color: 'white' },
  default: { description: 'Unknown', color: 'white' }
};

export const getStatusByReturnCode = (code) => {
  const { description, color } = ReturnCodeDescriptions[code] || ReturnCodeDescriptions.default;
  return <span style={{ color: color, fontWeight: 'bold' }}>{description}</span>;
};


export const formatHashString = (data) => {
  if (data == null) {
    return '...';
  }
  if (data.length < 30) {
    return data;
  }

  const fistSymbol = data.slice(0, 20);
  const endSymbol = data.slice(data.length - 20);
  return fistSymbol + ' ... ' + endSymbol;
};
export const formatWeiDecimalNoSurplus = (value) => {
  return new Intl.NumberFormat().format(
    parseFloat(value / Const.DECIMAL_NAAN).toFixed(0)
  );
};
export function convertTimeStringToMilisecond(dateStr) {
  let dateObject = new Date(dateStr);
  return dateObject.getTime();
}

export function formatTimeToText(timestamp) {
  if (timestamp === 0) return "Didn't staked";
  const date = moment.duration(
    moment(new Date().getTime()).diff(moment(timestamp))
  );
  const day = date.days();
  const month = date.months();
  const year = date.years();
  const hour = date.hours();
  const minute = date.minutes();
  const second = date.seconds();

  if (year > 0) {
    if (year === 1) {
      return year + ' year ago';
    } else {
      return year + ' years ago';
    }
  } else if (month > 0) {
    if (month === 1) {
      return month + ' month ago';
    } else {
      return month + ' months ago';
    }
  } else if (day > 0) {
    if (day === 1) {
      return day + ' day ago';
    } else {
      return day + ' days ago';
    }
  } else if (hour > 0) {
    if (hour === 1) {
      return hour + ' hour ago';
    } else {
      return hour + ' hours ago';
    }
  } else if (minute > 0) {
    if (minute === 1) {
      return minute + ' min ago';
    } else {
      return minute + ' mins ago';
    }
  } else {
    if (second === 1) {
      return second + ' sec ago';
    } else {
      return second + ' secs ago';
    }
  }
}

async function fetchWithTimeout(resource, options, auth) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  let response;
  if (auth.length > 1) {
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer ' + auth,
      },
    });
  } else {
    response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
  }

  clearTimeout(id);
  return response;
}

export const getBlockDetail = async (block) => {
  const emptyData = {};
  try {
    let data = await fetchWithTimeout(
      Const.API_URL_GET_BLOCK_DETAIL + block,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch block detail data ' + e);
  }
  return emptyData;
};

export const getBlocks = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_BLOCKS,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch block data ' + e);
  }
  return emptyData;
};



export const getNetworkStatus = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data = await fetchWithTimeout(
      Const.RPC_STATUS,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return {
      network: data.result.node_info.network,
      latestBlockHeight: data.result.sync_info.latest_block_height,
      latestBlockTime: data.result.sync_info.latest_block_time,
    };
  } catch (e) {
    console.log('error to fetch network status data ' + e);
  }
  return emptyData;
};

export const getActiveValidator = async () => {
  const emptyData = '0';
  try {
    let data = await fetchWithTimeout(
      Const.RPC_VALIDATOR,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data.result.total;
  } catch (e) {
    console.log('error to fetch validator data ' + e);
  }
  return emptyData;
};

const parameterizedString = (...args) => {
  const str = args[0];
  const params = args.filter((arg, index) => index !== 0);
  if (!str) return '';
  return str.replace(/%s[0-9]+/g, (matchedStr) => {
    const variableIndex = matchedStr.replace('%s', '') - 1;
    return params[variableIndex];
  });
};
export const getBlockSignatures = async (block) => {
  const emptyData = JSON.parse(`[]`);
  try {
    const url = parameterizedString(Const.API_URL_GET_BLOCKS_SIGNATURES, block);

    let data = await fetchWithTimeout(
      url,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch signature data ' + e);
  }
  return emptyData;
};

export const getTransactions = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_TRANSACTIONS,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch transaction data ' + e);
  }
  return emptyData;
};

export const getTransactionsDetail = async (searchInput) => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data = await fetchWithTimeout(
      Const.API_URL_GET_TRANSACTION_DETAIL + searchInput,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch transaction data ' + e);
  }
  return emptyData;
};

export const getValidators = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_URL_GET_VALIDATORS,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data.validators;
  } catch (e) {
    console.log('error to fetch transaction data ' + e);
  }
  return emptyData;
};
export const getValidatorDetail = async (address) => {
  const emptyData = JSON.parse(`[]`);
  const url = parameterizedString(Const.API_URL_GET_VALIDATOR_DETAIL, address);
  try {
    let data;
    data = await fetchWithTimeout(
      url,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data;
  } catch (e) {
    console.log('error to fetch transaction data ' + e);
  }
  return emptyData;
};

export const getProposals = async () => {
  const emptyData = JSON.parse(`[]`);
  try {
    let data;
    data = await fetchWithTimeout(
      Const.API_PROPOSAL,
      {
        method: 'GET',
        timeout: 10000,
      },
      ''
    );
    data = await data.json();
    return data?.items;
  } catch (e) {
    console.log('error to fetch proposals ' + e);
  }
  return emptyData;
};
