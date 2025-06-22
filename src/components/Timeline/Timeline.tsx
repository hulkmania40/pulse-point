import TimelineItem from "./TimelineItem";

const timelineData = [
  {
    date: "June 28, 1914",
    title: "Assassination of Archduke Franz Ferdinand",
    subtitle: "Spark that ignited the war",
    status: "Trigger Event",
    events: [
      "Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo.",
      "Gavrilo Princip, a Bosnian Serb nationalist, carried out the attack.",
      "Led to a chain of diplomatic escalations across Europe.",
    ],
  },
  {
    date: "July–August 1914",
    title: "Outbreak of War",
    subtitle: "Nations mobilize and declare war",
    status: "War Declared",
    events: [
      "Austria-Hungary declared war on Serbia.",
      "Germany declared war on Russia and France.",
      "Britain entered the war after Germany invaded Belgium.",
    ],
  },
  {
    date: "1915",
    title: "Trench Warfare Begins",
    subtitle: "Western Front solidifies",
    status: "Stalemate",
    events: [
      "Massive trench systems built on the Western Front.",
      "Battle of Gallipoli begins; heavy Allied casualties.",
      "Poison gas used as a weapon for the first time.",
    ],
  },
  {
    date: "1916",
    title: "Battle of the Somme",
    subtitle: "One of the bloodiest battles in history",
    status: "High Casualties",
    events: [
      "Fought between British/French vs. Germany.",
      "Over 1 million men wounded or killed.",
      "Tanks used for the first time in battle.",
    ],
  },
  {
    date: "April 6, 1917",
    title: "United States Enters the War",
    subtitle: "Tipping the balance",
    status: "Reinforcements",
    events: [
      "U.S. declared war on Germany.",
      "Prompted by unrestricted submarine warfare and the Zimmermann Telegram.",
      "Boosted Allied morale and resources.",
    ],
  },
  {
    date: "1918",
    title: "Final Offensives and Armistice",
    subtitle: "End of the war",
    status: "Victory for Allies",
    events: [
      "German Spring Offensive failed.",
      "Allied counterattacks pushed Germans back.",
      "Armistice signed on November 11, 1918.",
    ],
  },
  {
    date: "1919",
    title: "Treaty of Versailles",
    subtitle: "Post-war settlement",
    status: "War Ends Formally",
    events: [
      "Germany forced to accept full responsibility.",
      "Heavy reparations and territorial losses imposed.",
      "League of Nations established.",
    ],
  },
];

interface Props {
  title: string;
}

const Timeline = (props: Props) => {

  const { title } = props;

  return (
    <div className="flex flex-col">
      <span className="mt-4 font-bold text-2xl">{title}</span>
      <div className="relative w-full max-w-6xl mx-auto py-10">
        {/* Central vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

        <div className="flex flex-col space-y-16">
          {timelineData.map((item, idx) => (
            <TimelineItem
              key={idx}
              side={idx % 2 === 0 ? "left" : "right"}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
