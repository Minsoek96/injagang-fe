const coverLetter = {
  all: ['coverLetter'],
  list: () => [...coverLetter.all, 'list'],
  detail: (id: number) => [...coverLetter.all, 'detail', id],
};

export default coverLetter;
