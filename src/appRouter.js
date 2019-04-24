import {BrowseRouter} from "react-router-dom";
import App from './App';

ReactDOM.render(
    <BrowseRouter>
        <App/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </Switch>
    </BrowseRouter>,
    holder
)