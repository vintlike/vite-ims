import { ValidatorFactory } from './ValidatorFactory';
import { validIdentity } from './validIdentity';
import type { RuleTypes } from './ValidatorFactory';

/**
 * 用法
 */
/* <Form.Item
  validateFirst={true}
  name="note"
  label="Note"
  rules={
    (ValidatorFactory([{ min: 18 }, { max: 20 }]),
    CustomerValidator.checkIdentity)
  }
></Form.Item>; */

export const CustomerValidatorFunction: any = {
  checkIdentity(rule: any, value: string) {
    if (!value) {
      return Promise.reject('身份证号码不能为空');
    }
    const result = validIdentity(value);
    if (result === true) {
      return Promise.resolve();
    }
    return Promise.reject('身份证号码不正确');
  }
};

function genCustomerValidatorFunction(t: any) {
  const extendResult: any = {};
  if (typeof t == 'object') {
    for (const key in t) {
      if (Object.prototype.hasOwnProperty.call(t, key)) {
        const item = t[key];
        const validator: RuleTypes = { validator: item };
        extendResult[key] = ValidatorFactory(validator);
      }
    }
  }
  return extendResult;
}

export function extendValidator(extendObj: any) {
  return genCustomerValidatorFunction(extendObj);
}

let CustomerValidatorFunctionObj: any = null;
(function (t) {
  CustomerValidatorFunctionObj = genCustomerValidatorFunction(t);
})(CustomerValidatorFunction);

export const CustomerValidator = CustomerValidatorFunctionObj;
