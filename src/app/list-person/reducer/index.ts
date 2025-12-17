import { ActionKind, IOperation, IReducerState, TAction } from "../_types";

export const isAllChecked = (personState: IReducerState) => {
  const personIds = personState.persons.map((p) => p.id);
  return (
    personState.checkingIds.length > 0 &&
    personIds.every((personId) => personState.checkingIds.includes(personId))
  );
};


const personReducer = (
  state: IReducerState,
  action: TAction
): IReducerState => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.EDIT_STATE: {
      if (payload?.id) {
        return {
          ...state,
          checkingIds: [payload.id],
          operation: "edit",
        };
      }
      return {
        ...state,
        operation: "edit",
      };
    }
    case ActionKind.CHECK_ALL: {
      if (isAllChecked(state) || !(state.persons.length > 0)) {
        return {
          ...state,
          checkingIds: [],
          operation: "add",
        };
      } else {
        const personIds = state.persons.map((p) => p.id);
        return {
          ...state,
          checkingIds: personIds,
          operation: "delete",
        };
      }
    }

    case ActionKind.CHECK_ONE: {
      if (payload?.id) {
        if (!state.checkingIds.includes(payload.id)) {
          return {
            ...state,
            checkingIds: [...state.checkingIds, payload.id],
            operation: "delete",
          };
        } else {
          let newOperation: IOperation = state.operation;
          if (state.checkingIds.length === 1) {
            newOperation = "add";
          }
          const copy = [...state.checkingIds];
          copy.splice(copy.indexOf(payload.id), 1);
          return {
            ...state,
            checkingIds: copy,
            operation: newOperation,
          };
        }
      } else {
      }
    }

    case ActionKind.DELETE_PERSON: {
      let result;
      // delete one person
      if (payload?.id) {
        const copyPerson = [...state.persons];
        copyPerson.splice(
          copyPerson.findIndex((p) => p.id === payload.id),
          1
        );
        result = copyPerson;
      } else {
        // delete selected persons
        const copy = [...state.persons];
        const newPersons = copy.filter(
          (p) => !state.checkingIds.includes(p.id)
        );
        result = newPersons;
      }
      return {
        ...state,
        checkingIds: [],
        operation: "add",
        persons: result,
      };
    }
    case ActionKind.EDIT_PERSON: {
      if (payload?.person) {
        const copy = [...state.persons];
        copy.splice(
          copy.findIndex((person) => person.id === state.checkingIds[0]),
          1
        );
        return {
          ...state,
          checkingIds: [],
          operation: "add",
          persons: [...copy, payload.person],
        };
      }
      return {
        ...state,
        checkingIds: [],
        operation: "add",
      };
    }
    case ActionKind.ADD_PERSON: {
      return {
        ...state,
        persons: payload?.persons ?? state.persons,
      };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export default personReducer;
