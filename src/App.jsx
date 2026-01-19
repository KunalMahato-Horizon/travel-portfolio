import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-bg text-text transition-colors duration-300">
        <Navbar />

        <main className="flex-1">
          <Home />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
