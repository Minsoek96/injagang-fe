import { useInterViewStore } from "@/store/interview";

const userInterviewManager = () => {
  const { confirmQuestions } = useInterViewStore();
  return { confirmQuestions };
};

export default userInterviewManager;
