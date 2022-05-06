import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import express from "express";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  try {
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });
  } catch (err) {
    console.error(err);
  }

  return res.status(201).send();
});
