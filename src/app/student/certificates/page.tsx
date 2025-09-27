import { Award, Check, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const completedCertificates = [
    {
        lesson: "Factoring Trinomials",
        date: "2024-07-15",
        certificateId: "0x7a2b...9f8e"
    },
    {
        lesson: "Mitochondria: The Powerhouse",
        date: "2024-07-12",
        certificateId: "0x1c4d...3a7b"
    }
];

export default function CertificatesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Award /> Certificates</h1>
                <p className="text-muted-foreground">Your verified achievements, recorded securely.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                        These certificates represent your mastery of key subjects. They can be optionally recorded on a blockchain-style ledger for permanent, tamper-proof verification.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {completedCertificates.map((cert, index) => (
                            <li key={cert.certificateId}>
                                <div className="grid gap-4 md:grid-cols-3 items-center">
                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            {cert.lesson}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Completed on: {cert.date}</p>
                                        <p className="text-xs text-muted-foreground mt-1 font-mono">ID: {cert.certificateId}</p>
                                    </div>
                                    <div className="flex gap-2 justify-self-end">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                                {index < completedCertificates.length - 1 && <Separator className="my-4" />}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
