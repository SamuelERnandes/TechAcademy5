import { loginUser } from "../loginController";
import UserModel from "../../model/UserModel";
import { generateToken } from "../../utils/jwt";
import { Request, Response } from "express";

jest.mock("../../model/UserModel", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

jest.mock("../../utils/jwt", () => ({
  __esModule: true,
  generateToken: jest.fn(),
}));

describe("loginUser controller", () => {
  const mockRequest = (body: any): Partial<Request> => ({
    body,
  });

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar token ao fazer login com e-mail e senha válidos", async () => {
    const req = mockRequest({ email: "teste@email.com", password: "123456" });
    const res = mockResponse();

    const mockUser = {
      id: 1,
      email: "teste@email.com",
      validatePassword: jest.fn().mockResolvedValue(true),
    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("fake-jwt-token");

    await loginUser(req as Request, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      where: { email: "teste@email.com" },
    });
    expect(mockUser.validatePassword).toHaveBeenCalledWith("123456");
    expect(generateToken).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "fake-jwt-token",
    });
  });

  it("deve retornar erro se o e-mail não existir", async () => {
    const req = mockRequest({
      email: "naoexiste@email.com",
      password: "123456",
    });
    const res = mockResponse();

    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    await loginUser(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("deve retornar erro se a senha estiver incorreta", async () => {
    const req = mockRequest({
      email: "teste@email.com",
      password: "senhaErrada",
    });
    const res = mockResponse();

    const mockUser = {
      id: 1,
      email: "teste@email.com",
      validatePassword: jest.fn().mockResolvedValue(false),
    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    await loginUser(req as Request, res);

    expect(mockUser.validatePassword).toHaveBeenCalledWith("senhaErrada");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email or password are invalid",
    });
  });
});
