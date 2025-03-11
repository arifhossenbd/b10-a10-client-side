const Accordion = () => {
  return (
    <div className="join join-vertical bg-base-100">
      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-title font-semibold">
           Why are game reviews important?
        </div>
        <div className="collapse-content text-sm">
          Game reviews help players make informed decisions before purchasing or playing a game. They provide insights into gameplay, graphics, mechanics and overall experience.
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title font-semibold">
          Can game reviews help find high-quality games?
        </div>
        <div className="collapse-content text-sm">
          Yes, well-written reviews highlight both the strengths and weaknesses of a game, helping players identify high-quality games that suit their preference.
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title font-semibold">
          What makes a game review reliable?
        </div>
        <div className="collapse-content text-sm">
          A reliable review provides an unbiased opinion, includes both pros, cons and is based on actual gameplay experience rather than personal bias.
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="my-accordion-5" />
        <div className="collapse-title font-semibold">
          Are user reviews or critic reviews better?
        </div>
        <div className="collapse-content text-sm">
          Both have value. Critic reviews provide professional analysis, while user reviews reflect real player experience. A balance of both gives the best perspective.
        </div>
      </div>
    </div>
  );
};

export default Accordion;
