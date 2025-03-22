import { Button, Form, Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import type { FormProps } from 'antd';
import type { FormItemLayout } from 'antd/es/form/Form';

/**
 * 自定义form表单
 * @param props
 * @returns
 */
export interface CommonFormProps extends FormProps {
  onReset?: () => void;
  submitText?: string;
  operateLayout?: FormItemLayout;
  showOperate?: boolean;
  children?: React.ReactNode;
}

const CommonForm: React.FC<CommonFormProps> = (props) => {
  const {
    form,
    colon = false,
    layout = 'horizontal',
    labelAlign = 'left',
    operateLayout = 'horizontal',
    className,
    submitText = '提交',
    onFinish,
    onReset,
    children,
    showOperate = true,
    ...rest
  } = props;

  const handleReset = () => {
    form?.resetFields();
    onReset && onReset();
  };

  const handleSubmit = (values: any) => {
    onFinish && onFinish(values);
  };

  return (
    <Form
      form={form}
      colon={colon}
      layout={layout}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      labelAlign={labelAlign}
      onFinish={handleSubmit}
      className={classNames('common-form', className)}
      {...rest}
    >
      {children}
      {showOperate && (
        <Form.Item label=" " layout={operateLayout} className="common-form-operate">
          <Space size={16} direction={operateLayout}>
            <Button htmlType="button" onClick={() => handleReset()}>
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              {submitText}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default CommonForm;
