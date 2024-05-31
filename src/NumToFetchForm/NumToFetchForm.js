import { useState } from 'react';
import './NumToFetchForm.scss';

import { useForm } from 'react-hook-form';

function NumToFetchForm({ numToFetch, onSubmit }) {
  const { register, handleSubmit } = useForm();

  const [ numToFetchInput, setNumToFetchInput ] = useState(numToFetch);
  

  function submitForm(d) {
    onSubmit(d.numToFetch);
  }

  return (
    <form className="num-to-fetch-form" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>Number of Pokemon</label>
      </div>
      <div>
        <input {...register("numToFetch")} type="number" min="1" max="30" value={numToFetchInput} onChange={(e) => setNumToFetchInput(e.target.value)} />
        <input type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default NumToFetchForm;
