import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RitualGate from "./RitualGate";
import RitualsPortal from "./RitualsPortal";
import AirdropPage from "./AirdropPage";
import Info_Whitepaper from "./Info_Whitepaper";
import Ritual_GhostMeMeter from "./Ritual_GhostMeMeter";
import Ritual_SaveOrSink from "./Ritual_SaveOrSink";
import Ritual_Ghost from "./Ritual_Ghost"; // NEW
import ThankYou from "./ThankYou"; // NEW (or use ThankYou_Animated if swapped)

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RitualGate />} />
      <Route path="/rituals" element={<RitualsPortal />} />
      <Route path="/airdrop" element={<AirdropPage />} />
      <Route path="/whitepaper" element={<Info_Whitepaper />} />
      <Route path="/ghost" element={<Ritual_Ghost />} /> {/* NEW */}
      <Route path="/saveorsink" element={<Ritual_SaveOrSink />} />
      <Route path="/thankyou" element={<ThankYou />} /> {/* Redirect post-submit */}
    </Routes>
  </Router>
);

export default AppRouter;