import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import Routers from './routes';

function App() {
  return (
    <>
      <HelmetProvider>
        <Routers />
      </HelmetProvider>
      <ToastContainer />
    </>
  );
}

export default App;
