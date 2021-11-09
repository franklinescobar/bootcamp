import React from 'react';

const Toggle = () => {
  return (
    <>
      <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          Toggle this switch element
        </label>
      </div>

      <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitchesChecked'
          defaultChecked
        />
        <label className='custom-control-label' htmlFor='customSwitchesChecked'>
          Toggle this switch element
        </label>
      </div>
    </>
  );
};

export default Toggle;