import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useState} from "react";
import {useRandomPicker} from "@/hooks/use-random-picker.ts";

function App() {
    const [items, setItems] = useState("");

    const [weightStrategy, setWeightStrategy] = useState<string>("equal");
    const [selectorStrategy, setSelectorStrategy] = useState<string>("cdf");

    const [streak, setStreak] = useState(3);

    const {pick, result, loading} = useRandomPicker(
        weightStrategy,
        selectorStrategy,
        streak
    );

    const handlePick = () => {
        const options = items.split("\n").filter((item) => item.trim() !== "");
        if (options.length > 0) {
            pick(options);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Random Picker</CardTitle>
                    <CardDescription>
                        Enter a list of items and pick one at random.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <Textarea
                        placeholder="Enter items, one per line"
                        value={items}
                        onChange={(e) => setItems(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label>Weighting Strategy</Label>
                            <Select
                                value={weightStrategy}
                                onValueChange={setWeightStrategy}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a strategy"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="equal">Equal</SelectItem>
                                    <SelectItem value="ordered">Ordered</SelectItem>
                                    <SelectItem value="alphabetic">Alphabetic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Selector Strategy</Label>
                            <Select
                                value={selectorStrategy}
                                onValueChange={setSelectorStrategy}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a strategy"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cdf">Weighted Random</SelectItem>
                                    <SelectItem value="simple">Simple Random</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Streak</Label>
                        <Input
                            type="number"
                            value={streak}
                            onChange={(e) => setStreak(parseInt(e.target.value))}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Pick the same item N times in a row.
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full bg-pink-300 hover:bg-pink-400" onClick={handlePick} disabled={loading}>
                        {loading ? "Picking..." : "Pick a Winner"}
                    </Button>

                    {result && (
                        <Alert className="flex flex-col gap-4 items-start w-full">
                            <div className="w-full">
                                <AlertTitle>Initial Properties:</AlertTitle>
                                <AlertDescription className="w-full">
                                    <pre className="w-full bg-muted p-3 rounded text-sm whitespace-pre-wrap">
                                        {JSON.stringify(result.pickingContext, null, 2)}
                                    </pre>
                                </AlertDescription>
                            </div>

                            <div className="w-full">
                                <AlertTitle>Picking History:</AlertTitle>
                                <AlertDescription className="flex flex-col gap-1">
                                    {result.pickingHistory.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))}
                                </AlertDescription>
                            </div>

                            <div className="w-full">
                                <AlertTitle>The winner is:</AlertTitle>
                                <AlertDescription>{result.pickingResultWinner}</AlertDescription>
                            </div>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default App;
