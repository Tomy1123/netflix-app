import React, {useReducer, useEffect} from 'react';
import {requests} from './request'
import {Row} from "./compornents/Row";
import {Banner} from "./compornents/Banner";
import {Nav} from "./compornents/Nav";
import './App.css';

import {
  CssBaseline,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import Movie from './compornents/Movie'
import Search from './compornents/Search'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface State {
  loading: boolean
  movies: Movie[]
  errorMessage: string | null
}

enum ActionName {
  REQUEST = 'SEARCH_MOVIES_REQUEST',
  SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  FAILURE = 'SEARCH_MOVIES_FAILURE',
}

interface REQUEST {
  type: ActionName.REQUEST
}

interface SUCCESS {
  type: ActionName.SUCCESS
  payload: Movie[]
}

interface FAILURE {
  type: ActionName.FAILURE
  error: string
}

type MovieActions = REQUEST | SUCCESS | FAILURE

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

const initialState: State = {
  loading: true,
  movies: [],
  errorMessage: null,
}

const reducer: React.Reducer<State, MovieActions> = (state, action): State => {
  switch (action.type) {
    case ActionName.REQUEST:
      return {
          ...state,
          loading: true,
          errorMessage: null
      }
    case ActionName.SUCCESS:
      return {
          ...state,
          loading: false,
          movies: action.payload
      }
    case ActionName.FAILURE:
      return {
          ...state,
          loading: false,
          errorMessage: action.error
      }
    default:
      throw new Error()
  }
}

const App: React.FC = () =>{
  
  const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
      fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
          dispatch({
              type: ActionName.SUCCESS,
              payload: jsonResponse.Search
          })
      })
    },[])

    const search = (searchValue: string): void => {
      dispatch({
          type: ActionName.REQUEST
      })

      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
          if (jsonResponse.Response === 'True') {
              dispatch({
                  type: ActionName.SUCCESS,
                  payload: jsonResponse.Search
              })
          } else {
              dispatch({
                  type: ActionName.FAILURE,
                  error: jsonResponse.Error
              })
          }
      })
    }

  return (
    <div className="App">
      <React.Fragment>
        <Container component='main' maxWidth='md'>
          <CssBaseline/>
          <Box
            mt={4}
            textAlign='center'
            color='#fff'
          >
            <Search search={search}/>
            <Typography component='p'>Sharing a few of our favourite movies</Typography>
          </Box>
          <Box
            mt={4}
            display='flex'
            flexWrap='wrap'
            justifyContent='space-around'
          >
          </Box>
        </Container>
      </React.Fragment>
      <Nav/>
      <Banner/>
      <Row
      title="NETFLIX ORIGUINALS"
      fetchUrl={requests.feachNetflixOriginals}isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.feactTopRated} />
      <Row title="Action Movies" fetchUrl={requests.feactActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.feactHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="DOcumentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
