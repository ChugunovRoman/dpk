'use strict';

import db from './../db';

// Кидаем, когда получим таски
const receiveData = data => ({
    type: 'RECEIVE_DATA',
    data
});

// Ассинхронный экшен на получение данных
export function getData() {
    return function(dispatch) {
        return db
            .query('SELECT * FROM `Основная_таблица`')
            .spread((result, metadata) => dispatch(receiveData(result)));
    }
}

