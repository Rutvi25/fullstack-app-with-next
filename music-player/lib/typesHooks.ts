import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "../models";

const typedHooks = createTypedHooks<StoreModel>();

const { useStoreActions, useStoreState } = typedHooks;

export { useStoreActions, useStoreState };
