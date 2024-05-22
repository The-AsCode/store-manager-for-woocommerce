import { createRoot } from 'react-dom/client';
import App from '../../backend/views/src/App';

const admin = document.getElementById( 'shop-manager-x-dashboard' );

const root = createRoot( admin );
root.render( <App /> );
