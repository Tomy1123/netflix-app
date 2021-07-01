import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core'
import {Movie} from '../App'

const DEFAULT_PLACEHOLDER_IMAGE =
    'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'

interface MovieProps {
    movie: Movie
}

const MovieComponent: React.FC<MovieProps> = ({movie}) => {
    const poster =
        movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster
    return (
        <Card
            style={{
                width: 200,
                marginTop: '8px'
            }}
        >
            <CardMedia
                style={{
                    height: 300,
                }}
                image={poster}
                title={`The movie titled: ${movie.Title}`}
                component='img'
            />
            <CardContent>
                <Typography component='h2'>{movie.Title}</Typography>
                <Typography component='p'>({movie.Year})</Typography>
            </CardContent>
        </Card>
    )
}

export default MovieComponent