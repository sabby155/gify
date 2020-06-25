import React from 'react';
import SearchBar from './SearchBar'
import GifContainer from './GifContainer'

class Home extends React.Component {
    render() {
        return(
            <div>
                <main>
                    <section>
                        <SearchBar />
                    </section>
                    <section>
                        <GifContainer />
                    </section>
                </main> 
            </div>
        )
    }
}

export default Home