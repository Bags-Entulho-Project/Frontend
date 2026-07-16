import { Form, Input, Button } from "antd";
import { adicionarPessoa } from "../../store/slices/pessoa/pessoa.js";
import { useSelector, useDispatch } from "react-redux";
import { loginFill } from "../../store/slices/auth/login.js";
import { usePostLoginMutation } from "../../store/slices/auth/queries.js";

function login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.login);
  const [login] = usePostLoginMutation();

  const onFinish = () => {
    login(form.getFieldsValue());
  };

  return (
    <>
      <div className="formStyle">
        <Form
          layout="vertical"
          className="login"
          onFinish={onFinish}
          form={form}
        >
          <h1>Login</h1>
          <Form.Item name="email" label="E-mail:">
            <Input placeholder="Seu E-mail" />
          </Form.Item>
          <Form.Item name="senha" label="Senha:">
            <Input.Password type="password" placeholder="Sua senha" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default login;
