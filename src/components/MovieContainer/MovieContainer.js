import React, { Component } from 'react'
import { MovieCard } from '../MovieCard/MovieCard'
import './MovieContainer.css'
import { connect } from 'react-redux'
import { fetchMovies } from '../../thunks/fetchMovies.js'


export class MovieContainer extends Component {
async componentDidMount() {
  console.log(this.props.fetchMovies())
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=8d54c10134c07bfb8e01ded9e30524be&with_genres=28'
   await this.props.fetchMovies(url)
}

render() {
  if (this.props.movies) {
    const actionMovies = this.props.movies.map(movie => (<MovieCard {...movie} />))
    return (
      <div className='movie-container'>
        {actionMovies}
      </div>
      )
    } else {
      return <div></div>
    }
  }
}

export const mapStateToProps = (state) => {
  console.log(state) 
  return {
  movies: state.movies,
  isLoading: state.isLoading,
  hasErrored: state.hasErrored
}}

export const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (url) => dispatch(fetchMovies(url)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
