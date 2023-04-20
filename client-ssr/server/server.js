import { renderToString } from 'react-dom/server';
import { ServerRouter } from 'react-router';
import { Provider } from 'react-redux';
import express from 'express';
import path from 'path';
import fs from 'fs';

import App from '../src/components/App';
import { store } from '../src/store';

const app = express();
const PORT = 8001;

app.use(express.static(path.resolve(__dirname, '..', 'build' )));

app.get('*', (req, res) => {
  const context = {};
  const appMarkup = renderToString(
    <Provider store={store}>
      <ServerRouter location={req.url} context={context}>       
        <App />   
      </ServerRouter>
    </Provider>
  );

  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Oops, something went wrong!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
