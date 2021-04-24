export class MovieService {
  #data = [
    {
      id: 1,
      title: 'The Matrix',
      rating: 7,
      imdbUrl: 'https://www.imdb.com/title/tt0133093/',
    },
    {
      id: 2,
      title: 'Lord of the Rings',
      rating: 9,
      imdbUrl: 'https://www.imdb.com/title/tt0120737/',
    },
    {
      id: 3,
      title: 'Inception',
      rating: 9.5,
      imdbUrl: 'https://www.imdb.com/title/tt1375666/',
    },
    {
      id: 4,
      title: 'Sharknado',
      rating: 3,
      imdbUrl: 'https://www.imdb.com/title/tt2724064/',
    },
  ];

  list() {
    return [ ...this.#data ];
  }

  delete(id) {
    this.#data = this.#data.filter(item => item.id !== id);
  }
}
