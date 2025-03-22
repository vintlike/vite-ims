import styled from '@emotion/styled';
import { Checkbox, theme } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox/Group';

export type CheckboxGroupButtonStyle = 'outline' | 'solid';
export type CheckboxGroupOptionType = 'default' | 'button';
export type SizeType = 'small' | 'middle' | 'large' | undefined;

interface CheckboxGroupCSSProps {
  colorborder?: string;
  colorprimary?: string;
  buttonstyle?: CheckboxGroupButtonStyle;
  checkedlen: number;
  size?: SizeType;
}

const CheckboxGroupLayout = styled(Checkbox.Group)<CheckboxGroupCSSProps>`
  &.ant-checkbox-group {
    column-gap: 0;
    .ant-checkbox-wrapper {
      /** 显示成按钮形式 */
      &.ant-checkbox-button-wrapper {
        position: relative;
        height: 32px;
        line-height: 30px;
        padding-inline: 15px;
        padding-block: 0;
        color: rgba(0, 0, 0, 0.88);
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-block-start-width: 1px;
        border-inline-start-width: 0;
        border-inline-end-width: 1px;
        transition:
          color 0.2s,
          background 0.2s,
          box-shadow 0.2s;

        &:first-of-type {
          border-inline-start-width: 1px;
          border-start-start-radius: 6px;
          border-end-start-radius: 6px;
        }
        &:last-of-type {
          border-start-end-radius: 6px;
          border-end-end-radius: 6px;
        }

        &:not(:first-of-type)::before {
          position: absolute;
          inset-block-start: -1px;
          inset-inline-start: -1px;
          display: block;
          box-sizing: content-box;
          width: 1px;
          height: 100%;
          padding-block: 1px;
          padding-inline: 0;
          background-color: #d9d9d9;
          transition: background-color 0.3s;
          content: '';
        }

        &.ant-checkbox-wrapper-checked {
          z-index: 1;
          color: ${(props) => (props.buttonstyle === 'solid' ? '#fff' : props.colorprimary)};
          border-color: ${(props) => props.colorprimary};

          background-color: ${(props) => (props.buttonstyle === 'solid' ? props.colorprimary : '#fff')};

          /** 按钮间分隔线 */
          &:not(.ant-checkbox-wrapper-disabled)::before {
            background-color: ${(props) =>
              props.checkedlen > 1 && props.buttonstyle === 'solid' ? '#d9d9d9' : props.colorprimary};
          }
        }
        .ant-checkbox {
          top: 0;
          display: none;
        }

        .ant-checkbox-label {
          padding: 0;
        }
      }
    }
    &.ant-checkbox-group-small {
      .ant-checkbox-wrapper {
        &.ant-checkbox-button-wrapper {
          height: 24px;
          padding-inline: 7px;
          padding-block: 0;
          line-height: 22px;

          &:first-of-type {
            border-start-start-radius: 4px;
            border-end-start-radius: 4px;
          }
          &:last-of-type {
            border-start-end-radius: 4px;
            border-end-end-radius: 4px;
          }
        }
      }
    }

    &.ant-checkbox-group-large {
      .ant-checkbox-wrapper {
        &.ant-checkbox-button-wrapper {
          height: 40px;
          line-height: 38px;

          &:first-of-type {
            border-start-start-radius: 8px;
            border-end-start-radius: 8px;
          }
          &:last-of-type {
            border-start-end-radius: 8px;
            border-end-end-radius: 8px;
          }
        }
      }
    }
  }
`;

interface Props extends Omit<CheckboxGroupProps, 'options'> {
  options?: CheckboxOptionType[];
  size?: SizeType;
  optionType?: CheckboxGroupOptionType;
  buttonStyle?: CheckboxGroupButtonStyle;
  maxCount?: number;
}
/**
 * 复选框显示成按钮形式，支持单选、多选
 * @param props
 * @returns
 */
const CheckboxGroup: React.FC<Props> = (props) => {
  const { options, value, onChange, size, optionType = 'default', buttonStyle = 'outline', maxCount, ...rest } = props;

  const globalTheme = theme.useToken();
  const [checkedList, setCheckedList] = useState<any>([]);

  const handleSelectedChange = (checkedValue: any) => {
    let values = checkedValue;

    setCheckedList((prevState: any) => {
      if (optionType === 'button' && maxCount === 1) {
        if (checkedValue?.length === 0) {
          values = prevState;
        } else {
          values = checkedValue.slice(-1);
        }
      }

      return values;
    });
    onChange && onChange(values);
  };

  useEffect(() => {
    setCheckedList(value);
  }, [value]);

  return (
    <CheckboxGroupLayout
      {...rest}
      size={'large'}
      value={checkedList}
      onChange={handleSelectedChange}
      colorborder={globalTheme.token.colorBorder}
      colorprimary={globalTheme.token.colorPrimary}
      buttonstyle={buttonStyle}
      checkedlen={checkedList?.length}
      className={classNames({
        'ant-checkbox-group-outline': optionType === 'button' && buttonStyle === 'outline',
        'ant-checkbox-group-solid': optionType === 'button' && buttonStyle === 'solid',
        'ant-checkbox-group-small': optionType === 'button' && size === 'small',
        'ant-checkbox-group-middle': optionType === 'button' && size === 'middle',
        'ant-checkbox-group-large': optionType === 'button' && size === 'large'
      })}
    >
      {options?.map((item, idx: number) => (
        <Checkbox
          key={idx}
          value={item?.value}
          disabled={item?.disabled}
          className={classNames({ 'ant-checkbox-button-wrapper': optionType === 'button' })}
        >
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroupLayout>
  );
};

export default CheckboxGroup;
