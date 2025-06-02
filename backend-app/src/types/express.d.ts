// src/types/express.d.ts
import { UserAttributes } from "../model/UserModel"; // ou qualquer tipo que represente seu usuário

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        [key: string]: any; // ou defina mais atributos se quiser
      };
    }
  }
}
