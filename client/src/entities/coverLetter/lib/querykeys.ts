const coverLetter = {
  all: ['coverLetter'],
  list: (id: string|null) => [...coverLetter.all, id, 'list'],
  detail: (id: number) => [...coverLetter.all, 'detail', id],
};

export default coverLetter;
