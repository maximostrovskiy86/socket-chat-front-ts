import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import "./index.css";
import "./index.css";
import App from "./components/app/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store} stabilityCheck="never">
    <StrictMode>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </StrictMode>
  </Provider>,
);
