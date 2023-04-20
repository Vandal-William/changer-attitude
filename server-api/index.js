require('dotenv').config();

const express = require('express');
const rateLimit = require("express-rate-limit");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodySanitizer = require('./middleware/sanitizer');
const router = require('./router');
const cors = require('cors');

const PORT = 4000;
const app = express();

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    url: '/swagger.json',
    defaultModelsExpandDepth: -1,
    validatorUrl: null,
    plugins: [
      () => {
        return {
          statePlugins: {
            spec: {
              wrapSelectors: {
                allowTryItOutFor: () => () => true,
              },
            },
          },
        };
      },
    ],
  },
  cors: true,
};

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument, options));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(bodySanitizer);

const corsOptions = {
  origin: ['http://localhost:3003', 'http://localhost:8001', 'http://projets-portfolio.ovh:8001'],
  optionsSuccessStatus: 200, 
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  next();
});

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(router);

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
})