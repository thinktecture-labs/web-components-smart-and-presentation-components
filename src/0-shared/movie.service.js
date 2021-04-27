export class MovieService {
  #data = [
    {
      id: 1,
      title: 'The Matrix',
      rating: 7,
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    },
    {
      id: 2,
      title: 'Lord of the Rings',
      rating: 9,
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg',
    },
    {
      id: 3,
      title: 'Inception',
      rating: 9.5,
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'
    },
    {
      id: 4,
      title: 'Sharknado',
      rating: 3,
      posterImageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Sharknado_poster.jpg'
    },
  ];

  list() {
    return [ ...this.#data ];
  }
}
