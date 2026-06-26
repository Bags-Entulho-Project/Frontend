import { Col, Row, Card } from "antd";

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
              title="Solução 1"
              className="card-landing"
            >
              Adicione o conteúdo da primeira solução aqui.
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card
              title="Solução 2"
              className="card-landing"
            >
              Adicione o conteúdo da segunda solução aqui.
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card
              title="Solução 3"
              className="card-landing"
            >
              Adicione o conteúdo da terceira solução aqui.
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default landingPage;
