import { Eye, CheckCircle, RotateCcw, Clock, Frown, TrendingDown, AlertTriangle, KeyRound as Pound } from "lucide-react";

export default function PriceCard() {
  // All text content organized in variables
  const cardData = {
    resultsSeen: {
      heading: "Results Seen",
      value: "Immediately",
      description: "Best Results After 1-2 Weeks"
    },
    resultsLast: {
      heading: "Results Last",
      value: "3-5 Months",
      description: "Best Results After 1-2 Weeks"
    },
    sessions: {
      heading: "No. of Sessions",
      value: "1 Treatment"
    },
    procedureTime: {
      heading: "Procedure Time",
      value: "20-30 Minutes"
    },
    pain: {
      heading: "Pain",
      value: "None—Mild",
      description: "Local Anaesthetic Optional"
    },
    downtime: {
      heading: "Downtime",
      value: "None / 1-2 days"
    },
    sideEffects: {
      heading: "Side Effects",
      value: "Bruising, Redness, Swelling"
    },
    pricing: {
      heading: "Our Pricing",
      value: "From £180",
      description: "View all"
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <Eye className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.resultsSeen.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900 mb-1">{cardData.resultsSeen.value}</h3>
          <p className="text-gray-500 text-sm font-light">{cardData.resultsSeen.description}</p>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <CheckCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.resultsLast.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900 mb-1">{cardData.resultsLast.value}</h3>
          <p className="text-gray-500 text-sm font-light">{cardData.resultsLast.description}</p>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.sessions.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900">{cardData.sessions.value}</h3>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.procedureTime.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900">{cardData.procedureTime.value}</h3>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <Frown className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.pain.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900 mb-1">{cardData.pain.value}</h3>
          <p className="text-gray-500 text-sm font-light">{cardData.pain.description}</p>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <TrendingDown className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.downtime.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900">{cardData.downtime.value}</h3>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <AlertTriangle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.sideEffects.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900">{cardData.sideEffects.value}</h3>
        </div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <Pound className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm font-light">{cardData.pricing.heading}</span>
          </div>
          <h3 className="text-lg font-light text-gray-900 mb-1">{cardData.pricing.value}</h3>
          <p className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700">
            {cardData.pricing.description}
          </p>
        </div>
      </div>
    </div>
  );
}