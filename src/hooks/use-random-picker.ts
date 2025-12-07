import { createPickerService } from "@/core";
import { useCallback, useState } from "react";
import type {PickerResponse} from "@/core/model/picker-response.ts";

export function useRandomPicker(
    weightStrategyType: string,
    selectorStrategyType: string,
    requiredStreak: number
) {
    const [result, setResult] = useState<PickerResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const pick = useCallback(
        async (optionNames: string[]) => {
            setLoading(true);
            const pickerService = createPickerService(
                selectorStrategyType,
                weightStrategyType,
                requiredStreak
            );
            const picked = await pickerService.pick(optionNames);
            setResult(picked);
            setLoading(false);
        },
        [weightStrategyType, selectorStrategyType, requiredStreak]
    );
    return { pick, result, loading };
}