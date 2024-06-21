import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={RecipeList} />
                    <Route path="/recipe/:id" component={RecipeDetail} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
