import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export const CurrentTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center border-0 bg-white bg-opacity-70 text-black rounded-xl py-2">
      <FontAwesomeIcon icon={faClock} className="h-11 mx-4"/>
      <div className="flex flex-col">
        <p className="basis-1/2 text-center text-3xl">{formatTime(dateTime)}</p>
        <p className="basis-1/2 text-center text-base font-sans">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};
