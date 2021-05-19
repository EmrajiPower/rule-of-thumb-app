import { memo } from "react";

import Head from "next/head";

import CelebritiesComponent from "./CelebritiesComponent";
import ContextProvider from "./provider";

function MagicComponent() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="description"
          content="following close to your favorite celebrities? let's make a poll"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1>Previous Rulings</h1>
      <CelebritiesComponent />
    </div>
  );
}

export default memo(MagicComponent);
