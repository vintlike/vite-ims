import type { Rule } from 'antd/lib/form';

/**
 * 定义类型
 */
export type RuleTypes = Rule & {
  [key: string]: any;
};
/**
 * antd form验证要求rule是数组，因此这里定义了数组，方便一次性验证多个
 */
export type RuleTypesArray = RuleTypes[];

export function ValidatorFactory(propType: RuleTypes): RuleTypes;
export function ValidatorFactory(propType: RuleTypes, ...others: RuleTypesArray): RuleTypesArray;

export function ValidatorFactory(propType: RuleTypesArray): RuleTypesArray;

export function ValidatorFactory(propType: RuleTypes | RuleTypesArray, ...args: RuleTypesArray): RuleTypesArray {
  let tmpRuleTypes: RuleTypesArray = [];

  if (propType instanceof Array) {
    tmpRuleTypes = [...tmpRuleTypes, ...propType];
  } else {
    tmpRuleTypes = [...tmpRuleTypes, propType];
  }

  if (args?.length) {
    args.forEach((ele: any) => {
      if (ele instanceof Array) {
        tmpRuleTypes = [...tmpRuleTypes, ...ele];
      } else {
        tmpRuleTypes = [...tmpRuleTypes, ele];
      }
    });
  }

  return tmpRuleTypes;
}
