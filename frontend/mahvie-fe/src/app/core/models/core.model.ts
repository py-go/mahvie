/**
 * Radio button iterator in questionnaire
 */
export type Option = {
  text: string;
  active: boolean;
  htmlTitle?: string;
  hoverText?: string;
}

/**
 * Validations for questionnaire
 */
export type Validation = {
  required: boolean;
  min: number;
  max: number;
  pattern: string;
}

/**
 * Single question instance
 */
export type Question = {
  id: number;
  name: string;
  question: string;
  type: string;
  controls?: string[];
  options: any[];
  validations: Partial<Validation>;
  title: string;
  subtitle: string;
  skip?: boolean;
  inline?: boolean;
}
