import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Home />
      {/* Other routes/components */}
    </ThemeProvider>
  );
}