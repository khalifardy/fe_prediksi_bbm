// pages/_app.js
import "../styles/tailwind.css";
import "../styles/globals.css"; // Your existing global styles (if any)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
