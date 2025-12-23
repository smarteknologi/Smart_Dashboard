import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  data: Array<{ name: string; value: number; secondary?: number }>;
  showSecondary?: boolean;
}

export function ChartCard({ title, data, showSecondary = false }: ChartCardProps) {
  return (
    <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(356, 71%, 36%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(356, 71%, 36%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 39%, 66%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(0, 39%, 66%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 15%, 18%)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 10 }}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 30%, 10%)",
                  border: "1px solid hsl(0, 20%, 20%)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(0, 0%, 95%)" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(356, 71%, 36%)"
                strokeWidth={2}
                fill="url(#primaryGradient)"
              />
              {showSecondary && (
                <Area
                  type="monotone"
                  dataKey="secondary"
                  stroke="hsl(0, 39%, 66%)"
                  strokeWidth={2}
                  fill="url(#secondaryGradient)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
