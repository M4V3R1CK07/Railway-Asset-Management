import { BaseError } from "./BaseError.js";

export class ConflictError extends BaseError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}