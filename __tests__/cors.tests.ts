import { NextRequest } from "next/server";

import { GET } from "~/app/cors/route";
import httpMocks from "node-mocks-http";

const TIMEOUT = 5000;
const BASE_URL = "http://localhost:3000";

describe("Test the root path", () => {
  it(
    "should response the GET method",
    (done) => {
      // mock NextRequest
      const requestMock = httpMocks.createRequest<NextRequest>({
        method: "GET",
        url: `${BASE_URL}/cors?url=https://forum.1hive.org//t/5531.json`,
        // url: `${BASE_URL}/cors?url=https://www.google.com`,
      });

      GET(requestMock).then(async (response) => {
        expect(response.status).toBe(200);
        // console.log(response);
        console.log(await response.json());
        done();
      });
    },
    TIMEOUT
  );
});
