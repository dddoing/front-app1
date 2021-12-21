import * as React from 'react';

class App extends React.Component {
    //
    componentDidMount() {
        //
        console.log(process.env.NODE_ENV)
        console.log(process.env.TEST)
        // console.log(process.env.REACT_APP_TEST)
    }

    render() {
        //
        return(
                <div>sss</div>
        )
    }
}

export default App;