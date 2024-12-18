"use client";
import CountUp from "react-countup";

interface StatsIn {
  count: number;
  for: string;
}

function calculateRoundedYears(): number {
  const startDate: Date = new Date("2023-04-17");
  const currentDate: Date = new Date();
  const timeDifference: number = currentDate.getTime() - startDate.getTime();

  const years: number = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

  return Math.round(years);
}

const STATS_DATA: StatsIn[] = [
  {
    count: calculateRoundedYears(),
    for: "Years of experience",
  },
  {
    count: 8,
    for: "Projects completed",
  },
  {
    count: 10,
    for: "Technologies mastered",
  },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none ">
          {STATS_DATA?.map((item: StatsIn, idx: number) => {
            return (
              <div
                key={idx}
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
              >
                <CountUp
                  end={item?.count}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold "
                />
                <p
                  className={`${
                    item?.for?.length > 15 ? "max-w-[150px]" : "max-w-[100px]"
                  } leading-snug text-white/80`}
                >
                  {item?.for}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
