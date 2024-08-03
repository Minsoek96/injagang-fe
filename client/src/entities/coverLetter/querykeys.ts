const coverLetter = {
  all: ['coverLetter'],
  list: (id: string|number) => [...coverLetter.all, id, 'list'],
  detail: (id: number) => [...coverLetter.all, 'detail', id],
};

export default coverLetter;
