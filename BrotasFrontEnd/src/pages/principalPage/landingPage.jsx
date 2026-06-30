import { Col, Row, Card } from "antd";
import { Handshake, LeafyGreen, User } from "lucide-react";
import { Link } from "react-router-dom";

function landingPage() {
  return (
    <>
      <div className="title-landinpage">
        <h1 className="h1-landingpage">
          Gerencie suas bags de entulho com mais facilidade
        </h1>
        <p
          className="p-landingpage"
        >
          Utilize tecnologia sofisticada para otimizar a gestão de resíduos e
          aumentar a eficiência operacional da sua empresa.
        </p>
      </div>

      <div style={{ padding: "60px 40px", backgroundColor: "#f5f5f5" }}>
        <h2
          className="h2-landingpage"
        >
          Nossas Funcionalidades
        </h2>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={24} md={8}>
            <Card
              title="Cadastro de Cidadãos"
              className="card-landing"
              classNames={{body: "card-landing-body"}}
            >
              <User className="icon-landing"/>
              <Link to="/pessoa">Clique aqui para cadastrar pessoas</Link>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card
              title="Cadastro de Bags"
              className="card-landing"
              classNames={{body: "card-landing-body"}}
            >
              <LeafyGreen className="icon-landing" color="#237D46"/>
              <Link to="/bag">Clique aqui para cadastrar uma bag</Link>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card
              title="Cadastro de Alocações"
              className="card-landing"
              classNames={{body: "card-landing-body"}}
            >
              <Handshake className="icon-landing" color="#92e2e3"/>
              <Link to="/alocacao">Clique aqui para cadastrar pessoas</Link>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default landingPage;
