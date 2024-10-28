interface IBaseTemplate {
  title: string;
  questions: string[];
}

export interface IAddTemplate extends IBaseTemplate {}

export interface IGetTemplate extends IBaseTemplate {
  templateId: number;
}

// useFieldArray 원활한 수행을 위한 폼 타입
export interface IAddFormTemplate {
  title: string;
  questions: {question: string, id: string}[]
}

export interface IDeleteTemplate {
  templateId: number;
}
