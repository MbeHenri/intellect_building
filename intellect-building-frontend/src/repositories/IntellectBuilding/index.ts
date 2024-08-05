import { type TypeRepository } from "../TypeRepository";
import ProdIntellectRepository from "./prodRepository";
import IntellectRepository from "./repository";

export function getIntellectRepository(
  t: TypeRepository = "fake"
): IntellectRepository {
  if (t === "fake") {
    return new IntellectRepository();
  }
  return new ProdIntellectRepository();
}
