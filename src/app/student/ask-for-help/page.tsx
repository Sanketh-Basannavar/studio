
'use client';
import { LifeBuoy, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AskForHelpPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Request Sent!",
            description: "Your teacher has been notified and will get back to you soon.",
        });
        // Here you would typically send the data to a server
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><LifeBuoy /> Ask for Help</h1>
                <p className="text-muted-foreground">Don't get stuck. Let your teacher know you need help.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Send a Help Request</CardTitle>
                    <CardDescription>
                        Select the subject you're having trouble with and add a short note for your teacher.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="subject-select">Subject</Label>
                            <Select required>
                                <SelectTrigger id="subject-select">
                                    <SelectValue placeholder="Select a subject..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="algebra">Algebra</SelectItem>
                                    <SelectItem value="biology">Biology</SelectItem>
                                    <SelectItem value="history">History</SelectItem>
                                    <SelectItem value="chemistry">Chemistry</SelectItem>
                                    <SelectItem value="literature">Literature</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="help-notes">Notes (Optional)</Label>
                            <Textarea 
                                id="help-notes"
                                placeholder="e.g., I don't understand how to balance chemical equations in the worksheet." 
                                rows={5}
                            />
                        </div>

                        <Button type="submit" className="w-full sm:w-auto">
                            <Send className="mr-2" /> Send Request
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
