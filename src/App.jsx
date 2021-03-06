
import React, { Component, Suspense } from "react"
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

import { RequestReviews, RequestProducts } from './redux_store/actions/actions'  


import { Header, Footer, AboutUsPage, ContactUsPage, HomePage, NewsPage, ProductPage, RentPage, RentCategoryPage, StorePage, StoreCategoryPage } from './views';
import { PageNotFound } from './views/Errors';



import TinyLogo from "./assets/logos/BigGames_logo_tiny.png";

class App extends Component {

  componentDidMount(){ 
    //[] requesting review data 
    this.props.GetReviews();
    //[] requesting product data 
    this.props.GetProducts();
  }

  render(){
    return (
      <BrowserRouter basename={''} >      

        <Helmet><link rel="icon" href={TinyLogo} /> <title>BigGame</title></Helmet>

        <Suspense fallback={<h1>LOADING</h1>}>

          <Header />

          <Routes> 
          
            <Route exact path="/" element={ <HomePage /> } />
            <Route exact path="/home" element={ <HomePage /> } />
            <Route exact path="/news" element={ <NewsPage /> } />
            <Route exact path="/about-us" element={ <AboutUsPage /> } />
            <Route exact path="/contact-us" element={ <ContactUsPage /> } />

            <Route exact path="/store" element={ <StoreCategoryPage /> } ></Route>
            <Route exact path='/store/big-games' element={ <StorePage /> } />
            <Route path='/store/big-games/:prod_num' element={ <ProductPage /> } />
            <Route exact path='/store/stickers' element={ <StorePage /> } />
            <Route exact path='/store/personalize-games' element={ <StorePage /> } />
            <Route exact path="/rent" element={ <RentCategoryPage /> } />
            <Route exact path='/rent/games' element={ <RentPage /> } />
            <Route exact path='/rent/party-supplies' element={ <RentPage /> } />
            <Route path='/rent/p/:prod_num' element={ <ProductPage /> } />
            
            <Route path="*" element={ <PageNotFound /> } />

          </Routes>
        </Suspense>
          
        <Footer />

      </BrowserRouter>
    )
  }
}

App.propTypes = {
  prop_reviews: PropTypes.any,
}

const mapStateToProps = (state) => ({  
  prop_reviews: state.rootReducer_Reviews,
  prop_products: state.rootReducer_Products
})
const mapDispatchToProps = (dispatch) => ({
 GetReviews: ( ) => { dispatch( RequestReviews( ) ) },
 GetProducts: ( ) => { dispatch( RequestProducts( ) ) } 
})

export default connect( mapStateToProps, mapDispatchToProps )(App)
