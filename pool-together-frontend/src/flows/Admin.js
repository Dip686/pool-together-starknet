import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';

function generateRandomUserIndex(min, max, except) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (except.includes(num)) ? generateRandomUserIndex(min, max) : num;
}

export default function AdminFlow () {
  const [distributionState, setDistributionState] = React.useState('not-started');
  const [pooledMoney, setPooledMoney] = React.useState();
  const [numberOfParticipants, setNumberOfParticipants] = React.useState();
  const [selectedParticipantsIndexArr, setSelectedParticipantsIndexArr] = React.useState([]);
  const distributionOrderInPercentage = [50, 30, 15, 5];

  useEffect(() => {
    setTimeout(() => {
      setNumberOfParticipants(10);
    }, 2000);
  }, []);

  if (numberOfParticipants < 5) return 'We must have at least 5 participants';
  // we have more minimum 5 participants


  const generateNewMemberIndex = () => {
    if (selectedParticipantsIndexArr.length > 4) {
      setDistributionState('completed');
      return;
    }
    const newUserIdex = generateRandomUserIndex(0, numberOfParticipants, selectedParticipantsIndexArr);
    setSelectedParticipantsIndexArr([...selectedParticipantsIndexArr, newUserIdex]);
  };


  return (
    <>
      <Button 
        colorScheme='blue'
        onClick={() => { 
          setDistributionState('in-progress');
          generateNewMemberIndex();
        }}>
          Trigger
      </Button>
      <ol>
        {selectedParticipantsIndexArr.map((val) => <li>{val}</li>)}
      </ol>
      <p>Lucky draw state:{distributionState}</p>
    </>
  );
  
}