import supertest from "supertest";
import { getApp } from "../getApp";

const app = getApp();

describe("admin.controller", () => {
  describe("bestClients", () => {
    it("returns 400 with wrong startDate", async () => {
      await supertest(app)
        .get("/admin/best-clients")
        .query({ start: "wrong", end: new Date() })
        .expect(400);
    });
    it("returns 400 with wrong endDate", async () => {
      await supertest(app)
        .get("/admin/best-clients")
        .query({ start: "wrong", end: new Date() })
        .expect(400);
    });
    it("returns Programmer as best clients", async () => {
      const response = await supertest(app)
        .get("/admin/best-clients")
        .query({
          start: "2002-08-10T19:11:26.737Z",
          end: "2220-08-15T19:11:26.737Z",
        })
        .expect(200);
      expect(response.body).toMatch(/Programmer/);
    });
  });

  // describe("bestPro", () => {
  //   it("returns 400 with wrong startDate", async () => {
  //     await supertest(app)
  //       .get("/admin/best-clients")
  //       .query({ start: "wrong", end: new Date() })
  //       .expect(400);
  //   });
  //   it("returns 400 with wrong endDate", async () => {
  //     await supertest(app)
  //       .get("/admin/best-clients")
  //       .query({ start: "wrong", end: new Date() })
  //       .expect(400);
  //   });
  //   it("returns Programmer as best clients", async () => {
  //     const response = await supertest(app)
  //       .get("/admin/best-clients")
  //       .query({
  //         start: "2002-08-10T19:11:26.737Z",
  //         end: "2220-08-15T19:11:26.737Z",
  //       })
  //       .expect(200);
  //     expect(response.body).toMatch(/Programmer/);
  //   });
  // });
});
