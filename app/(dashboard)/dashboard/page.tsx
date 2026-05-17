import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { InterviewList, MetricCard } from "@/components/dashboard";
import { FiCheckCircle, FiClock, FiTrendingUp, FiClipboard, FiBatteryCharging } from "react-icons/fi";

export default async function DashboardPage() {

    const { userId } = await auth()
    if ( !userId ) return null;

    const interviews = await db.interview.findMany({
        where: { userId },
        select: { startedAt: true, completedAt: true, transcript: true }
    })

    const total = interviews.length
    const completedInterview = interviews.filter(i => i.completedAt !== null)
    const totalDurationMs = completedInterview.reduce((acc, i) => {
        return acc + (i.completedAt!.getTime() - i.startedAt!.getTime())
    }, 0)

    const avgDuration = completedInterview.length
        ? Math.round(totalDurationMs / completedInterview.length / 1000 / 60)
        : 0;

    const successRate = total > 0 ? 100 : 0

    return (
        <div>
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3 rounded-md p-6 bg-verde-50/10 backdrop-blur-lg text-verde-50 border border-verde-50/20"
            >
                <MetricCard
                    icon={<FiCheckCircle className="text-verde-400" />}
                    title="Completed"
                    value={completedInterview.length}
                />
                <MetricCard
                    icon={<FiClipboard className="text-amber-400" />}
                    title="Total"
                    value={total}
                />
                <MetricCard
                    icon={<FiClock className="text-purple-400" />}
                    title="Averege Time"
                    value={`${avgDuration} min`}
                />
                <MetricCard
                    icon={<FiTrendingUp className="text-azul-400" />}
                    title="Success Rate"
                    value={successRate}
                />
            </div>

            <div>
                <div className="mt-4 p-4 bg-azul-600/20 border border-azul-400/30 rounded-md">
                    <div className="flex items-baseline gap-2 text-sm text-azul-200 flex-wrap md:flex-nowrap">
                        <FiBatteryCharging className="text-verde-400 w-5 h-5 shrink-0 self-center" />
                        <strong className="text-azul-100 whitespace-nowrap">Advice:</strong>
                        <span>Our AI interviewer is here to help you prepare for your next interview. It provides a personalized and interactive experience, tailored to your needs and preferences.</span>
                    </div>
                </div>
            </div>
            <InterviewList />
        </div>
    )
}
