import React from "react";

import Footer from "./Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import VitalGearAIAssistant from "./AI Assitant/VitalGearAIAssistant";

export default function Basics() {
  return (
    <>
      <VitalGearAIAssistant />
      <Footer />
      <SignIn />
      <SignUp />
    </>
  );
}
