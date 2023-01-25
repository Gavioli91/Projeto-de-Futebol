import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Codes from '../utils/Codes'
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Fazendo o teste do endpoint /login', () => {
  afterEach(sinon.restore);
  test('Fazendo login com sucesso', async () => {
    const answer = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(answer.status).to.equal(200);
    expect(answer.body).to.deep.equal({
      symbol: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
    });
  });

  test('Não é possível realizar o login sem colocar o e-mail',
  async () => {
    const answer = await
    chai.request(app).post('/login').send({
      password: 'secret_admin',
    });

    expect(answer.status).to.equal(Codes.badRequest);
    expect(answer.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });
   /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

 // it('Seu sub-teste', () => {
 //   expect(false).to.be.eq(true);
 // });
});