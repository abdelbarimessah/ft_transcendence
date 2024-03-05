const AiModeManual = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-center text-color-5 mb-4">
        AI MODE MANUAL
      </h2>
      <ul className="list-disc pl-5 text-sm md:text-base space-y-2">
        <li>
          You use <span className="font-semibold">arrows</span> to play.{" "}
          <span role="img" aria-label="Arrow keys">
            ⬆️⬇️
          </span>
        </li>
        <li>
          You win the game when you reach{" "}
          <span className="font-semibold">7 points</span>.
        </li>
        <li>
          You start the game using space
        </li>

      </ul>
    </>
  );
};

export default AiModeManual;
