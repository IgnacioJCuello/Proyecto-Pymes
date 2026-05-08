const request = require("supertest");
const app = require("../index");

const usuarioJefe = { usuario: "admin", clave: "123" };
const usuarioEmpleado = { usuario: "juan", clave: "123" };


describe("POST /api/login admin", function () {
  it("Devolveria error de autenticacion, porque tiene clave errónea", async function () {
    const res = await request(app)
      .post("/api/login")
      //.set("Content-type", "application/json")
      .send({ usuario: "admin", clave: "errónea" });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Usuario o clave incorrectos");
  });

  it("Devolvería el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioJefe);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });
});

describe("GET /api/usuarios", () => {

  it("Devolveria error, porque falta token de autorización", async function () {
    const res = await request(app).get("/api/usuarios");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Acceso denegado");
  });

  
  it("Devolvería todos los usuarios, solo autorizado para administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioJefe);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdUsuario: expect.any(Number),
          Usuario: expect.any(String),
          Clave: expect.any(String),
          Rol: expect.any(String),
        }),
      ])
    );
  });

  it("Devolvería error de autorizacion, porque solo están autorizados los administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioEmpleado);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('usuario no autorizado!');
  });

});
