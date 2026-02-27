// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import { Container } from '@mui/material';

// // We will create these pages in the next step
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// // Wrapper to provide Navigation context to AuthProvider
// const AppContent = () => {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <Container sx={{ marginTop: 4 }}>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Container>
//     </AuthProvider>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import theme from './theme'; // Ensure theme is imported if using ThemeProvider here (or in index.js)

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoleExplorer from './pages/RoleExplorer'; // NEW
import Quiz from './pages/Quiz'; 
import CareerGuide from './pages/CareerGuide';                // NEW

const AppContent = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* NEW ROUTES */}
          <Route path="/roles" element={<RoleExplorer />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/guide" element={<CareerGuide />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;