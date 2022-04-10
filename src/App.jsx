import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, perssistor } from "./redux/store";
 import Routes from "./routes";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={perssistor}>
        <>
          <Routes/>
        </>
      </PersistGate>
    </Provider>
  );
};
