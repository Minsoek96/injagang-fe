import { IAddTemplate, IGetTemplate } from '@/src/entities/template/type';

const sampleAddTemplate: IAddTemplate = {
  title: 'TestCompany',
  questions: [
    '테스트에 참가한 이유?',
    '테스트에 참가한 이유2?',
    '테스트에 참가한 이유3?',
    '테스트에 참가한 이유4?',
  ],
};

const sampleGetTemplate:IGetTemplate[] = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
  templateId: 10000 + i,
  title: `TestCompany${i}회`,
  questions: [`question${i}`, `question${i + i}`, `question${i + i + i}`],
}));

export {
  sampleAddTemplate,
  sampleGetTemplate,
};
