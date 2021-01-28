/**
 * Meta-data for checkbox controls
 */
export type Checkboxes = {
  htmlTitle: string;
  hoverText: string;
};

/**
 * Radio button iterator in questionnaire
 */
export type Option = Partial<Checkboxes> & {
  text: string;
  active: boolean;
};

/**
 * Validations for questionnaire
 */
export type Validation = {
  required: boolean;
  min: number;
  max: number;
  pattern: string;
};

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
  subtitle?: string;
  skip?: boolean;
  inline?: boolean;
  last?: boolean;
};

/**
 * Environment variables
 */
export type Environment = {
  production: boolean;
  baseUrl: string;
};

/**
 * Login API params
 */
export type Login = {
  username: string;
  password: string;
};

/**
 * Register API params
 */
export type Register = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
};

export type ResetPassword = Pick<Register, 'email'>;

export type ConfirmPassword = Pick<Register, 'password'>;

export type Token = Record<'token', string>;

/**
 * Literal alert types
 */
export type AlertTypes = 'success' | 'error' | 'info' | 'warning' | '';

/**
 * User alert info
 */
export type Alert = {
  type: AlertTypes;
  text: string;
};

/**
 * User credentials
 */
export type UserTokens = {
  access: string;
  refresh: string;
};
