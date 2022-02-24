import { FastifyReply, FastifyRequest } from "fastify";
import { ProblemDocument } from "./errors";
import { checkNameInParams as checkNameInParamsFn } from "./middlewares";

const BAD_REQUEST_RESPONSE: ProblemDocument = {
  status: 400,
  type: "Bad request",
  title: "BAD_REQUEST",
};

jest.mock("./errors", () => ({
  getBadRequestResponse: jest
    .fn()
    .mockImplementation(() => BAD_REQUEST_RESPONSE),
}));

describe("middlewares", () => {
  let request: FastifyRequest;
  let response: FastifyReply;
  let mockCode;
  let mockSend;
  let doneCb;

  beforeEach(() => {
    request = { params: {} } as FastifyRequest;
    mockCode = jest.fn().mockReturnThis();
    mockSend = jest.fn();
    response = {
      code: mockCode,
      send: mockSend,
    } as FastifyReply;
    doneCb = jest.fn();
  });

  it("should throw a 400 error if the name is not present", () => {
    // request.params["name"]
    checkNameInParamsFn(doneCb)(request, response);

    expect(mockCode).toHaveBeenCalledWith(400);
  });

  it("should throw a 400 error if the name consists of spaces only", () => {
    request.params["name"] = "  ";
    checkNameInParamsFn(doneCb)(request, response);

    _assertBadRequest(mockCode, mockSend, doneCb);
  });

  it("should throw a 400 error if the name is empty", () => {
    request.params["name"] = "";
    checkNameInParamsFn(doneCb)(request, response);

    _assertBadRequest(mockCode, mockSend, doneCb);
  });

  it("should call the callback if the name parameter is valid", () => {
    request.params["name"] = "Pikachu";
    checkNameInParamsFn(doneCb)(request, response);

    expect(mockCode).not.toHaveBeenCalledWith(400);
    expect(mockSend).not.toHaveBeenCalledWith(BAD_REQUEST_RESPONSE);
    expect(doneCb).toHaveBeenCalled();
  });

  function _assertBadRequest(mockCode, mockSend, doneCb) {
    expect(mockCode).toHaveBeenCalledWith(400);
    expect(mockSend).toHaveBeenCalledWith(BAD_REQUEST_RESPONSE);
    expect(doneCb).not.toHaveBeenCalled();
  }
});
