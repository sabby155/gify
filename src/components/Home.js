import React from 'react';
import SearchBar from './SearchBar'
import GifContainer from './GifContainer'
import InfoContainer from './InfoContainer'

class Home extends React.Component {
    render() {
        return(
            <div>
                <main>
                    <section>
                        <InfoContainer />
                    </section>
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