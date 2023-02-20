import Head from "next/head";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chatbot</title>
        <meta name="title" content="Chatbot" />
        <meta name="description" content="Chatbot" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
