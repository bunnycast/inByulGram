import React, {useState, useEffect} from 'react';
import {Card, Form, Input, Button, notification} from 'antd';
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import {useHistory, useLocation} from "react-router-dom";
import Axios from 'axios';
import {useAppContext, setToken} from "store";

export default function Login() {
    const {dispatch} = useAppContext();
    const location = useLocation();
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || {
        from: { pathname: "/"}
    };


    const onFinish = values => {
        async function fn() {
            const {username, password} = values;

            setFieldErrors({});

            const data = {username, password};

            try {
                const response = await Axios.post(
                    "http://localhost:8000/accounts/token/",
                    data
                );

                const {
                    data: {token: jwtToken}
                } = response;

                dispatch(setToken(jwtToken));

                notification.open({
                    message: '로그인 성공',
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>,
                });

                history.push(loginRedirectUrl);

            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: '로그인 실패',
                        description: '아이디/암호를 확인해주세요.',
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>,
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages)
                            .reduce((acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                                }
                                return acc;
                            }, {})
                    );
                }
            }
        }

        fn();
    };

    return (
        <Card title="로그인">
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {required: true, message: 'Please input your username!'},
                        {min: 5, message: "5글자 입력해주세요."}]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                    {...fieldErrors.password}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
}