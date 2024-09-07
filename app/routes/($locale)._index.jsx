/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Homepage from '~/components';
import StartedScreen from '~/components/splash-screen/StartedScreen';
import HomepageCopy from '~/components/HomePageCopy';
const Index = () => {
  const [IsStartedPage, setIsStartedPage] = useState(false);

  return (
    <>
      {IsStartedPage ? (
        <StartedScreen setIsStartedPage={setIsStartedPage} />
      ) : (
          <HomepageCopy />
      )}
    </>
  );
};

export default Index;
