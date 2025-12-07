import type {Option} from "@/core/model/option.ts";

export interface SelectorStrategy {
    select(options: Option[]): Option
}
