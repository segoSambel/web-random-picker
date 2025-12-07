import type {WeightStrategy} from "@/core/strategy/weighting/weight-strategy.ts";
import type {Option} from "@/core/model/option.ts";

export class OrderedWeightStrategy implements WeightStrategy {
    applyWeight(options: Option[]): Option[] {
        const size = options.length;
        return options.map((opt, i) => ({
                name: opt.name,
                weight: size - i,
            })
        )
    }
}