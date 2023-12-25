import { FailedToLoadElementError } from "../Errors/FailedToLoadElementError";
import { RequiredAttributeError } from "../Errors/RequiredAttributeError";

export type LoadComponentProcedure = () => void | FailedToLoadElementError | RequiredAttributeError
