import type {WeightStrategy} from "@/core/strategy/weighting/weight-strategy.ts";
import type {SelectorStrategy} from "@/core/strategy/selector/selector-strategy.ts";
import type {Option} from "@/core/model/option.ts";
import type {PickerResponse} from "@/core/model/picker-response.ts";

export class PickerService {

    private readonly weightStrategy: WeightStrategy;
    private readonly selectorStrategy: SelectorStrategy;
    private readonly requiredStreak: number

    private readonly threshold = 100

    constructor(weightStrategy: WeightStrategy, selectorStrategy: SelectorStrategy, requiredStreak: number) {
        this.selectorStrategy = selectorStrategy;
        this.weightStrategy = weightStrategy;
        this.requiredStreak = requiredStreak < 1 ? 1 : requiredStreak;
    }

    pick(optionNames: string[]): PickerResponse {
        const initialOptions: Option[] = optionNames.map((name) => ({
            name: name,
            weight: 0,
        }))
        const weightedOptions: Option[] = this.weightStrategy.applyWeight(initialOptions);

        const pickingHistory: string[] = [];
        let lastPickedOption: Option | null = null;
        let currentStreak = 0;
        let currentIteration = 0;

        while (currentStreak < this.requiredStreak && currentIteration < this.threshold) {
            const currentPick = this.selectorStrategy.select(weightedOptions);
            pickingHistory.push(currentPick.name)

            if (currentPick && lastPickedOption && currentPick.name === lastPickedOption?.name) {
                currentStreak++;
            } else {
                lastPickedOption = currentPick;
                currentStreak = 1;
            }
            currentIteration++;
        }

        if (currentIteration == this.threshold) {
            pickingHistory.push("Loop threshold reached, terminating ...");
        }

        return {
            pickingContext: weightedOptions,
            pickingResultWinner: lastPickedOption?.name ?? optionNames[optionNames.length - 1],
            pickingHistory
        };
    }
}