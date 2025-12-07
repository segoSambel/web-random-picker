import type {Option} from "@/core/model/option.ts";

export interface WeightStrategy {
    applyWeight(options: Option[]): Option[];
}