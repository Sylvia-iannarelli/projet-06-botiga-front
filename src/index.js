import { createRoot } from 'react-dom/client';
import App from 'src/components/App';
import { BrowserRouter } from 'react-router-dom';

const rootReactElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const rootReactContainer = createRoot(document.getElementById('root'));

rootReactContainer.render(rootReactElement);
