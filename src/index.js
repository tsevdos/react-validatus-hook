import { useState, useCallback, useEffect } from "react";
import typeOf from "./lib/util/typeOf";
import Validations from "./lib/index";

function getValidations(validators, value){
  return validators.reduce((obj, validator) => {
    const validatorWithoutOptions = typeOf(validator) === "string";
    const validatorName = validatorWithoutOptions ? validator : Object.keys(validator)[0];
    const options = !validatorWithoutOptions && Object.values(validator)[0];
    const validationResult = validatorWithoutOptions
      ? Validations[validator](value)
      : Validations[validatorName](value, options);

    return { ...obj,  [validatorName]: validationResult };
  }, {});
}

export default function useValidatus(initialValue = "", validators = [], refEl = null) {
  const [value, setValue] = useState(initialValue);
  const [validations, setValidations] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const onChange = useCallback((input) => {
    const typeOfInput = typeOf(input);
    switch(typeOfInput) {
    case "string":
      setValue(input);
      break;
    case "object":
      if (input.target && input.target.value) {
        setValue(input.target.value);
      }
      break;
    default:
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    setValidations(getValidations(validators, value));
  }, [value, validators]);

  useEffect(() => {
    const validationValuesArr = Object.values(validations);
    if (validationValuesArr.length) {
      setIsValid(validationValuesArr.every((val) => val));
    }
  }, []);

  useEffect(() => {
    if (refEl && refEl.current) {
      refEl.current.addEventListener("blur", () => setIsTouched(true));
    }
  }, [refEl]);

  return {
    value,
    onChange,
    isValid,
    validations,
    ...((refEl && refEl.current) && { isTouched })
  };
}
