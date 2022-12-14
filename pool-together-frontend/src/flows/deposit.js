import { Input, InputGroup, InputRightAddon, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Tag } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { connect } from "@argent/get-starknet";
import ERC20StarkToken from '../const/ERC20-stark-token.json';
import { Contract } from "starknet";
import { getChecksumAddress, stark } from 'starknet';
import { toFelt, toBN } from 'starknet/utils/number';
import { bnToUint256 } from 'starknet/utils/uint256';


/**
 * @description Handles depositing money to the chain
 * @param {Array} depositorAccountsDetails Array of connected account details
 * @param {number} depositMoney value to be deposited
 */
// function depositMoney(depositorAccountsDetails, depositMoney) {
//   console.log(depositorAccountsDetails, depositMoney);
// }

export default function Deposit () {
  
  //account controls
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [account, setAccount] = React.useState(false);

  //balance controls
  const [isFetching, setIsFetching] = React.useState(false);
  const [currentBalance, setCurrentBalance] = React.useState('');
 
  // deposit controls
  const [depositAmount, setDepositAmount] = React.useState('');
  const [depositorAccountsDetails, setDepositorAccountsDetails] = React.useState('');
  const [provider, setProvider] = React.useState('');

  // Handler function for wallet connection
  const createConnection = async () => {
    setIsConnecting(true);
    const starknet = await connect();
    const accountDetails = await starknet.enable();
    if (starknet.isConnected) {
      setIsConnecting(false);
      setIsConnected(true);
    }
    if (accountDetails) {
      setDepositorAccountsDetails(accountDetails);
    }
    if (starknet.account) {
      setAccount(starknet.account);
    }
    if (starknet && starknet.provider) {
      console.log('provider', starknet.provider)
      setProvider(starknet.provider);
    }
  };

  /**
   * @description This function is used to control deposit input behavior
   * @param {object} event input onchange event
   * @returns undefined
   */
  const handleChange = (event) => setDepositAmount(event.target.value);

  /**
   * @description On the process of depositing balance, this function enables connecting
   * to the wallet to access account details
   */
  const viewBalance = async () => {
    setIsFetching(true);
    const erc20 = new Contract(ERC20StarkToken.abi, '0x052dd98d784ca4e00d38dd0852918d6aaff2b8755c7e458aacef8a38133827b8', provider);
    // holds account details that will be sent to the contract along with deposit value
    const balanceBeforeTransfer = await erc20.balanceOf(depositorAccountsDetails[0]);
    const balance = toFelt(balanceBeforeTransfer[0].low) / 10 ** 18;
    setCurrentBalance(balance);
    setIsFetching(false);
  };

  // handler for deposit function
  const handleDeposit = async () => {}

  // handler for mint function
  const mintFN = async () => {
    const erc20 = new Contract(ERC20StarkToken.abi, '0x052dd98d784ca4e00d38dd0852918d6aaff2b8755c7e458aacef8a38133827b8', provider);
    const tmpAddress =getChecksumAddress(depositorAccountsDetails[0]);
    const tmpNumber = bnToUint256(toBN(33));

    const executeHash = await account.execute(
      {
        contractAddress: '0x052dd98d784ca4e00d38dd0852918d6aaff2b8755c7e458aacef8a38133827b8',
        entrypoint: 'mint',
        calldata: stark.compileCalldata({
          recipient: tmpAddress,
          amount: ['10']
        })
      }
    );
    
    const tx = await provider.waitForTransaction(executeHash.transaction_hash);
    console.log(tx);
  };

  return (
    <>

    <Tabs>
      <TabList>
        <Tab>Connect</Tab>
        <Tab>Deposit</Tab>
        <Tab>Mint</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Button isLoading={isConnecting} colorScheme='green' onClick={createConnection}>
            {isConnected ? 'Connected' : 'Connect'}
          </Button>
        </TabPanel>
        <TabPanel>
          <div style={{ display: 'flex'}}>
            <Button size='sm' isLoading={isFetching} colorScheme='blue' onClick={viewBalance}>View Balance</Button>
              &nbsp;&nbsp;
              {isConnected ? <Tag height='16px' size='sm' variant='outline' colorScheme='green'>Connected</Tag>
               : <Tag height='16px' size='sm' variant='outline' colorScheme='red'>Disconnected</Tag>
              }
            
          </div>
          {currentBalance && (<><br /><Text>Current balance is: {currentBalance} STARK</Text></>)}
          <br />
          <br />
          <InputGroup size='sm'>
            <Input type='number' value={depositAmount} onChange={handleChange} placeholder='Eg. 100 STARK' />
            <InputRightAddon children='STARK' />
          </InputGroup>
          <br />
          <Button colorScheme='blue' onClick={handleDeposit} isDisabled={!depositAmount}>Deposit</Button>
        </TabPanel>
        <TabPanel>
          <Button colorScheme='green' onClick={mintFN}>Mint</Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
}