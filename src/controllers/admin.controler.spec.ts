import supertest from "supertest";
import { getApp } from "../getApp";
import { jobsService } from "../services/jobs.service";

const app = getApp();

jest.mock("../services/jobs.service", () => ({
  jobsService: {
    findBestClientsInRange: jest.fn(),
  },
}));

describe("admin.controller", () => {
  describe("findBestClientsInRange", () => {
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
    it("returns 200 with correct params", async () => {
      const response = await supertest(app)
        .get("/admin/best-clients")
        .query({
          start: "2002-08-10T19:11:26.737Z",
          end: "2220-08-15T19:11:26.737Z",
        })
        .expect(200);
    });
  });
});
