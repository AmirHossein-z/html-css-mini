export type IOperation = "add" | "edit" | "delete";

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IReducerState {
  operation: IOperation;
  checkingIds: string[];
  persons: IPerson[];
}

export enum ActionKind {
  ADD_PERSON = "ADD_PERSON",
  DELETE_PERSON = "DELETE_PERSON",
  EDIT_PERSON = "EDIT_PERSON",
  EDIT_STATE = "EDIT_STATE",
  CHECK_ALL = "CHECK_ALL",
  CHECK_ONE = "CHECK_ONE",
}
export interface TAction {
  type: ActionKind;
  payload?: Partial<IReducerState> & { id?: string; person?: IPerson };
}
