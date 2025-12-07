import type {Option} from "@/core/model/option.ts";

export interface PickerResponse {
    pickingContext: Option[],
    pickingHistory: string[]
    pickingResultWinner: string,
}
