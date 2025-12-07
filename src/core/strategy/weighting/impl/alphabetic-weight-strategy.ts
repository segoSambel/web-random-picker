import type {WeightStrategy} from "@/core/strategy/weighting/weight-strategy.ts";
import type {Option} from "@/core/model/option.ts";

export class AlphabeticWeightStrategy implements WeightStrategy {
    applyWeight(options: Option[]): Option[] {
        const sortedOptions: Option[] = [...options].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        const size = sortedOptions.length
        return sortedOptions.map((option, i) => ({
            name: option.name,
            weight: size - i,
        }))
    }
}