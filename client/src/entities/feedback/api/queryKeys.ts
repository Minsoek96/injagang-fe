const feedback = {
  all: ['feedback'],
  list: (id: number) => [...feedback.all, id],
};

export default feedback;
