// `pages/_app.js`
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
