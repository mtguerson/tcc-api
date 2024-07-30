import { Request, Response } from "express";
import { DeleteCategoryByIdUseCase } from "./DeleteCategoryByIdUseCase";

export class DeleteCategoryByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCategoryByIdUseCase = new DeleteCategoryByIdUseCase();

    const result = await deleteCategoryByIdUseCase.execute(id);

    return res.status(200).json(result);
  }
}
