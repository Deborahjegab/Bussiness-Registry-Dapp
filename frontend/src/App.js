// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import BusinessForm from "./components/BusinessForm";
// import ConnectWallet from "./components/ConnectWallet";
// import BusinessList from "./components/BusinessList";
// import AdminPanel from "./components/AdminPanel";
// import ReviewerPanel from "./components/ReviewerPanel";
// import { useWeb3 } from "./context/Web3Context";

// function App() {
//   const { isConnected } = useWeb3();

//   return (
//     <Router>
//       <div className="container mt-4">
//         <h1 className="text-center mb-4">Business Registry DApp</h1>
//         <ConnectWallet />

//         {isConnected ? (
//           <>
//             <nav className="nav nav-pills mb-4 justify-content-center">
//               <Link className="nav-link" to="/">Submit Business</Link>
//               <Link className="nav-link" to="/list">View Businesses</Link>
//               <Link className="nav-link" to="/admin">Admin Panel</Link>
//               <Link className="nav-link" to="/reviewer">Reviewer Panel</Link>
//             </nav>

//             <Routes>
//               <Route path="/" element={<BusinessForm />} />
//               <Route path="/list" element={<BusinessList />} />
//               <Route path="/admin" element={<AdminPanel />} />
//               <Route path="/reviewer" element={<ReviewerPanel />} />
//             </Routes>
//           </>
//         ) : (
//           <div className="alert alert-warning text-center mt-4">
//             Please connect your wallet to continue.
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BusinessForm from "./components/BusinessForm";
import ConnectWallet from "./components/ConnectWallet";
import BusinessList from "./components/BusinessList";
import AdminPanel from "./components/AdminPanel";
import ReviewerPanel from "./components/ReviewerPanel";
import SetAdmin from "./components/SetAdmin"; // ✅ Import SetAdmin
import { useWeb3 } from "./context/Web3Context";

function App() {
  const { isConnected } = useWeb3();

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Business Registry DApp</h1>
        <ConnectWallet />

        {isConnected ? (
          <>
            <nav className="nav nav-pills mb-4 justify-content-center">
              <Link className="nav-link" to="/">Submit Business</Link>
              <Link className="nav-link" to="/list">View Businesses</Link>
              <Link className="nav-link" to="/admin">Admin Panel</Link>
              <Link className="nav-link" to="/reviewer">Reviewer Panel</Link>
              <Link className="nav-link" to="/set-admin">Set Admin</Link> {/* ✅ Add link */}
            </nav>

            <Routes>
              <Route path="/" element={<BusinessForm />} />
              <Route path="/list" element={<BusinessList />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/reviewer" element={<ReviewerPanel />} />
              <Route path="/set-admin" element={<SetAdmin />} /> {/* ✅ Add route */}
            </Routes>
          </>
        ) : (
          <div className="alert alert-warning text-center mt-4">
            Please connect your wallet to continue.
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
