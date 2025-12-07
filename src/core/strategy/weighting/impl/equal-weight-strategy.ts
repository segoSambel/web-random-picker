import type {WeightStrategy} from "@/core/strategy/weighting/weight-strategy.ts";
import type {Option} from "@/core/model/option.ts";

export class EqualWeightStrategy implements WeightStrategy {
    applyWeight(options: Option[]): Option[] {
        for (const option of options) {
            option.weight = 1;
        }
        return options;
    }
}