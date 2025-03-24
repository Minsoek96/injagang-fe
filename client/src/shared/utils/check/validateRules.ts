export interface IValid {
  check: () => boolean;
  message: string;
}

const validateRules = (validation: IValid[]): { isValid: boolean; errorMessage: string} => {
  const failedRule = validation.find((item) => item.check());
  if (failedRule) {
    return { isValid: false, errorMessage: failedRule.message };
  }
  return { isValid: true, errorMessage: '' };
};

export default validateRules;
