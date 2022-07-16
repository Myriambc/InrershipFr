import { api_get } from "../utils/Api";

const getSchema = async (endpoint) => {
  return await api_get(`${endpoint}/schema`);
};

const rules = [
  // 'date',
  "email",
  "integer",
  "numeric",
  "max",
  "min",
  "required",
];

const dateRule = () => {
  return { date: true };
};
const emailRule = () => {
  return { email: true };
};
const integerRule = () => {
  return { numericality: true };
};
const numericRule = () => {
  return { numericality: true };
};
const maxRule = (rule) => {
  return { length: { maximum: Number(rule.parameter) } };
};
const minRule = (rule) => {
  return { length: { minimum: Number(rule.parameter) } };
};
const requiredRule = () => {
  return { presence: { allowEmpty: false, message: "is required" } };
};

const extractParameter = (rule) => {
  const r = rule.split(":");
  return { name: r[0], parameter: r[1] };
};

const parseRule = (rule) => {
  const extractedRule = extractParameter(rule);
  if (rules.includes(extractedRule.name)) {
    const fn = eval(`${extractedRule.name}Rule`);
    if (typeof fn === "function") {
      return fn(extractedRule);
    }
  }

  return null;
};

const schemaParser = async (endpoint) => {
  const result = await getSchema(endpoint);
  const schema = result.payload;
  let validationSchema = {};
  for (const field in schema) {
    if (schema.hasOwnProperty(field)) {
      let fieldRules = {};
      for (const rule of schema[field]) {
        const parsedRule = parseRule(rule);
        if (parsedRule) {
          const ruleName = Object.keys(parsedRule)[0];
          if (fieldRules[ruleName]) {
            fieldRules[ruleName] = {
              ...fieldRules[ruleName],
              ...parsedRule[ruleName],
            };
          } else {
            fieldRules = { ...fieldRules, ...parsedRule };
          }
        }
      }
      validationSchema = { ...validationSchema, [field]: fieldRules };
    }
  }

  return validationSchema;
};

export default schemaParser;
