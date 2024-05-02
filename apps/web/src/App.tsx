import { ConnectionProvider } from "~/providers/ConnectionProvider";
import { WagmiProvider } from "~/providers/WagmiProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <WagmiProvider>
      <ConnectionProvider>
        <AppRoutes />
      </ConnectionProvider>
    </WagmiProvider>
  );
}

export default App;
