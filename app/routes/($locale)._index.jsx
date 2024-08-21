import React, {useState} from 'react';
import Homepage from '~/components';
import StartedScreen from '~/components/splash-screen/StartedScreen';

const Index = () => {
  const [IsStartedPage, setIsStartedPage] = useState(true);

  return (
    <>
      {IsStartedPage ? (
        <StartedScreen setIsStartedPage={setIsStartedPage} />
      ) : (
        <Homepage />
      )}
    </>
  );
};

export default Index;
