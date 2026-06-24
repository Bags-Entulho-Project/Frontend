import { Form, Input, Button } from "antd";

function login() {
  const [form] = Form.useForm()

  const xasd = () => {
    console.log(form.getFieldsValue)
  }

  return (
    <>
    <div className="formStyle">
      <Form layout="vertical" className="login" onFinish={xasd}>
        <h1>Login</h1>
        <Form.Item name="email" label="E-mail:">
          <Input placeholder="Seu E-mail"/>
        </Form.Item>
        <Form.Item name="Senha" label="Senha:">
          <Input.Password type="password" placeholder="Sua senha"/>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">Login</Button> 
        </Form.Item>
      </Form>
    </div>
    </>
  );
}

export default login;
