import React from 'react';
import SearchBar from './SearchBar'
import GifContainer from './GifContainer'
import InfoContainer from './InfoContainer'
import RandomGeneratorContainer from './RandomGeneratorContainer'
import { connect } from 'react-redux'


class Home extends React.Component {



    render() {
        return(
            <div>
                <main>
                    <section>
                        <InfoContainer />
                    </section>
                    <section>
                        <RandomGeneratorContainer />
                    </section>
                    <section>
                        <SearchBar />
                    </section>
                    <section id="thisOne">
                        <GifContainer />
                    </section>
                </main> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('test from gif container to see if state copied gif', state)
    return {
        gifs: state.gifs,
    }
}

export default connect(mapStateToProps)(Home)