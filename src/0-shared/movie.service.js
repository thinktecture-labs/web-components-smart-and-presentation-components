export class MovieService {
  #data = [
    {
      id: 1,
      title: 'The Matrix',
      rating: 7,
      imdbUrl: 'https://www.imdb.com/title/tt0133093/',
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    },
    {
      id: 2,
      title: 'Lord of the Rings',
      rating: 9,
      imdbUrl: 'https://www.imdb.com/title/tt0120737/',
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg',
    },
    {
      id: 3,
      title: 'Inception',
      rating: 9.5,
      imdbUrl: 'https://www.imdb.com/title/tt1375666/',
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'
    },
    {
      id: 4,
      title: 'Sharknado',
      rating: 3,
      imdbUrl: 'https://www.imdb.com/title/tt2724064/',
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Sharknado_poster.jpg'
    },
  ];

  list() {
    return [ ...this.#data ];
  }
}
