import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "../index.js";
import { signUpObj, logInObj } from "./index.fixtures.js";

chai.use(chaiHttp);

describe("post requests", () => {
  it("creates a user", (done) => {
    chai
      .request(app)
      .post("/api/user/create")
      .send(signUpObj)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done(err);
      });
  });

  it("updates a user", (done) => {
    chai
      .request(app)
      .put("/api/user/update")
      .send(signUpObj)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(req).to.have.header("token");
        done(err);
      });
  });

  it("logs in a user", (done) => {
    chai
      .request(app)
      .post("/login")
      .send(logInObj)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  //   it("adds a product to a user", (done) => {
  //     chai
  //       .request(app)
  //       .post("/api/products/add")
  //       .send(addProdObj)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(req).to.have.header("token");
  //         done(err);
  //       });
  //   });
});
