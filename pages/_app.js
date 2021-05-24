import React from "react";

import "../styles/globals.scss";

import { MoralisProvider } from "react-moralis";

function App({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="aaGehqw04JrNSeafGwYM5rLIBdBTehO6qpYjRt0M"
      serverUrl="https://qvmjfsikgivk.moralis.io:2053/server"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default App;
