import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButton from "./components/PaypalButton";

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_REAL_CLIENT_ID" }}>
      <PaypalButton />
    </PayPalScriptProvider>
  );
}

export default App;
