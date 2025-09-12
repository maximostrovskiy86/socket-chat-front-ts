import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store from "./redux/store";
import "./index.css"
import './index.css'
import App from './components/app/App'

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store.store}>
        <StrictMode>
            <PersistGate loading={null} persistor={store.persistor}>
                <App/>
            </PersistGate>
        </StrictMode>,
    </Provider>,
)
