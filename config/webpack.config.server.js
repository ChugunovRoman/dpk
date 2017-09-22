import {server_configuration as serverConfiguration} from 'universal-webpack';
import settings from './universal-webpack-settings';
import config from './webpack.config';

const fileLoaders = config.module.rules.filter(item => item.loader === 'file-loader');

for (const loader of fileLoaders) {
    loader.options = {
        emitFile: false
    };
}

export default serverConfiguration(config, settings);