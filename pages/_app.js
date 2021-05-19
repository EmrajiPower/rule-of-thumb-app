import "../css/main.css";
import "../Tailwind/main.css";

import { ContextProvider } from "../Components/provider";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />;
    </ContextProvider>
  );
}

export default MyApp;
