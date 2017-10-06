import { server } from 'universal-webpack';

import settings from './config/universal-webpack-settings';
import config from './config/webpack.config';

server(config, settings);