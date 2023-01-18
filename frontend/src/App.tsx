import { BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
import Pages from './routes/Pages';

function App() {
  return (
    <div className="text-white ">
      <Fragment>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
