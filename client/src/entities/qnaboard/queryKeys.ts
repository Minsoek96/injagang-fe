const board = {
  all: ['board'],
  lists: (page?: number, type?: string, search?: string) => [
    ...board.all,
    page,
    type,
    search,
  ],
  detail: (id: number) => [...board.all, id],
};

export default board;
