export class CdService {
  #data = [
    {
      id: 1,
      title: 'Dark Side Of The Moon',
      interpret: 'Pink Floyd',
    },
    {
      id: 2,
      title: 'Nevermind',
      interpret: 'Nirvana',
    },
    {
      id: 3,
      title: 'Thriller',
      interpret: 'Michael Jackson'
    },
    {
      id: 4,
      title: 'The White Album',
      interpret: 'The Beatles'
    }
  ];

  list() {
    return [...this.#data];
  }

  delete(id) {
    this.#data = this.#data.filter(item => item.id !== id);
  }
}
