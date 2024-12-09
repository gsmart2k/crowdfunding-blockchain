// pages/_app.js
import "../styles/global.css"; // Ensure this import exists

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
