import React, { useEffect } from 'react';
import { useStateValue } from '../state/StateProvider';

function Chatbot() {
   const [, dispatch] = useStateValue();

   useEffect(() => {
      dispatch({
         type: 'SET_SIDEBAR',
         sidebar: 'CHATBOT',
      });
   }, [dispatch]);

   return (
      <iframe
         id="chatbot"
         title="Chatbot"
         width="35%"
         height="99%"
         allow="microphone;"
         src="https://console.dialogflow.com/api-client/demo/embedded/b440624b-b458-41d8-95f4-edf45073af4e"></iframe>
   );
}

export default Chatbot;
