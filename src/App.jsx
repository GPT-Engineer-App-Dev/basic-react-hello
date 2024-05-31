import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SupabaseProvider } from "./integrations/supabase/index.js";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import Navbar from "./components/Navbar.jsx";
import EventDetails from "./pages/EventDetails.jsx";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
}

export default App;