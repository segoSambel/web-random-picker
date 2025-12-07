import {PickerService} from "@/core/service/picker-service.ts";
import type {WeightStrategy} from "@/core/strategy/weighting/weight-strategy.ts";
import type {SelectorStrategy} from "@/core/strategy/selector/selector-strategy.ts";
import {SelectorType} from "@/core/model/selector-type.ts";
import {CdfWeightSelectorStrategy} from "@/core/strategy/selector/impl/cdf-weight-selector-strategy.ts";
import {SimpleRandomSelectorStrategy} from "@/core/strategy/selector/impl/simple-random-selector-strategy.ts";
import {WeightType} from "@/core/model/weight-type.ts";
import {AlphabeticWeightStrategy} from "@/core/strategy/weighting/impl/alphabetic-weight-strategy.ts";
import {EqualWeightStrategy} from "@/core/strategy/weighting/impl/equal-weight-strategy.ts";
import {OrderedWeightStrategy} from "@/core/strategy/weighting/impl/ordered-weight-strategy.ts";

export function createPickerService(
    selectorStrategy: string,
    weightStrategy: string,
    requiredStreak: number = 3
): PickerService {
    let selector: SelectorStrategy;
    let weight: WeightStrategy;

    switch (selectorStrategy) {
        case SelectorType.CDF_SELECTOR:
            selector = new CdfWeightSelectorStrategy();
            break;
        case SelectorType.SIMPLE_SELECTOR:
            selector = new SimpleRandomSelectorStrategy();
            break;
        default:
            selector = new SimpleRandomSelectorStrategy();
            break;
    }

    switch (weightStrategy) {
        case WeightType.ALPHABETIC_WEIGHT:
            weight = new AlphabeticWeightStrategy();
            break;
        case WeightType.EQUAL_WEIGHT:
            weight = new EqualWeightStrategy();
            break;
        case WeightType.ORDERED_WEIGHT:
            weight = new OrderedWeightStrategy();
            break;
        default:
            weight = new EqualWeightStrategy();
    }

    return new PickerService(weight, selector, requiredStreak);
}