import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';

import Header from './../Header';
import Routes from './../Routes';
import Footer from './../Footer';

import './bootstrap.css';

const App = () => (
    <div>
        <Header />
        <Grid>
            <main>
                <Routes/>
            </main>
        </Grid>
        <Footer />
    </div>
);

export default App;
