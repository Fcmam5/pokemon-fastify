import { FastifyReply, FastifyRequest } from "fastify";
import { getAllPokemons, getPokemonByName } from "./handlers";

let httpGetMockResponse;

jest.mock("./infrastructure/http-client", () => ({
  httpGet: jest.fn().mockImplementation(() => httpGetMockResponse),
}));

describe("handlers", () => {
  describe.skip("computeResponse", () => {
    it("something", () => {});
  });

  describe("getPokemonByName", () => {
    let request: FastifyRequest;
    let response: FastifyReply;
    let mockCode;
    let mockSend;

    beforeEach(() => {
      httpGetMockResponse = null;

      request = {
        params: {
          name: "alice",
        },
      } as FastifyRequest;
      mockCode = jest.fn().mockReturnThis();
      mockSend = jest.fn();
      response = {
        code: mockCode,
        send: mockSend,
      } as FastifyReply;
    });

    it("should return a 404 error if the Pokemon is not found", async () => {
      httpGetMockResponse = null;

      await getPokemonByName(request, response);

      expect(response.code).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalled();
    });

    it("should return the Pokemon data", async () => {
      httpGetMockResponse = {
        name: "Alice",
      };

      await getPokemonByName(request, response);

      expect(response.code).not.toHaveBeenCalledWith(404);
    });
  });

  describe("getAllPokemons", () => {
    let request: FastifyRequest;
    let response: FastifyReply;
    let mockCode;
    let mockSend;

    beforeEach(() => {
      httpGetMockResponse = null;

      request = {
        params: {
          name: "alice",
        },
      } as FastifyRequest;
      mockCode = jest.fn().mockReturnThis();
      mockSend = jest.fn();
      response = {
        code: mockCode,
        send: mockSend,
      } as FastifyReply;
    });
    it("should return the list of pokemons", async () => {
      httpGetMockResponse = [{ something: "here", andSomething: "here" }];

      await getAllPokemons(request, response);

      expect(response.send).toHaveBeenCalledWith(httpGetMockResponse);
    });
  });
});
