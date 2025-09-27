import { Award, BadgeCheck, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudent } from "@/lib/mock-data";

const availableRewards = [
    { name: "Math Whiz Badge", cost: 500, icon: <BadgeCheck className="h-8 w-8 text-primary" /> },
    { name: "Bonus Lesson: Advanced Algebra", cost: 1000, icon: <Star className="h-8 w-8 text-accent" /> },
    { name: "Peer Helper Recognition", cost: 250, icon: <Award className="h-8 w-8 text-destructive" /> },
    { name: "Profile Theme: Space Explorer", cost: 750, icon: <Star className="h-8 w-8 text-primary" /> },
];

const earnedHistory = [
    { activity: "Completed 'Photosynthesis' lesson", credits: 50, date: "2d ago" },
    { activity: "Scored 95% on Algebra quiz", credits: 100, date: "3d ago" },
    { activity: "Helped a peer with a question", credits: 25, date: "3d ago" },
    { activity: "Completed 'Factoring Trinomials' lesson", credits: 50, date: "5d ago" },
];

export default function EduCreditsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Star className="text-accent"/> EduCredits & Rewards</h1>
                <p className="text-muted-foreground">Use your points to unlock cool badges and bonus content!</p>
            </div>

            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardDescription>Your Balance</CardDescription>
                    <CardTitle className="text-5xl font-bold text-primary">{mockStudent.eduCredits.toLocaleString()} credits</CardTitle>
                </CardHeader>
            </Card>

            <Tabs defaultValue="redeem">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="redeem" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableRewards.map((reward) => (
                            <Card key={reward.name} className="flex flex-col">
                                <CardHeader className="items-center text-center">
                                    {reward.icon}
                                    <CardTitle className="text-lg">{reward.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow items-center justify-end">
                                    <div className="text-xl font-bold mb-4">{reward.cost} credits</div>
                                    <Button disabled={mockStudent.eduCredits < reward.cost}>Redeem</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Credit History</CardTitle>
                            <CardDescription>A log of your recent earnings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {earnedHistory.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.activity}</p>
                                            <p className="text-sm text-muted-foreground">{item.date}</p>
                                        </div>
                                        <div className="text-lg font-bold text-green-500">+{item.credits}</div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
