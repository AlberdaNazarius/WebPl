'use client';
import React, { FC, useRef } from 'react';
import { RecommendsService } from '@/app/services/recommends.service';
import { RecommendationRequest } from '@/app/models/RecommendationRequest';
import { FormattedRecommendation } from '@/app/models/FormattedRecommendation';
import { imagePath } from '@/app/helpers/constants';

const RecommendBtn: FC = ({}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [prompt, setPrompt] = React.useState<string>('');
  const [recommendations, setRecommendations] = React.useState<FormattedRecommendation[]>([]);

  const handleClick = () => {
    dialogRef?.current?.showModal();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const request: RecommendationRequest = {
        prompt: prompt,
        genre: 'rock',
      };
      setRecommendations(await RecommendsService.getRecommendations(request));
    }
  };

  return (
    <>
      <button onClick={handleClick} className="cursor-pointer hover:text-white">
        <img src={`${imagePath}/globe-icon.png`} alt="globe" width='20'/>
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box min-h-[500px] flex flex-col justify-between">
          <div>
            <h3 className="font-bold">Your results:</h3>
            {recommendations.length > 0 && recommendations.map((rec, index) => (
              <div key={`${rec.title}-${rec.artist}`}>
                {index+1}) {rec.title} - {rec.artist}
              </div>
            ))}
          </div>
          <input className="input input-bordered w-full text-base mt-auto !py-2"
                 type="search"
                 placeholder="Describe want you want..."
                 aria-label="Find songs"
                 onChange={handleOnChange}
                 onKeyDown={handleKeyDown}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default RecommendBtn;