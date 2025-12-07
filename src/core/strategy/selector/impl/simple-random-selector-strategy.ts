import type {SelectorStrategy} from "@/core/strategy/selector/selector-strategy.ts";
import type {Option} from "@/core/model/option.ts";

export class SimpleRandomSelectorStrategy implements SelectorStrategy {
    select(options: Option[]): Option {
        const rand: number = Math.floor(Math.random() * options.length);
        return options[rand] as Option;
    }
}