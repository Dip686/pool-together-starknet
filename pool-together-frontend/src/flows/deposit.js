import { Input, InputGroup, InputRightAddon, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { connect } from "@argent/get-starknet";
import ERC20StarkToken from '../const/ERC20-stark-token.json';
import { Contract, stark } from "starknet";
import { toFelt } from 'starknet/utils/number';


/**
 * @description Handles depositing money to the chain
 * @param {Array} depositorAccountsDetails Array of connected account details
 * @param {number} depositMoney value to be deposited
 */
// function depositMoney(depositorAccountsDetails, depositMoney) {
//   console.log(depositorAccountsDetails, depositMoney);
// }

export default function Deposit () {
  const [depositAmount, setDepositAmount] = React.useState('');
  const [depositorAccountsDetails, setDepositorAccountsDetails] = React.useState('');
  const [provider, setProvider] = React.useState('');

  useEffect(() => {


  }, []);

  const createConnection = async () => {
    const starknet = await connect({ showList: false });
    const accountDetails = await starknet.enable();
  
    if (accountDetails) {
      setDepositorAccountsDetails(accountDetails);
    }
    if (starknet && starknet.provider) {
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
  const handleDeposit = async () => {
    const erc20 = new Contract(ERC20StarkToken.abi, '0x052dd98d784ca4e00d38dd0852918d6aaff2b8755c7e458aacef8a38133827b8', provider);
    // holds account details that will be sent to the contract along with deposit value
    const balanceBeforeTransfer = await erc20.balanceOf(depositorAccountsDetails[0]);
    
    console.log(balanceBeforeTransfer);
    console.log('My balance is', toFelt(balanceBeforeTransfer[0].low) / 10 ** 18);
  };

  return (
    <>
      <Button colorScheme='green' onClick={createConnection}>Connect</Button>
      <Button colorScheme='green' onClick={() => {console.log(provider, depositorAccountsDetails);}}>Show</Button>
      <InputGroup size='sm'>
        <Input type='number' value={depositAmount} onChange={handleChange} placeholder='Eg. 100 ETH' />
        <InputRightAddon children='ETH' />
      </InputGroup>
      <Button colorScheme='blue' onClick={handleDeposit} isDisabled={!depositAmount}>Deposit</Button>
    </>
  );
}