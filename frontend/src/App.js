import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import StockListPage from './pages/StockListPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      
      <Container className="mt-4 mb-5">
          <StockListPage />
      </Container>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontSize: '16px' }
        }}
      />
    </>
  );
}

export default App;