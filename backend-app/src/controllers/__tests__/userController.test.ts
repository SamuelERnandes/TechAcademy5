import { updateUser } from "../userController";
import UserModel from "../../model/UserModel";
import { Request, Response } from "express";

jest.mock("../../model/UserModel", () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}));

describe("updateUser - autorização", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna 400 se nenhum campo for enviado na edição", async () => {
    const req = {
      params: { id: 2 },
      body: {},
      user: { id_user: 2 },
    } as any;

    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      name: "João",
      email: "joao@email.com",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nenhum dado enviado para atualização.",
    });
  });

  it("retorna 400 se tentar alterar o e-mail", async () => {
    const req = {
      params: { id: 2 },
      body: { email: "novo@email.com" },
      user: { id_user: 2 },
    } as any;

    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      name: "João",
      email: "joao@email.com",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Alteração de e-mail não é permitida.",
    });
  });

  it("bloqueia edição de outro usuário (403)", async () => {
    const req = {
      params: { id: 2 },
      body: { name: "Novo Nome" },
      user: { id_user: 1 },
    } as unknown as Request<{ id: string }>;

    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({});

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "You can only change your personal information",
    });
  });

  it("retorna 400 se a senha for fraca", async () => {
    const req = {
      params: { id: 2 },
      body: { password: "abc" },
      user: { id_user: 2 },
    } as any;

    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      name: "João",
      email: "joao@email.com",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.stringContaining("senha deve ter pelo menos 8 caracteres"),
    });
  });

  it("retorna 400 se o CPF for inválido", async () => {
    const req = {
      params: { id: 2 },
      body: { cpf: "11111111111" },
      user: { id_user: 2 },
    } as any;

    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      name: "João",
      email: "joao@email.com",
      save: jest.fn(),
    });

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.stringContaining("CPF inválido"),
    });
  });
});
