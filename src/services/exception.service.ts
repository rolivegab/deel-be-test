import { Response } from "express";
import { ConflictException } from "../exceptions/Conflict.exception";
import { ForbiddenException } from "../exceptions/Forbidden.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { UnauthorizedException } from "../exceptions/Unauthorized.exception";

const handleErrorResponse = (error: unknown, res: Response) => {
  if (error instanceof NotFoundException) {
    res.status(404).send(error.message);
  } else if (error instanceof UnauthorizedException) {
    res.status(401).send(error.message);
  } else if (error instanceof ForbiddenException) {
    res.status(403).send(error.message);
  } else if (error instanceof ConflictException) {
    res.status(409).send(error.message);
  } else {
    res.status(500).end();
    console.error(error);
  }
};

export const exceptionService = { handleErrorResponse };
