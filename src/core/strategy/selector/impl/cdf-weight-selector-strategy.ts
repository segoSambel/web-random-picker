import type {SelectorStrategy} from "@/core/strategy/selector/selector-strategy.ts";
import type {Option} from "@/core/model/option.ts";

export class CdfWeightSelectorStrategy implements SelectorStrategy {
    select(options: Option[]): Option {
        const totalWeight: number = options.reduce((sum, opt) => sum + opt.weight, 0);
        let randomValue: number = Math.floor(Math.random() * totalWeight);

        for (const option of options) {
            randomValue -= option.weight;
            if (randomValue < 0) {
                return option;
            }
        }
        return options[options.length - 1];
    }
}