import { ImageType, TimelineSide } from "@/common/constants";
import TimelineItem from "./TimelineItem";

const timelineData = [
  {
    date: "June 28, 1914",
    title: "Assassination of Archduke Franz Ferdinand",
    subtitle: "Spark that ignited the war",
    status: "Trigger Event",
    location: "Sarajevo, Bosnia",
    countryName: "Bosnia and Herzegovina",
    countryCode: "BA",
    imageUrl: "https://picsum.photos/500?random=1",
    imageCaption: "Gavrilo Princip, assassin of Archduke Franz Ferdinand.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "Wikimedia Commons",
    events: [
      "Archduke Franz Ferdinand of Austria-Hungary was assassinated.",
      "Gavrilo Princip, a Bosnian Serb nationalist, carried out the attack.",
      "This incident triggered diplomatic crises across Europe.",
    ],
  },
  {
    date: "July-August 1914",
    title: "Outbreak of War",
    subtitle: "Nations mobilize and declare war",
    status: "War Declared",
    location: "Vienna, Berlin, Paris, London",
    countryName: "Europe",
    countryCode: "EU",
    imageUrl: "https://picsum.photos/500?random=2",
    imageCaption: "Austria-Hungary declares war on Serbia.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "Wikimedia Commons",
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
    location: "Western Front",
    countryName: "France",
    countryCode: "FR",
    imageUrl: "https://picsum.photos/500?random=3",
    imageCaption: "German trench on the Western Front.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "Bundesarchiv (Germany)",
    events: [
      "Massive trench systems constructed across France and Belgium.",
      "Battle of Gallipoli begins; heavy Allied casualties.",
      "Poison gas used for the first time in warfare.",
    ],
  },
  {
    date: "1916",
    title: "Battle of the Somme",
    subtitle: "One of the bloodiest battles in history",
    status: "High Casualties",
    location: "Somme River, France",
    countryName: "France",
    countryCode: "FR",
    imageUrl: "https://picsum.photos/500?random=4",
    imageCaption: "Soldiers during the Battle of the Somme.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "Imperial War Museum",
    events: [
      "Fought between British and French forces against Germany.",
      "Over 1 million men were wounded or killed.",
      "Tanks used in battle for the first time.",
    ],
  },
  {
    date: "April 6, 1917",
    title: "United States Enters the War",
    subtitle: "Tipping the balance",
    status: "Reinforcements",
    location: "Washington, D.C.",
    countryName: "United States",
    countryCode: "US",
    imageUrl: "https://picsum.photos/500?random=5",
    imageCaption: "U.S. recruitment poster featuring Uncle Sam.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "U.S. Library of Congress",
    events: [
      "U.S. declared war on Germany.",
      "Driven by unrestricted submarine warfare and the Zimmermann Telegram.",
      "Boosted Allied morale and material support.",
    ],
  },
  {
    date: "1918",
    title: "Final Offensives and Armistice",
    subtitle: "End of the war",
    status: "Victory for Allies",
    location: "Compiègne Forest",
    countryName: "France",
    countryCode: "FR",
    imageUrl: "https://picsum.photos/500?random=6",
    imageCaption: "Railway carriage where the Armistice was signed.",
    imageType: ImageType.ACTUAL_PICTURE,
    imageSource: "Wikimedia Commons",
    events: [
      "German Spring Offensive failed.",
      "Allied counterattacks pushed German forces back.",
      "Armistice signed on November 11, 1918.",
    ],
  },
  {
    date: "1919",
    title: "Treaty of Versailles",
    subtitle: "Post-war settlement",
    status: "War Ends Formally",
    location: "Versailles, France",
    countryName: "France",
    countryCode: "FR",
    imageUrl: "https://picsum.photos/500?random=7",
    imageCaption: "World leaders at the signing of the Treaty of Versailles.",
    imageType: ImageType.AI_GENERATED,
    imageSource: "Wikimedia Commons",
    events: [
      "Germany forced to accept full responsibility for the war.",
      "Heavy reparations and territorial losses imposed on Germany.",
      "League of Nations was established to prevent future conflicts.",
    ],
  },
];

interface Props {
  title: string;
}

const Timeline = ({ title }: Props) => {
  return (
    <div className="flex flex-col">
      <span className="mt-4 font-bold text-2xl">{title}</span>
      <div className="relative w-full max-w-6xl mx-auto py-10">
        {/* Central vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

        <div className="flex flex-col space-y-16">
          {timelineData.map((item, idx) => (
            <TimelineItem
            side={idx%2===0?TimelineSide.LEFT:TimelineSide.RIGHT}
            {...item}
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
