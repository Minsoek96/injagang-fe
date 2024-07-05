const coverLetter = {
  all: ['coverLetter'],
  list: (id: number) => [...coverLetter.all, id],
  detail: (id: number) => [...coverLetter.all, 'detail', id],
};

export default coverLetter;
